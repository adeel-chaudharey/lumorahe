-- ==========================================
-- Migration 001
-- Create Products Table
-- ==========================================

create table public.products (
    id uuid primary key default gen_random_uuid(),

    name text not null,

    slug text not null unique,

    short_description text,

    description text not null,

    price numeric(10,2) not null default 0,

    compare_price numeric(10,2),

    sku text not null unique,

    stock integer not null default 0,

    brand text,

    featured boolean not null default false,

    status text not null
        default 'draft'
        check (status in ('draft', 'published', 'archived')),

    thumbnail text,

    video_url text,

    weight numeric(10,2),

    seo_title text,

    seo_description text,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

-- ==========================================
-- Enable Row Level Security
-- ==========================================

alter table public.products
enable row level security;

//first database migration
//will be changed soon