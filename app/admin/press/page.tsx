import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export default async function PressStatementsPage() {
  const supabase = await createClient()

  const { data: statements, error } = await supabase
    .from("press_statements")
    .select("*")
    .order("created_at", { ascending: false })

  // Show setup instructions if table doesn't exist
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Press Statements</h1>
          <p className="text-muted-foreground mt-1">Set up your database to get started</p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Database Setup Required</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>The press_statements table hasn't been created yet. To set up your press statement system:</p>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Press Statements</h1>
          <p className="text-muted-foreground mt-1">Create and manage your press releases</p>
        </div>
        <Button asChild>
          <Link href="/admin/press/new">Create New Statement</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {statements && statements.length > 0 ? (
          statements.map((statement) => (
            <Card key={statement.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{statement.title}</CardTitle>
                    <CardDescription>{statement.excerpt || "No excerpt"}</CardDescription>
                  </div>
                  <Badge variant={statement.published ? "default" : "secondary"}>
                    {statement.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {statement.published_at
                      ? `Published ${formatDistanceToNow(new Date(statement.published_at))} ago`
                      : `Created ${formatDistanceToNow(new Date(statement.created_at))} ago`}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/press/${statement.id}`}>Edit</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No press statements yet. Create your first one!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
