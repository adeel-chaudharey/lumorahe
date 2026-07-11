-- ==========================================
-- Migration 004
-- Performance Indexes
-- ==========================================

create index idx_products_name
on public.products(name);

create index idx_products_slug
on public.products(slug);

create index idx_products_category
on public.products(category_id);

create index idx_products_status
on public.products(status);

create index idx_categories_slug
on public.categories(slug);