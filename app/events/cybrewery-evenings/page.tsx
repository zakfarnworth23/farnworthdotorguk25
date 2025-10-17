import Link from "next/link"

export default function CybreweryEveningsPage() {
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
              <div className="text-sm text-muted-foreground font-mono tracking-wider uppercase">Speaking</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">Cybrewery Evenings</h1>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                <span>Burnley, Lancashire</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>Community Tech Event</span>
              </div>
            </div>
          </header>

          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
            <img src="/cybersecurity-evening-event-burnley-tech-community.jpg" alt="Cybrewery Evenings" className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p>
              [Add your content here about your Cybrewery Evenings presentation. Describe the topics you covered, the
              community engagement, and key discussions.]
            </p>

            <h2 className="text-2xl font-light text-foreground mt-12 mb-6">Presentation Overview</h2>
            <p>
              [Describe what you presented about - cybersecurity, IT best practices, or other relevant topics for the
              local tech community.]
            </p>

            <h2 className="text-2xl font-light text-foreground mt-12 mb-6">Key Discussions</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>[Key discussion point 1]</li>
              <li>[Key discussion point 2]</li>
              <li>[Key discussion point 3]</li>
            </ul>

            <h2 className="text-2xl font-light text-foreground mt-12 mb-6">Community Impact</h2>
            <p>
              [Describe the impact on the local tech community and any follow-up discussions or collaborations that
              emerged.]
            </p>
          </div>

          <div className="pt-12 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#events"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300"
              >
                <span>View All Events</span>
              </Link>
              <Link
                href="mailto:zak@farnworth.org.uk"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-muted-foreground transition-all duration-300"
              >
                <span>Book Me to Speak</span>
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
