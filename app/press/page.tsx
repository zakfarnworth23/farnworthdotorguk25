import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format } from "date-fns"

export default async function PressPage() {
  const supabase = await createClient()

  const { data: statements } = await supabase
    .from("press_statements")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Press Statements</h1>
            <p className="text-lg text-muted-foreground">
              Official press releases and statements from the Office of Zak Farnworth
            </p>
          </div>

          <div className="space-y-6">
            {statements && statements.length > 0 ? (
              statements.map((statement) => (
                <Link key={statement.id} href={`/press/${statement.slug}`} className="block group">
                  <Card className="transition-colors hover:border-foreground/20">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <CardTitle className="group-hover:underline">{statement.title}</CardTitle>
                          {statement.excerpt && <CardDescription>{statement.excerpt}</CardDescription>}
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {format(new Date(statement.published_at), "MMM d, yyyy")}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No press statements published yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
