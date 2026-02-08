"use client"

import * as React from "react"
import { PostCard, Post } from "@/components/feed/post-card"
import { Separator } from "@/components/ui/separator"

import { useData } from "@/contexts/data-context"

export function Feed() {
    const { posts } = useData()

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            <div className="py-12 text-center">
                <p className="text-muted-foreground text-sm font-medium">You've reached the end of the verified feed.</p>
            </div>
        </div>
    )
}
