-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published posts
CREATE POLICY "Anyone can read published posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (published = true);

-- Policy: Authenticated users can read all posts (for admin)
CREATE POLICY "Authenticated users can read all posts" 
  ON public.blog_posts 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert posts
CREATE POLICY "Authenticated users can insert posts" 
  ON public.blog_posts 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update posts
CREATE POLICY "Authenticated users can update posts" 
  ON public.blog_posts 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Policy: Authenticated users can delete posts
CREATE POLICY "Authenticated users can delete posts" 
  ON public.blog_posts 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);

-- Create index for published posts ordered by date
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published, published_at DESC);
