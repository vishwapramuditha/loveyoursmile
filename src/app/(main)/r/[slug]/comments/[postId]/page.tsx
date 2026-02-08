import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PostDetailClient } from "@/components/post/post-detail-client"

interface PageProps {
    params: Promise<{ slug: string; postId: string }>
}

export default async function PostPage({ params }: PageProps) {
    const resolvedParams = await params

    return (
        <div className="container max-w-4xl py-6">
            <Link href={`/r/${resolvedParams.slug}`} className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to r/{resolvedParams.slug}
            </Link>

            <PostDetailClient postId={resolvedParams.postId} />
        </div>
    )
}
