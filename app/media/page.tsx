"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function MediaCenter() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Portfolio</span>
          </Link>

          <button
            onClick={toggleTheme}
            className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg
                className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-32 pb-20">
        <div className="space-y-16 sm:space-y-20">
          <header className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-mono tracking-wider">MEDIA CENTER</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
                Press & <span className="text-muted-foreground">Resources</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Professional resources for external trusts, schools, and media inquiries. All materials are available for
              download and use with proper attribution.
            </p>
          </header>

          <section className="space-y-8">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl sm:text-3xl font-light">Curriculum Vitae</h2>
              <div className="text-sm text-muted-foreground font-mono">PDF</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/cv/zak-farnworth-cv.pdf"
                download
                className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                      Full CV
                    </div>
                    <svg
                      className="w-5 h-5 text-muted-foreground group-hover:translate-y-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-sm text-muted-foreground">Complete professional history and qualifications</div>
                </div>
              </a>

              <a
                href="/cv/zak-farnworth-cv-summary.pdf"
                download
                className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                      CV Summary
                    </div>
                    <svg
                      className="w-5 h-5 text-muted-foreground group-hover:translate-y-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-sm text-muted-foreground">One-page overview of key experience</div>
                </div>
              </a>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl sm:text-3xl font-light">Professional Headshots</h2>
              <div className="text-sm text-muted-foreground font-mono">HIGH-RES</div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Official Portrait", file: "officialphoto.jpg" },
                { name: "Casual Portrait", file: "casual-headshot.jpg" },
                { name: "Professional Studio", file: "studio-headshot.jpg" },
              ].map((photo) => (
                <div
                  key={photo.name}
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <img
                    src={`/${photo.file}`}
                    alt={photo.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                      <div className="text-foreground text-sm">{photo.name}</div>
                      <a
                        href={`/${photo.file}`}
                        download
                        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl sm:text-3xl font-light">Biography</h2>
              <div className="text-sm text-muted-foreground font-mono">TEXT</div>
            </div>

            <div className="space-y-6 p-6 border border-border rounded-lg">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Zak Farnworth</strong> is an ICT Technician based in Bolton,
                  United Kingdom, with a passion for leveraging technology to make a positive impact in education and
                  beyond.
                </p>
                <p>
                  His journey in IT began with an apprenticeship at The Quill C of E Trust, where he led cloud
                  migrations, Intune rollouts, automation systems, and HaloITSM implementation. His exceptional work was
                  recognized with a 'Highly Commended' BCS award for IT Infrastructure.
                </p>
                <p>
                  Currently working at Albany Learning Trust, Zak continues to develop his expertise in Active
                  Directory, Microsoft 365, and modern IT infrastructure management, focusing on solutions that improve
                  educational technology systems.
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => {
                    const bio = document.querySelector("section:nth-of-type(3) .space-y-4")?.textContent || ""
                    navigator.clipboard.writeText(bio)
                  }}
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy to clipboard
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl sm:text-3xl font-light">Contact</h2>
              <div className="text-sm text-muted-foreground font-mono">INQUIRIES</div>
            </div>

            <div className="p-6 border border-border rounded-lg space-y-4">
              <p className="text-muted-foreground">
                For media inquiries, speaking engagements, or collaboration opportunities, please reach out:
              </p>
              <Link
                href="mailto:zak@farnworth.org.uk"
                className="group inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
              >
                <span className="text-lg">zak@farnworth.org.uk</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-12 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-muted-foreground">© 2025 Zak Farnworth. All rights reserved.</div>
          <div className="text-xs text-muted-foreground">Office of Zak Farnworth</div>
        </div>
      </footer>
    </div>
  )
}
