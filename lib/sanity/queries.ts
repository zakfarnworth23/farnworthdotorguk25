import { client } from "./client"

export interface Statement {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt: string
  category?: string
  mainImage?: any
  body: any[]
}

export async function getStatements(): Promise<Statement[]> {
  return client.fetch(
    `*[_type == "statement"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      category,
      mainImage,
      body
    }`,
  )
}

export async function getStatementBySlug(slug: string): Promise<Statement | null> {
  return client.fetch(
    `*[_type == "statement" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      category,
      mainImage,
      body
    }`,
    { slug },
  )
}
