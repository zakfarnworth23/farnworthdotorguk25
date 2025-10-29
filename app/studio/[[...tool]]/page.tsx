"use client"

import { NextStudio } from "next-sanity/studio"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"

const config = defineConfig({
  name: "default",
  title: "Zak Farnworth Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      {
        name: "statement",
        title: "Statement",
        type: "document",
        fields: [
          {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
              source: "title",
              maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 3,
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: "category",
            title: "Category",
            type: "string",
            options: {
              list: [
                { title: "General", value: "General" },
                { title: "Technology", value: "Technology" },
                { title: "Education", value: "Education" },
                { title: "Awards", value: "Awards" },
              ],
            },
          },
          {
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {
              hotspot: true,
            },
          },
          {
            name: "body",
            title: "Body",
            type: "array",
            of: [
              {
                type: "block",
              },
              {
                type: "image",
                options: {
                  hotspot: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
})

export default function StudioPage() {
  return <NextStudio config={config} />
}
