import { createClient } from "@/lib/supabase/server"
import { PressStatementForm } from "@/components/press-statement-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { notFound, redirect } from "next/navigation"

export default async function EditPressStatementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (id === "new") {
    redirect("/admin/press/new")
  }

  const supabase = await createClient()

  let statement, error
  try {
    const result = await supabase.from("press_statements").select("*").eq("id", id).single()
    statement = result.data
    error = result.error
  } catch (e) {
    error = e
  }

  // Show setup instructions if table doesn't exist
  if (error && error.code === "PGRST205") {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Press Statement</h1>
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

  if (!statement) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Press Statement</h1>
        <p className="text-muted-foreground mt-1">Update your press statement content</p>
      </div>
      <PressStatementForm statement={statement} />
    </div>
  )
}
