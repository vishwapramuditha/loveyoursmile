"use client"

import * as React from "react"
import { Post } from "@/components/feed/post-card"
import { CommentType } from "@/components/comment/comment-item"

interface DataContextType {
    posts: Post[]
    comments: Record<string, CommentType[]> // postId -> comments
    addPost: (post: Omit<Post, "id" | "votes" | "comments" | "createdAt">) => void
    addComment: (postId: string, comment: Omit<CommentType, "id" | "points" | "createdAt" | "replies">) => void
    votePost: (postId: string, value: 1 | -1) => void
    getPost: (postId: string) => Post | undefined
    getComments: (postId: string) => CommentType[]
}

const DataContext = React.createContext<DataContextType | undefined>(undefined)

// Initial Mock Data to populate if empty
const INITIAL_POSTS: Post[] = [
    {
        id: "p1",
        title: "Introducing Zero-Bot: The First Truly Human Social Network",
        content: "We're launching today with a simple promise: No bots. Just people. Verified by cryptographic proof of personhood.",
        communityName: "announcements",
        authorName: "antigravity_admin",
        votes: 15420,
        comments: 342,
        createdAt: "2 hours ago",
        userVote: 1,
    },
    {
        id: "p2",
        title: "Look at this view from my morning hike!",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
        content: "",
        communityName: "hiking",
        authorName: "nature_lover_99",
        votes: 890,
        comments: 45,
        createdAt: "4 hours ago",
        userVote: 0,
    }
]

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = React.useState<Post[]>([])
    const [comments, setComments] = React.useState<Record<string, CommentType[]>>({})
    const [isInitialized, setIsInitialized] = React.useState(false)

    // Load from LocalStorage on mount
    React.useEffect(() => {
        const storedPosts = localStorage.getItem("zb_posts")
        const storedComments = localStorage.getItem("zb_comments")

        if (storedPosts) {
            setPosts(JSON.parse(storedPosts))
        } else {
            setPosts(INITIAL_POSTS)
            localStorage.setItem("zb_posts", JSON.stringify(INITIAL_POSTS))
        }

        if (storedComments) {
            setComments(JSON.parse(storedComments))
        }

        setIsInitialized(true)
    }, [])

    // Save to LocalStorage on change
    React.useEffect(() => {
        if (!isInitialized) return
        localStorage.setItem("zb_posts", JSON.stringify(posts))
    }, [posts, isInitialized])

    React.useEffect(() => {
        if (!isInitialized) return
        localStorage.setItem("zb_comments", JSON.stringify(comments))
    }, [comments, isInitialized])

    const addPost = (newPostData: Omit<Post, "id" | "votes" | "comments" | "createdAt">) => {
        const newPost: Post = {
            ...newPostData,
            id: Math.random().toString(36).substring(2, 9),
            votes: 0,
            comments: 0,
            createdAt: "Just now",
            userVote: 0
        }
        setPosts(prev => [newPost, ...prev])
    }

    const addComment = (postId: string, newCommentData: Omit<CommentType, "id" | "points" | "createdAt" | "replies">) => {
        const newComment: CommentType = {
            ...newCommentData,
            id: Math.random().toString(36).substring(2, 9),
            points: 1,
            createdAt: "Just now",
            replies: []
        }

        setComments(prev => ({
            ...prev,
            [postId]: [newComment, ...(prev[postId] || [])]
        }))

        // Update post comment count
        setPosts(prev => prev.map(p =>
            p.id === postId ? { ...p, comments: p.comments + 1 } : p
        ))
    }

    const votePost = (postId: string, value: 1 | -1) => {
        setPosts(prev => prev.map(p => {
            if (p.id !== postId) return p

            // Should be more complex logic to toggle vote, but simple increment for now
            // Real logic is handled in component state usually, but syncing here helps
            // userVote logic is tricky without user ID context, simplified for prototype
            return {
                ...p,
                votes: p.votes + value,
                userVote: value // simplified
            }
        }))
    }

    const getPost = (postId: string) => posts.find(p => p.id === postId)

    const getComments = (postId: string) => comments[postId] || []

    return (
        <DataContext.Provider value={{ posts, comments, addPost, addComment, votePost, getPost, getComments }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = React.useContext(DataContext)
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider")
    }
    return context
}
