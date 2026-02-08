import * as React from "react"
import { Feed } from "@/components/feed/feed"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, ShieldCheck, Zap } from "lucide-react"

import { useData } from "@/contexts/data-context"
import { cn } from "@/lib/utils"

export default function Home() {
    const { sortMethod, setSortMethod } = useData()

    return (
        <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
                {/* Main Feed */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold tracking-tight">Your Feed</h1>
                        <div className="flex gap-2">
                            <Button
                                variant={sortMethod === 'hot' ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setSortMethod('hot')}
                                className={cn("text-muted-foreground", sortMethod === 'hot' && "text-foreground font-medium")}
                            >
                                Hot
                            </Button>
                            <Button
                                variant={sortMethod === 'new' ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setSortMethod('new')}
                                className={cn("text-muted-foreground", sortMethod === 'new' && "text-foreground font-medium")}
                            >
                                New
                            </Button>
                            <Button
                                variant={sortMethod === 'top' ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setSortMethod('top')}
                                className={cn("text-muted-foreground", sortMethod === 'top' && "text-foreground font-medium")}
                            >
                                Top
                            </Button>
                        </div>
                    </div>
                    <Feed />
                </div>

            </div>

            {/* Right Sidebar */}
            <RightSidebar />
        </div>
        </div >
    )
}

function RightSidebar() {
    const { posts } = useData()

    // Simple logic to find trending tags or keywords
    // For prototype, let's count words starting with # or just show top communities

    const trending = React.useMemo(() => {
        // Mocking "Trending" by hardcoding some that definitely exist or are relevant
        // In a real app, this would be backend aggregation
        return [
            { category: "Platform", topic: "#ZeroBotLaunch", count: "12.5k" },
            { category: "Identity", topic: "#ProofOfPersonhood", count: "8.2k" },
            { category: "Community", topic: "r/technology", count: "5.1k" },
        ]
    }, [])

    return (
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
                    {trending.map((item, i) => (
                        <div key={i} className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">{item.category} • Trending</p>
                            <p className="text-sm font-medium hover:underline cursor-pointer">{item.topic}</p>
                            <p className="text-xs text-muted-foreground">{item.count} posts</p>
                        </div>
                    ))}
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
    )
}
