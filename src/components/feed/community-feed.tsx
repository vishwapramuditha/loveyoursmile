"use client"

import { useData } from "@/contexts/data-context"
import { PostCard } from "@/components/feed/post-card"

export function CommunityFeed({ slug }: { slug: string }) {
    const { posts } = useData()

    // Filter posts for this community
    // Handle "all" and "popular" as special cases if needed, but for now simple match
    const filteredPosts = slug === "all" || slug === "popular"
        ? posts
        : posts.filter(p => p.communityName.toLowerCase() === slug.toLowerCase())

    if (filteredPosts.length === 0) {
        return (
            <div className="py-12 text-center border rounded-lg bg-card/50 border-dashed">
                <h3 className="text-lg font-medium">No posts here yet</h3>
                <p className="text-muted-foreground text-sm mt-1">Be the first to post in r/{slug}!</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            <div className="py-12 text-center">
                <p className="text-muted-foreground text-sm font-medium">End of r/{slug}</p>
            </div>
        </div>
    )
}
