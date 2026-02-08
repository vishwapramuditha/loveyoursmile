import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory store for rate limiting (Note: In production, use Redis/Upstash)
// This is per-isolate in Edge, so it's not global, but sufficient for demo/PoC.
const rateLimit = new Map<string, { count: number; lastReset: number }>();

const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 20; // 20 requests per minute per IP

export function middleware(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

    // 1. Rate Limiting Logic
    const now = Date.now();
    const record = rateLimit.get(ip) || { count: 0, lastReset: now };

    if (now - record.lastReset > WINDOW_SIZE) {
        record.count = 0;
        record.lastReset = now;
    }

    record.count++;
    rateLimit.set(ip, record);

    if (record.count > MAX_REQUESTS) {
        console.log(`[BLOCKED] Rate limit exceeded for IP: ${ip}`);
        return new NextResponse(
            JSON.stringify({ success: false, message: 'Too many requests. Please slow down.' }),
            { status: 429, headers: { 'content-type': 'application/json' } }
        );
    }

    // 2. Anomaly Detection Headers
    // We add headers to track request frequency for downstream analysis
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString());
    response.headers.set('X-RateLimit-Remaining', (MAX_REQUESTS - record.count).toString());

    // 3. Bot Detection (Simple User-Agent check)
    const userAgent = request.headers.get('user-agent') || '';
    if (userAgent.includes('bot') || userAgent.includes('crawler') || userAgent.includes('spider')) {
        // In strict mode, we might block this. For now, we tag it.
        response.headers.set('X-Bot-Detected', 'true');
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (auth routes might need higher limits)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    ],
}
