import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format } from "date-fns"

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
            <p className="text-lg text-muted-foreground">Thoughts, insights, and updates from Zak Farnworth</p>
          </div>

          <div className="space-y-6">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                  <Card className="transition-colors hover:border-foreground/20">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <CardTitle className="group-hover:underline">{post.title}</CardTitle>
                          {post.excerpt && <CardDescription>{post.excerpt}</CardDescription>}
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {format(new Date(post.published_at), "MMM d, yyyy")}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No blog posts published yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
