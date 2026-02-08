"use client"

import * as React from "react"
import { ArrowBigUp, ArrowBigDown, MessageSquare, MoreHorizontal, CornerDownRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface CommentType {
    id: string
    authorName: string
    content: string
    points: number
    createdAt: string
    replies?: CommentType[]
}

interface CommentItemProps {
    comment: CommentType
    depth?: number
}

export function CommentItem({ comment, depth = 0 }: CommentItemProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    if (isCollapsed) {
        return (
            <div className="py-2 px-4 text-xs text-muted-foreground cursor-pointer hover:bg-muted/10 rounded" onClick={() => setIsCollapsed(false)}>
                <span className="font-bold">{comment.authorName}</span> <span className="mx-1">•</span> {comment.createdAt} <span className="mx-1">•</span> {comment.points} points (Collapsed)
            </div>
        )
    }

    return (
        <div className={cn("relative", depth > 0 && "ml-4 md:ml-8")}>
            {depth > 0 && (
                <div className="absolute top-0 left-[-1rem] md:left-[-2rem] bottom-0 w-[2px] bg-border hover:bg-primary/50 transition-colors cursor-pointer" onClick={() => setIsCollapsed(true)} />
            )}

            <div className="py-2 group">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                    <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">{comment.authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-foreground hover:underline cursor-pointer">{comment.authorName}</span>
                    <span>•</span>
                    <span>{comment.points} points</span>
                    <span>•</span>
                    <span>{comment.createdAt}</span>
                    <span className="cursor-pointer hover:text-foreground md:hidden" onClick={() => setIsCollapsed(true)}>[–]</span>
                </div>

                <div className="pl-8 text-sm leading-relaxed text-foreground/90">
                    {comment.content}
                </div>

                <div className="pl-8 mt-1 flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="h-6 px-1 text-xs text-muted-foreground hover:bg-muted/50">
                        <ArrowBigUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-1 text-xs text-muted-foreground hover:bg-muted/50">
                        <ArrowBigDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground hover:bg-muted/50 gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-1 text-xs text-muted-foreground hover:bg-muted/50">
                        Share
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-1 text-xs text-muted-foreground hover:bg-muted/50">
                        <MoreHorizontal className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="border-l-2 border-transparent hover:border-border/50 transition-colors">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}
