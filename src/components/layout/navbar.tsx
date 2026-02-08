"use client"

import Link from "next/link"
import { Search, Plus, Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
    const { user, logout } = useAuth()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Zero-Bot
                        </span>
                    </Link>
                </div>

                <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden" onClick={onMenuClick}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="flex-1 max-w-xl mx-4">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Search communities, posts, or humans..."
                                    className="pl-10 bg-muted/20 border-border/40 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/20 transition-all rounded-full"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            // For prototype, just show a toast
                                            // In real app, router.push(`/search?q=${e.currentTarget.value}`)
                                            import("sonner").then(mod => mod.toast.info(`Searching for: ${e.currentTarget.value}`))
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <nav className="flex items-center space-x-2">
                        <Button size="icon" variant="ghost">
                            <Plus className="h-5 w-5" />
                            <span className="sr-only">Create Post</span>
                        </Button>
                        <Button size="icon" variant="ghost">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/avatars/01.png" alt={user?.handle} />
                                        <AvatarFallback>{user?.handle?.substring(0, 2).toUpperCase() || "AN"}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.handle}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.isVerified ? "Verified Human" : "Unverified"}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                </div>
            </div>
        </header>
    )
}
