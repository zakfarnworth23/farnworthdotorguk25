import { createClient } from "@/lib/supabase/server"
import { BlogPostForm } from "@/components/blog-post-form"
import { notFound } from "next/navigation"

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).single()

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
