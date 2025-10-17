import { createClient } from "@/lib/supabase/server"
import { PressStatementForm } from "@/components/press-statement-form"
import { notFound } from "next/navigation"

export default async function EditPressStatementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: statement } = await supabase.from("press_statements").select("*").eq("id", id).single()

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
