# Sanity CMS Integration Guide

This portfolio uses Sanity CMS for managing blog posts and statements. Follow this guide to set up and use the CMS.

## Setup Instructions

### 1. Access Sanity Studio

The Sanity Studio is already integrated into your Next.js app. Access it at:

\`\`\`
http://localhost:3000/studio
\`\`\`

Or in production:

\`\`\`
https://your-domain.com/studio
\`\`\`

### 2. Environment Variables

Your Sanity environment variables are already configured:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Your Sanity dataset (usually "production")

These are automatically used by the Sanity client.

## Creating New Statements

### Option 1: Using Sanity Studio (Recommended)

1. Navigate to `/studio` in your browser
2. Click on "Statement" in the sidebar
3. Click "Create new Statement"
4. Fill in the required fields:
   - **Title**: The statement headline
   - **Slug**: Auto-generated from title (click "Generate")
   - **Published at**: Date and time of publication
   - **Excerpt**: Brief summary (shown in the list view)
   - **Category**: Select from predefined categories
   - **Main image**: Optional featured image
   - **Body**: Rich text content with formatting, images, etc.
5. Click "Publish" when ready

### Option 2: Using Sanity CLI

If you prefer working from the command line:

\`\`\`bash
npm run sanity
\`\`\`

This opens the Sanity Studio in development mode.

## Content Structure

### Statement Schema

Each statement has the following fields:

- `title` (string, required): The statement title
- `slug` (slug, required): URL-friendly identifier
- `publishedAt` (datetime, required): Publication date
- `excerpt` (text, required): Brief summary
- `category` (string, optional): Category tag
- `mainImage` (image, optional): Featured image
- `body` (array, required): Rich text content

### Categories

Available categories:
- General
- Technology
- Education
- Awards

You can add more categories by editing `lib/sanity/schemas/statement.ts`.

## How It Works

1. **Content Creation**: You create statements in Sanity Studio
2. **Automatic Discovery**: The statements page automatically fetches all published statements
3. **Date Ordering**: Statements are displayed newest first
4. **Dynamic Pages**: Individual statement pages are generated automatically
5. **Revalidation**: Content updates every 60 seconds (configurable)

## Adding New Statement Categories

Edit `lib/sanity/schemas/statement.ts`:

\`\`\`typescript
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
      { title: "Your New Category", value: "Your New Category" }, // Add here
    ],
  },
}
\`\`\`

## Customizing the Schema

To add new fields to statements:

1. Edit `lib/sanity/schemas/statement.ts`
2. Add your new field to the `fields` array
3. Restart the dev server
4. The new field will appear in Sanity Studio

## Deployment

When deploying to production:

1. Your Sanity Studio will be available at `your-domain.com/studio`
2. Make sure your environment variables are set in your hosting platform
3. The content will be fetched from Sanity's CDN automatically

## Support

For Sanity-specific questions, visit:
- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
