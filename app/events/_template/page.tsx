import Link from "next/link"

export default function EventTemplatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <Link
          href="/#events"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Events & Awards</span>
        </Link>

        <article className="space-y-12">
          <header className="space-y-6">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground font-mono tracking-wider uppercase">
                [Category: Speaking/Award]
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">[Event/Award Title]</h1>
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
                <span>[Year]</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>[Location/Organization]</span>
              </div>
            </div>
          </header>

          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
            <img src="/-describe-the-image-you-want-.jpg" alt="[Event/Award Title]" className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p>[Introduction paragraph about the event or award. Provide context and background.]</p>

            <h2 className="text-2xl font-light text-foreground mt-12 mb-6">[Section Title]</h2>
            <p>[Content for this section. Describe key aspects, achievements, or details.]</p>

            <h2 className="text-2xl font-light text-foreground mt-12 mb-6">[Another Section Title]</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>[Point 1]</li>
              <li>[Point 2]</li>
              <li>[Point 3]</li>
            </ul>

            <h2 className="text-2xl font-light text-foreground mt-12 mb-6">[Final Section Title]</h2>
            <p>[Concluding thoughts, impact, or reflections on the event or award.]</p>
          </div>

          <div className="pt-12 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#events"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300"
              >
                <span>View All Events & Awards</span>
              </Link>
              <Link
                href="mailto:zak@farnworth.org.uk"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-muted-foreground transition-all duration-300"
              >
                <span>Get in Touch</span>
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
