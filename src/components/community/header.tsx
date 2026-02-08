"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CommunityHeaderProps {
    name: string
    description?: string
    memberCount: number
    isJoined?: boolean
}

export function CommunityHeader({ name, description, memberCount, isJoined }: CommunityHeaderProps) {
    return (
        <div className="mb-6">
            {/* Banner */}
            <div className="h-32 w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-80" />

            <div className="px-4 -mt-8 flex items-end space-x-4">
                <Avatar className="h-20 w-20 border-4 border-background">
                    <AvatarFallback className="text-xl bg-orange-500 text-white font-bold">{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="pb-3 flex-1">
                    <h1 className="text-2xl font-bold">r/{name}</h1>
                    <p className="text-sm text-muted-foreground">{name} community</p>
                </div>
                <div className="pb-4">
                    <Button variant={isJoined ? "outline" : "default"} className="rounded-full px-8">
                        {isJoined ? "Joined" : "Join"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
