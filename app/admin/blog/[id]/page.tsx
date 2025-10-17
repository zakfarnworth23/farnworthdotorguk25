import { createClient } from "@/lib/supabase/server"
import { BlogPostForm } from "@/components/blog-post-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { notFound, redirect } from "next/navigation"

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (id === "new") {
    redirect("/admin/blog/new")
  }

  const supabase = await createClient()

  let post, error
  try {
    const result = await supabase.from("blog_posts").select("*").eq("id", id).single()
    post = result.data
    error = result.error
  } catch (e) {
    error = e
  }

  // Show setup instructions if table doesn't exist
  if (error && error.code === "PGRST205") {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <p className="text-muted-foreground mt-1">Set up your database to get started</p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Database Setup Required</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>The blog_posts table hasn't been created yet. To set up your blog system:</p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Open the Files panel on the left side of v0</li>
              <li>
                Navigate to the <code className="bg-muted px-1 py-0.5 rounded">scripts</code> folder
              </li>
              <li>
                Click on <code className="bg-muted px-1 py-0.5 rounded">001_create_blog_tables.sql</code>
              </li>
              <li>Click the Run button to execute the script</li>
            </ol>
            <p className="mt-2">Once the script runs successfully, refresh this page.</p>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground mt-1">Update your blog post content</p>
      </div>
      <BlogPostForm post={post} />
    </div>
  )
}
