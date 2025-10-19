"use client"

import Link from "next/link"
import Image from "next/image"
import { getSortedStatements } from "@/lib/statements-data"

export default function StatementsPage() {
  const statements = getSortedStatements()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Plain logo in nav */}
            <Image
              src="/OOZF_Logo.png"
              alt="Office Logo"
              width={150}
              height={150}
            />

            <Link
              href="/"
              className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
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
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-32 pb-20">
        <div className="space-y-16 sm:space-y-20">
          <header className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-gray-500 font-mono tracking-wider">STATEMENTS</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
                Press <span className="text-gray-500">Statements</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Official statements and announcements from the Office of Zak Farnworth.
            </p>
          </header>

          {statements.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">No statements available at this time.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {statements.map((statement) => (
                <Link
                  key={statement.slug}
                  href={`/media/statements/${statement.slug}`}
                  className="group block py-6 border-b border-gray-200 hover:border-gray-400 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <h2 className="text-xl sm:text-2xl font-light text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                        {statement.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">{statement.excerpt}</p>
                      {statement.category && (
                        <div className="inline-block px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded-full">
                          {statement.category}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 font-mono shrink-0">
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

      <footer className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-12 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-gray-500">© 2025 Zak Farnworth. All rights reserved.</div>
          <div className="text-xs text-gray-500">Office of Zak Farnworth</div>
        </div>
      </footer>
    </div>
  )
}
