"use client"

import * as React from "react"
import { CommentItem, CommentType } from "@/components/comment/comment-item"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { useData } from "@/contexts/data-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

export function CommentSection({ postId }: { postId?: string }) {
    const { comments, addComment } = useData()
    const { user } = useAuth()
    const [content, setContent] = React.useState("")

    if (!postId) return null

    const postComments = comments[postId] || []

    const handleSubmit = () => {
        if (!user) {
            toast.error("You must be logged in to comment")
            return
        }
        if (!content.trim()) return

        addComment(postId, {
            authorName: user.handle,
            content: content,
        })

        setContent("")
        toast.success("Comment added")
    }

    return (
        <div className="mt-6">
            <div className="mb-8 space-y-3">
                <label className="text-sm font-medium ml-1">Comment as <span className="text-primary">{user ? user.handle : "Guest"}</span></label>
                <div className="rounded-xl border border-border/50 bg-card p-1 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What are your thoughts?"
                        className="min-h-[100px] resize-none border-0 focus-visible:ring-0 p-3 bg-transparent placeholder:text-muted-foreground/50"
                    />
                    <div className="flex justify-between items-center px-2 pb-2 mt-1 border-t border-border/10 pt-2">
                        <span className="text-xs text-muted-foreground ml-1">Markdown supported</span>
                        <Button size="sm" onClick={handleSubmit} disabled={!content.trim()} className="rounded-full px-4">Comment</Button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {postComments.length === 0 ? (
                    <p className="text-muted-foreground text-sm italic ml-2">No comments yet. Be the first!</p>
                ) : (
                    postComments.map(comment => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                )}
            </div>
        </div>
    )
}
