"use client"

import { Feed } from "@/components/feed/feed"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, ShieldCheck, Zap } from "lucide-react"

export default function Home() {
    return (
        <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
                {/* Main Feed */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold tracking-tight">Your Feed</h1>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-muted-foreground">Hot</Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">New</Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">Top</Button>
                        </div>
                    </div>
                    <Feed />
                </div>

                {/* Right Sidebar */}
                <aside className="space-y-6 hidden md:block">
                    {/* Zero-Bot Info Card */}
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <CardTitle className="text-base">Verified Human Zone</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-3">
                            <p>
                                You are browsing the world's first bot-free social network. Every user here has passed a cryptographic Proof of Personhood check.
                            </p>
                            <Button className="w-full" size="sm">Invite Friends</Button>
                        </CardContent>
                    </Card>

                    {/* Trending Topics */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                <CardTitle className="text-sm font-medium">Trending Today</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">Technology • Trending</p>
                                <p className="text-sm font-medium hover:underline cursor-pointer">#ZeroBotLaunch</p>
                                <p className="text-xs text-muted-foreground">12.5k human posts</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">Politics • Trending</p>
                                <p className="text-sm font-medium hover:underline cursor-pointer">#AIRegulation</p>
                                <p className="text-xs text-muted-foreground">8.2k human posts</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">Humor • Trending</p>
                                <p className="text-sm font-medium hover:underline cursor-pointer">Turing Test Fails</p>
                                <p className="text-xs text-muted-foreground">5.1k human posts</p>
                            </div>
                            <Button variant="outline" className="w-full text-xs" size="sm">View All</Button>
                        </CardContent>
                    </Card>

                    {/* Quick Links */}
                    <div className="text-xs text-muted-foreground space-y-2 px-1">
                        <div className="flex flex-wrap gap-2">
                            <span className="hover:underline cursor-pointer">About</span>
                            <span className="hover:underline cursor-pointer">Privacy</span>
                            <span className="hover:underline cursor-pointer">Terms</span>
                            <span className="hover:underline cursor-pointer">Source Code</span>
                        </div>
                        <p>© 2026 Zero-Bot Inc.</p>
                    </div>
                </aside>
            </div>
        </div>
    )
}
