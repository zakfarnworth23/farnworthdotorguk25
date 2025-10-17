import { BlogPostForm } from "@/components/blog-post-form"

export default function NewBlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <p className="text-muted-foreground mt-1">Write and publish a new blog post</p>
      </div>
      <BlogPostForm />
    </div>
  )
}
