"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronsUpDown, Image as ImageIcon, Link as LinkIcon, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useData } from "@/contexts/data-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

const communities = [
    { value: "technology", label: "r/technology" },
    { value: "worldnews", label: "r/worldnews" },
    { value: "funny", label: "r/funny" },
    { value: "hiking", label: "r/hiking" },
    { value: "cats", label: "r/cats" },
]

export function CreatePostForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(searchParams.get("r") || "")
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const { addPost } = useData()
    const { user } = useAuth()

    const handleSubmit = async () => {
        if (!user) {
            toast.error("You must be logged in to post")
            return
        }
        if (!value) {
            toast.error("Please select a community")
            return
        }
        if (!title) {
            toast.error("Please enter a title")
            return
        }

        setIsLoading(true)

        // Add to Data Context
        addPost({
            title,
            content,
            communityName: value,
            authorName: user.handle, // Use real handle
            imageUrl: "" // Handle image logic later if needed
        })

        // Small delay for UX
        await new Promise(r => setTimeout(r, 500))

        setIsLoading(false)
        toast.success("Post created successfully!")
        router.push(`/r/${value}`)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-lg font-medium">Create a post</h2>
            </div>

            <div className="space-y-4">
                {/* Community Selector */}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[300px] justify-between"
                        >
                            {value
                                ? communities.find((framework) => framework.value === value)?.label
                                : "Select Community..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search community..." />
                            <CommandList>
                                <CommandEmpty>No community found.</CommandEmpty>
                                <CommandGroup>
                                    {communities.map((framework) => (
                                        <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {framework.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                {/* Content Tabs */}
                <div className="rounded-xl border border-border/50 bg-card shadow-lg overflow-hidden">
                    <Tabs defaultValue="post" className="w-full">
                        <TabsList className="w-full justify-start rounded-none border-b border-border/50 bg-muted/20 p-2 h-auto gap-2">
                            <TabsTrigger
                                value="post"
                                className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:font-medium transition-all"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                Post
                            </TabsTrigger>
                            <TabsTrigger
                                value="image"
                                className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:font-medium transition-all"
                            >
                                <ImageIcon className="mr-2 h-4 w-4" />
                                Media
                            </TabsTrigger>
                            <TabsTrigger
                                value="link"
                                className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:font-medium transition-all"
                            >
                                <LinkIcon className="mr-2 h-4 w-4" />
                                Link
                            </TabsTrigger>
                        </TabsList>

                        <div className="p-6 space-y-6">
                            <Input
                                placeholder="Give your post a title..."
                                className="text-xl font-bold border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={300}
                                autoFocus
                            />

                            <TabsContent value="post" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                <Textarea
                                    placeholder="What's on your human mind?"
                                    className="min-h-[200px] resize-none border-none bg-muted/20 focus-visible:ring-0 p-4 rounded-lg text-lg"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </TabsContent>

                            <TabsContent value="image" className="mt-0">
                                <div className="flex flex-col h-[200px] w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer group">
                                    <div className="p-4 rounded-full bg-muted/30 group-hover:bg-primary/20 transition-colors mb-2">
                                        <ImageIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-sm text-muted-foreground group-hover:text-foreground">Drag & Drop or start upload</span>
                                </div>
                            </TabsContent>

                            <TabsContent value="link" className="mt-0">
                                <Textarea
                                    placeholder="Paste your URL here"
                                    className="min-h-[100px] resize-none border-none bg-muted/20 focus-visible:ring-0 p-4 rounded-lg font-mono text-sm"
                                />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                <div className="flex justify-end space-x-2">
                    <Button variant="ghost">Save Draft</Button>
                    <Button onClick={handleSubmit} disabled={isLoading || !title || !value}>
                        {isLoading ? "Posting..." : "Post"}
                    </Button>
                </div>

            </div>
        </div>
    )
}
