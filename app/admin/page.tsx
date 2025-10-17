import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminPage() {
  const supabase = await createClient()

  const { count: blogCount } = await supabase.from("blog_posts").select("*", { count: "exact", head: true })

  const { count: pressCount } = await supabase.from("press_statements").select("*", { count: "exact", head: true })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your blog posts and press statements</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage your blog content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-2xl font-bold">{blogCount || 0} Posts</p>
              <Button asChild>
                <Link href="/admin/blog">Manage Blog Posts</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Press Statements</CardTitle>
            <CardDescription>Manage your press releases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-2xl font-bold">{pressCount || 0} Statements</p>
              <Button asChild>
                <Link href="/admin/press">Manage Press Statements</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
