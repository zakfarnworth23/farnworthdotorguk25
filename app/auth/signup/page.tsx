import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default function SignUpPage() {
  const signUp = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
      },
    })

    if (error) {
      redirect("/auth/signup?error=" + encodeURIComponent(error.message))
    }

    redirect("/auth/signup?success=true")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Create Admin Account</h1>
          <p className="mt-2 text-muted-foreground">Sign up to access the admin dashboard</p>
        </div>

        <form action={signUp} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-foreground"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-foreground"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-muted-foreground">Must be at least 6 characters</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline hover:text-foreground">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
