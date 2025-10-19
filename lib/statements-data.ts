export interface Statement {
  slug: string
  title: string
  date: string // Format: YYYY-MM-DD
  excerpt: string
  category?: string
}

// Add new statements to this array - they will automatically appear on the statements page
// Statements are automatically sorted by date (newest first)
export const statements: Statement[] = [
  {
    slug: "example-statement-2025",
    title: "Example Statement Title",
    date: "2025-01-15",
    excerpt: "This is an example statement. Replace this with your actual statement content and details.",
    category: "General",
  },
  // Add more statements here following the same format
  // {
  //   slug: "your-statement-slug",
  //   title: "Your Statement Title",
  //   date: "2025-01-20",
  //   excerpt: "Brief description of your statement...",
  //   category: "Category Name",
  // },
]

// Sort statements by date (newest first)
export const getSortedStatements = () => {
  return [...statements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get a single statement by slug
export const getStatementBySlug = (slug: string) => {
  return statements.find((statement) => statement.slug === slug)
}
