"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string
}

type PressStatement = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string
}

export function LatestNewsSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [pressStatements, setPressStatements] = useState<PressStatement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      const supabase = createClient()

      const [blogResult, pressResult] = await Promise.all([
        supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .order("published_at", { ascending: false })
          .limit(3),
        supabase
          .from("press_statements")
          .select("*")
          .eq("published", true)
          .order("published_at", { ascending: false })
          .limit(2),
      ])

      if (blogResult.data) setBlogPosts(blogResult.data)
      if (pressResult.data) setPressStatements(pressResult.data)
      setLoading(false)
    }

    fetchNews()
  }, [])

  const hasContent = blogPosts.length > 0 || pressStatements.length > 0

  if (loading) {
    return (
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Latest News</h2>
          <div className="text-sm text-muted-foreground font-mono">UPDATES & PRESS</div>
        </div>
        <div className="text-center text-muted-foreground py-8">Loading...</div>
      </div>
    )
  }

  if (!hasContent) {
    return null
  }

  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-light">Latest News</h2>
        <div className="text-sm text-muted-foreground font-mono">UPDATES & PRESS</div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
        {blogPosts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Blog Posts</h3>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-4">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-foreground group-hover:text-muted-foreground transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h4>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {format(new Date(post.published_at), "MMM d")}
                      </Badge>
                    </div>
                    {post.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {pressStatements.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Press Statements</h3>
              <Link
                href="/press"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-4">
              {pressStatements.map((statement) => (
                <Link
                  key={statement.id}
                  href={`/press/${statement.slug}`}
                  className="group block p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-foreground group-hover:text-muted-foreground transition-colors duration-300 line-clamp-2">
                        {statement.title}
                      </h4>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {format(new Date(statement.published_at), "MMM d")}
                      </Badge>
                    </div>
                    {statement.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{statement.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
