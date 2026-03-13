import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, FileText, LogOut } from "lucide-react"
import { SignOutButton } from "@/components/sign-out-button"

export default async function PortalPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/portal/login")
  }

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold">
              Zak Farnworth
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Admin Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your blog posts
            </p>
          </div>
          <Link href="/portal/posts/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        {error ? (
          <div className="p-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-lg border border-red-200 dark:border-red-900">
            <p className="font-medium">Database not configured</p>
            <p className="mt-1">Please run the SQL migration script in /scripts/001_create_blog_posts.sql</p>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/portal/posts/${post.id}`}
                className="block p-6 bg-card rounded-lg border hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold truncate">{post.title}</h2>
                      {!post.published && (
                        <span className="px-2 py-0.5 text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded">
                          Draft
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      {new Date(post.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/50">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No posts yet</h3>
            <p className="text-muted-foreground mt-1">Get started by creating your first blog post.</p>
            <Link href="/portal/posts/new" className="mt-4 inline-block">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
