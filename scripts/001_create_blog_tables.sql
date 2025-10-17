-- Create blog posts table
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  author_id uuid references auth.users(id) on delete cascade not null
);

-- Create press statements table
create table if not exists public.press_statements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  author_id uuid references auth.users(id) on delete cascade not null
);

-- Enable RLS
alter table public.blog_posts enable row level security;
alter table public.press_statements enable row level security;

-- Blog posts policies (public can read published, author can do everything)
create policy "Anyone can view published blog posts"
  on public.blog_posts for select
  using (published = true);

create policy "Authors can view their own blog posts"
  on public.blog_posts for select
  using (auth.uid() = author_id);

create policy "Authors can insert their own blog posts"
  on public.blog_posts for insert
  with check (auth.uid() = author_id);

create policy "Authors can update their own blog posts"
  on public.blog_posts for update
  using (auth.uid() = author_id);

create policy "Authors can delete their own blog posts"
  on public.blog_posts for delete
  using (auth.uid() = author_id);

-- Press statements policies (same pattern)
create policy "Anyone can view published press statements"
  on public.press_statements for select
  using (published = true);

create policy "Authors can view their own press statements"
  on public.press_statements for select
  using (auth.uid() = author_id);

create policy "Authors can insert their own press statements"
  on public.press_statements for insert
  with check (auth.uid() = author_id);

create policy "Authors can update their own press statements"
  on public.press_statements for update
  using (auth.uid() = author_id);

create policy "Authors can delete their own press statements"
  on public.press_statements for delete
  using (auth.uid() = author_id);

-- Create indexes for better performance
create index if not exists blog_posts_slug_idx on public.blog_posts(slug);
create index if not exists blog_posts_published_idx on public.blog_posts(published, published_at desc);
create index if not exists press_statements_slug_idx on public.press_statements(slug);
create index if not exists press_statements_published_idx on public.press_statements(published, published_at desc);
