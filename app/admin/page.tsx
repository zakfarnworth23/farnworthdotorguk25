import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function AdminPage() {
  const supabase = await createClient()

  let blogCount = 0
  let pressCount = 0
  let hasError = false

  try {
    const { count: blogCountResult, error: blogError } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })

    if (blogError) {
      hasError = true
    } else {
      blogCount = blogCountResult || 0
    }
  } catch (error) {
    hasError = true
  }

  try {
    const { count: pressCountResult, error: pressError } = await supabase
      .from("press_statements")
      .select("*", { count: "exact", head: true })

    if (pressError) {
      hasError = true
    } else {
      pressCount = pressCountResult || 0
    }
  } catch (error) {
    hasError = true
  }

  // Show setup instructions if tables don't exist
  if (hasError) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Set up your database to get started</p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Database Setup Required</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>The database tables haven't been created yet. To set up your blog and press statement system:</p>
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
            <p className="mt-2">Once the script runs successfully, refresh this page to access your admin dashboard.</p>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

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
              <p className="text-2xl font-bold">{blogCount} Posts</p>
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
              <p className="text-2xl font-bold">{pressCount} Statements</p>
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
