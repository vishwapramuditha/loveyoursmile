"use client"

import * as React from "react"
import { useAuth } from "@/contexts/auth-context"
import { VerifyHumanity } from "@/components/auth/verify-humanity"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const { login, user } = useAuth()
    const [handle, setHandle] = React.useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!handle) return
        await login(handle)
    }

    React.useEffect(() => {
        if (user?.isVerified) {
            const timer = setTimeout(() => {
                router.push("/")
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [user?.isVerified, router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                        Zero-Bot
                    </h1>
                    <p className="text-zinc-500">The Human-Only Social Network</p>
                </div>

                {!user ? (
                    <Card className="border-zinc-800 bg-zinc-950/50 backdrop-blur">
                        <CardHeader>
                            <CardTitle>Create Identity</CardTitle>
                            <CardDescription>Choose a handle to represent you in the community.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Input
                                        placeholder="@username"
                                        value={handle}
                                        onChange={(e) => setHandle(e.target.value)}
                                        className="bg-black/50 border-zinc-800 font-mono"
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={!handle}>
                                    Claim Identity
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <VerifyHumanity />
                )}
            </div>
        </div>
    )
}
