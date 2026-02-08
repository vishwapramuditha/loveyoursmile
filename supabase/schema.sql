-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (linked to Proof of Personhood)
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  handle text unique not null,
  pop_token text, -- Proof of Personhood token/hash
  karma int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Communities (Sub-communities/Subreddits)
create table public.communities (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  description text,
  created_by uuid references public.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Posts
create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid references public.communities(id) not null,
  author_id uuid references public.users(id) not null,
  title text not null,
  content text,
  upvotes int default 0,
  downvotes int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Comments (Threaded)
create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references public.posts(id) not null,
  parent_id uuid references public.comments(id), -- Nullable for top-level comments
  author_id uuid references public.users(id) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Votes (to prevent double voting and handle karma)
create table public.votes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) not null,
  target_id uuid not null, -- Can be post_id or comment_id
  target_type text check (target_type in ('post', 'comment')) not null,
  value int check (value in (1, -1)) not null,
  unique (user_id, target_id, target_type)
);

-- Enable Row Level Security (RLS) on all tables
alter table public.users enable row level security;
alter table public.communities enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.votes enable row level security;

-- Policies (Stubbed for now - allow read to all, write logic will be handled via server actions or verified users)
create policy "Public read access" on public.users for select using (true);
create policy "Public read access" on public.communities for select using (true);
create policy "Public read access" on public.posts for select using (true);
create policy "Public read access" on public.comments for select using (true);
create policy "Public read access" on public.votes for select using (true);
