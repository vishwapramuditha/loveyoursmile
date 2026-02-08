"use client"

import { useData } from "@/contexts/data-context"
import { PostCard } from "@/components/feed/post-card"
import { CommentSection } from "@/components/comment/comment-section"

export function PostDetailClient({ postId }: { postId: string }) {
    const { getPost } = useData()
    const post = getPost(postId)

    if (!post) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-bold">Post not found</h1>
                <p className="text-muted-foreground">This post may have been deleted.</p>
            </div>
        )
    }

    return (
        <>
            <PostCard post={post} />
            <div className="pl-2 md:pl-4 border-l border-border/20 ml-5 md:ml-6 mt-6">
                <CommentSection postId={postId} />
            </div>
        </>
    )
}
