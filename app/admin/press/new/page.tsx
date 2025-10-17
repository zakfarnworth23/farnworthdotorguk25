import { PressStatementForm } from "@/components/press-statement-form"

export default function NewPressStatementPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Press Statement</h1>
        <p className="text-muted-foreground mt-1">Write and publish a new press release</p>
      </div>
      <PressStatementForm />
    </div>
  )
}
