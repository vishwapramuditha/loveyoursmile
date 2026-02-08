"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export interface Post {
    id: string
    title: string
    content: string
    communityName: string
    authorName: string
    authorAvatar?: string
    votes: number
    comments: number
    createdAt: string
    imageUrl?: string
    userVote?: 1 | -1 | 0
}

interface PostCardProps {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    const [voteCount, setVoteCount] = React.useState(post.votes)
    const [userVote, setUserVote] = React.useState(post.userVote || 0)

    const handleVote = (value: 1 | -1) => {
        if (userVote === value) {
            // Toggle off
            setUserVote(0)
            setVoteCount(post.votes)
        } else {
            // Toggle on specific vote
            setUserVote(value)
            setVoteCount(post.votes + value)
        }
    }

    return (
        <div className="flex flex-col md:flex-row bg-card rounded-xl border border-border/40 hover:border-primary/50 transition-all duration-300 overflow-hidden cursor-pointer group shadow-sm hover:shadow-md">
            {/* Vote Column - Mobile: Horizontal, Desktop: Vertical */}
            <div className="flex md:flex-col items-center justify-between md:justify-start bg-muted/10 p-2 md:w-14 md:pt-4 border-b md:border-b-0 md:border-r border-border/40 gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-8 w-8 rounded-full p-0 hover:bg-orange-500/10 hover:text-orange-500 transition-colors",
                        userVote === 1 && "text-orange-500 bg-orange-500/10"
                    )}
                    onClick={(e) => { e.stopPropagation(); handleVote(1); }}
                >
                    <ArrowBigUp className={cn("h-6 w-6 stroke-[1.5]", userVote === 1 && "fill-current")} />
                </Button>

                <span className={cn(
                    "text-xs font-bold font-mono my-1 min-w-[3ch] text-center",
                    userVote === 1 ? "text-orange-500" : userVote === -1 ? "text-blue-500" : "text-muted-foreground/80"
                )}>
                    {new Intl.NumberFormat('en-US', { notation: "compact" }).format(voteCount)}
                </span>

                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-8 w-8 rounded-full p-0 hover:bg-blue-500/10 hover:text-blue-500 transition-colors",
                        userVote === -1 && "text-blue-500 bg-blue-500/10"
                    )}
                    onClick={(e) => { e.stopPropagation(); handleVote(-1); }}
                >
                    <ArrowBigDown className={cn("h-6 w-6 stroke-[1.5]", userVote === -1 && "fill-current")} />
                </Button>
            </div>

            {/* Content Column */}
            <div className="flex-1 p-4 pb-3">
                {/* Metadata */}
                <div className="flex flex-wrap items-center text-xs text-muted-foreground mb-3 gap-2">
                    <Link href={`/r/${post.communityName}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 hover:bg-muted/50 px-1.5 py-0.5 rounded-full transition-colors">
                        <Avatar className="h-4 w-4">
                            <AvatarFallback className="text-[8px] bg-primary/20 text-primary">{post.communityName.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-foreground hover:text-primary transition-colors">r/{post.communityName}</span>
                    </Link>
                    <span className="text-muted-foreground/30">•</span>
                    <span className="flex items-center gap-1">
                        <span>Posted by</span>
                        <Link href={`/u/${post.authorName}`} onClick={(e) => e.stopPropagation()} className="font-medium hover:text-foreground transition-colors">u/{post.authorName}</Link>
                    </span>
                    <span className="text-muted-foreground/30">•</span>
                    <span>{post.createdAt}</span>
                </div>

                {/* Title & Body */}
                <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-semibold leading-tight mb-3 group-hover:text-primary/90 transition-colors">{post.title}</h3>
                    {post.imageUrl && (
                        <div className="mb-4 rounded-lg overflow-hidden bg-black/50 border border-border/20 max-h-[500px] flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={post.imageUrl} alt={post.title} className="max-w-full object-contain" />
                        </div>
                    )}
                    {post.content && !post.imageUrl && (
                        <div className="text-sm text-foreground/80 line-clamp-3 md:line-clamp-4 leading-relaxed font-light">
                            {post.content}
                        </div>
                    )}
                </div>

                {/* Action Bar */}
                <div className="flex items-center gap-1 text-muted-foreground border-t border-border/20 pt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-xs md:text-sm hover:bg-muted/50 hover:text-foreground gap-2 rounded-full transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments} <span className="hidden sm:inline">Comments</span></span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-xs md:text-sm hover:bg-muted/50 hover:text-foreground gap-2 rounded-full transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                    </Button>
                    <div className="flex-1" />
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted/50 hover:text-foreground rounded-full transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
