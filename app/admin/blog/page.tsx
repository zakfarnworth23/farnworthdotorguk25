import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export default async function BlogPostsPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Create and manage your blog content</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">Create New Post</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.excerpt || "No excerpt"}</CardDescription>
                  </div>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {post.published_at
                      ? `Published ${formatDistanceToNow(new Date(post.published_at))} ago`
                      : `Created ${formatDistanceToNow(new Date(post.created_at))} ago`}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/blog/${post.id}`}>Edit</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No blog posts yet. Create your first one!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
