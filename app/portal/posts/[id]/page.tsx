"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Loader2, Save, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  created_at: string
  updated_at: string
}

export default function EditPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error || !data) {
        setError("Post not found")
        setLoading(false)
        return
      }

      setPost(data)
      setTitle(data.title)
      setSlug(data.slug)
      setExcerpt(data.excerpt || "")
      setContent(data.content)
      setPublished(data.published)
      setLoading(false)
    }

    fetchPost()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const supabase = createClient()

    const { error: updateError } = await supabase
      .from("blog_posts")
      .update({
        title,
        slug,
        excerpt,
        content,
        published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    router.push("/portal")
    router.refresh()
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return
    }

    setDeleting(true)
    const supabase = createClient()

    const { error: deleteError } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", params.id)

    if (deleteError) {
      setError(deleteError.message)
      setDeleting(false)
      return
    }

    router.push("/portal")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to posts
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold">Post not found</h1>
            <p className="text-muted-foreground mt-2">This post may have been deleted.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to posts
          </Link>
          {published && (
            <Link
              href={`/blog/${slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View live
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-lg border border-red-200 dark:border-red-900">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My awesome post"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-awesome-post"
              required
            />
            <p className="text-xs text-muted-foreground">
              This will be the URL: /blog/{slug || "my-awesome-post"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary of your post..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={15}
              className="font-mono text-sm"
              required
            />
            <p className="text-xs text-muted-foreground">
              Supports basic Markdown formatting
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <div>
              <Label htmlFor="published" className="cursor-pointer">
                Published
              </Label>
              <p className="text-xs text-muted-foreground">
                {published
                  ? "This post is visible to everyone"
                  : "This post is a draft - only you can see it"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-between">
            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Link href="/portal">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
