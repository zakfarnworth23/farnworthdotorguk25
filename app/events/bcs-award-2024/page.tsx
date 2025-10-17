import Link from "next/link"

export default function BCSAward2024Page() {
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
              <div className="text-sm text-muted-foreground font-mono tracking-wider uppercase">Award</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">BCS Highly Commended Award</h1>
              <p className="text-xl text-muted-foreground">IT Infrastructure, Networks & Support</p>
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
                <span>2024</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>BCS, The Chartered Institute for IT</span>
              </div>
            </div>
          </header>

          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted/20">
            <img
              src="/award-trophy-it-infrastructure-recognition-profess.jpg"
              alt="BCS Highly Commended Award 2024"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p>
              [Add your content here about receiving the BCS Highly Commended Award. Describe what this recognition
              means to you and the work that led to this achievement.]
            </p>

            <h2 className="text-2xl font-light text-foreground mt-12 mb-6">Recognition</h2>
            <p>
              The BCS Highly Commended Award in IT Infrastructure, Networks & Support recognizes outstanding
              contributions to IT infrastructure management in the education sector.
            </p>

            <h2 className="text-2xl font-light text-foreground mt-12 mb-6">Key Achievements</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Led successful cloud migration projects across multiple schools</li>
              <li>Implemented comprehensive Microsoft Intune rollout</li>
              <li>Developed automation systems to improve operational efficiency</li>
              <li>Successfully deployed HaloITSM across the trust</li>
            </ul>

            <h2 className="text-2xl font-light text-foreground mt-12 mb-6">Impact</h2>
            <p>
              [Describe the impact of your work on the organization and how this award validates your contributions to
              IT infrastructure and education technology.]
            </p>
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
