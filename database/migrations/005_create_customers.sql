create table public.customers (

    id uuid primary key default gen_random_uuid(),

    full_name text not null,

    email text not null unique,

    phone text,

    avatar_url text,

    total_orders integer not null default 0,

    total_spent numeric(12,2) not null default 0,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

alter table public.customers
enable row level security;

create policy "Enable all for authenticated users"
on public.customers
for all
to authenticated
using (true)
with check (true);

create index customers_email_idx
on public.customers(email);