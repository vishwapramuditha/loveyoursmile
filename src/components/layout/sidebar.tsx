"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Flame, Compass, Users, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const items = [
        { name: "Home", href: "/", icon: Home },
        { name: "Popular", href: "/r/popular", icon: Flame },
        { name: "All", href: "/r/all", icon: Compass },
    ]

    const communities = [
        { name: "r/technology", href: "/r/technology" },
        { name: "r/worldnews", href: "/r/worldnews" },
        { name: "r/funny", href: "/r/funny" },
        { name: "r/AskReddit", href: "/r/AskReddit" },
        { name: "r/gaming", href: "/r/gaming" },
    ]

    return (
        <div className={cn("pb-12 h-screen overflow-y-auto border-r border-sidebar-border bg-sidebar/50 backdrop-blur-sm", className)}>
            <div className="space-y-6 py-6">
                <div className="px-4 py-2">
                    <h2 className="mb-3 px-2 text-xs font-semibold tracking-wider text-muted-foreground/80 uppercase">
                        Feeds
                    </h2>
                    <div className="space-y-1">
                        {items.map((item) => (
                            <Button
                                key={item.href}
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start transition-all duration-200",
                                    pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "hover:bg-sidebar-accent/50 hover:translate-x-1"
                                )}
                                asChild
                            >
                                <Link href={item.href}>
                                    <item.icon className="mr-3 h-4 w-4" />
                                    {item.name}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="px-4 py-2">
                    <h2 className="mb-3 px-2 text-xs font-semibold tracking-wider text-muted-foreground/80 uppercase">
                        Communities
                    </h2>
                    <ScrollArea className="h-[300px] px-0">
                        <div className="space-y-1">
                            {communities.map((community) => (
                                <Button
                                    key={community.href}
                                    variant="ghost"
                                    className="w-full justify-start font-normal text-muted-foreground hover:text-foreground hover:translate-x-1 transition-transform"
                                    asChild
                                >
                                    <Link href={community.href}>
                                        <Users className="mr-3 h-4 w-4 opacity-70" />
                                        {community.name}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="px-4 py-2">
                    <h2 className="mb-3 px-2 text-xs font-semibold tracking-wider text-muted-foreground/80 uppercase">
                        Trending
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start text-xs text-muted-foreground hover:text-primary transition-colors">
                            <TrendingUp className="mr-3 h-3 w-3" />
                            #ZeroBotLaunch
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-xs text-muted-foreground hover:text-primary transition-colors">
                            <TrendingUp className="mr-3 h-3 w-3" />
                            #ProofOfPersonhood
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
