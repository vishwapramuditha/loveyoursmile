import { CommunityFeed } from "@/components/feed/community-feed"
import { CommunityHeader } from "@/components/community/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cake, Users, Info } from "lucide-react"

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function CommunityPage({ params }: PageProps) {
    const resolvedParams = await params
    const { slug } = resolvedParams

    return (
        <div className="container max-w-7xl mx-auto">
            <CommunityHeader
                name={slug}
                memberCount={125430}
                description="A place for verified humans to discuss specific topics without bot interference."
            />

            <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
                <div className="space-y-6">
                    <CommunityFeed slug={slug} />
                </div>

                <aside className="space-y-6 hidden md:block">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">About Community</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-4">
                            <p className="text-muted-foreground">
                                Welcome to r/{slug}. This is a verified community for humans only.
                                Bot activity is strictly prohibited and cryptographically impossible.
                            </p>

                            <div className="flex items-center gap-2">
                                <Cake className="w-4 h-4" />
                                <span className="text-muted-foreground">Created Feb 8, 2026</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span className="text-muted-foreground">125k Members</span>
                            </div>

                            <Button className="w-full">Create Post</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Community Rules</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs space-y-2 text-muted-foreground">
                            <p>1. Be Human.</p>
                            <p>2. Be Civil.</p>
                            <p>3. No AI generated content without disclosure.</p>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    )
}
