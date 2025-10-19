// TEMPLATE FILE - Copy this to create new statements
//
// Instructions:
// 1. Copy this file to app/media/statements/[slug]/page.tsx (replace [slug] with your statement slug)
// 2. Add your statement metadata to lib/statements-data.ts
// 3. Replace the placeholder content below with your actual statement content
// 4. The statement will automatically appear on the statements page

import Link from "next/link"

export default function StatementTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <Link
          href="/media/statements"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Statements</span>
        </Link>

        <article className="space-y-12">
          <header className="space-y-6 pb-8 border-b border-border">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground font-mono tracking-wider uppercase">
                [CATEGORY - e.g., ANNOUNCEMENT, UPDATE, RESPONSE]
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
                [Your Statement Title Here]
              </h1>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time>[Date - e.g., 15 January 2025]</time>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span>Office of Zak Farnworth</span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-xl text-foreground font-light">[Opening paragraph or excerpt - make it compelling]</p>

            <div className="pt-8 space-y-6">
              <p>[First paragraph of your statement. Provide context and background information.]</p>

              <p>[Second paragraph. Continue with the main content of your statement.]</p>

              <h2 className="text-2xl font-light text-foreground mt-12 mb-6">[Section Heading if needed]</h2>
              <p>[Additional content organized under sections if your statement is longer.]</p>

              <ul className="space-y-2 list-disc list-inside">
                <li>[Bullet point 1 if needed]</li>
                <li>[Bullet point 2]</li>
                <li>[Bullet point 3]</li>
              </ul>

              <p>[Closing paragraph with final thoughts or call to action.]</p>
            </div>
          </div>

          <div className="pt-12 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/media/statements"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300"
              >
                <span>View All Statements</span>
              </Link>
              <Link
                href="mailto:zak@farnworth.org.uk"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-muted-foreground transition-all duration-300"
              >
                <span>Media Inquiries</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
