-- ==========================================
-- Migration 002
-- Create Categories Table
-- ==========================================

create table public.categories (

    id uuid primary key default gen_random_uuid(),

    name text not null unique,

    slug text not null unique,

    description text,

    image_url text,

    featured boolean not null default false,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

alter table public.categories
enable row level security;