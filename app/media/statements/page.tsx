"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { getSortedStatements } from "@/lib/statements-data"

export default function StatementsPage() {
  const [isDark, setIsDark] = useState(true)
  const statements = getSortedStatements()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
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
              <div className="text-sm text-muted-foreground font-mono tracking-wider">STATEMENTS</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
                Press <span className="text-muted-foreground">Statements</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Official statements and announcements from the Office of Zak Farnworth.
            </p>
          </header>

          {statements.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No statements available at this time.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {statements.map((statement, index) => (
                <Link
                  key={statement.slug}
                  href={`/media/statements/${statement.slug}`}
                  className="group block py-6 border-b border-border hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <h2 className="text-xl sm:text-2xl font-light text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {statement.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">{statement.excerpt}</p>
                      {statement.category && (
                        <div className="inline-block px-3 py-1 text-xs text-muted-foreground border border-border rounded-full">
                          {statement.category}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono shrink-0">
                      <time dateTime={statement.date}>{formatDate(statement.date)}</time>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
