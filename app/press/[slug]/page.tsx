import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function PressStatementPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: statement } = await supabase
    .from("press_statements")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!statement) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="space-y-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/press">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Press Statements
            </Link>
          </Button>

          <article className="space-y-6">
            <header className="space-y-4">
              <div className="inline-block px-3 py-1 text-xs font-medium bg-muted rounded-full">Press Statement</div>
              <h1 className="text-4xl font-bold tracking-tight text-balance">{statement.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <time dateTime={statement.published_at}>
                  {format(new Date(statement.published_at), "MMMM d, yyyy")}
                </time>
              </div>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap">{statement.content}</div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
