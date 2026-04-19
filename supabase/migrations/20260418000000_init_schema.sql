-- Enable Extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles (linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  role text default 'customer' check (role in ('admin', 'customer')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Products (Digital Focus)
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text,
  price decimal(10,2) not null,
  image_url text,
  digital_file_url text, -- URL to the digital asset (protected or bucket path)
  category_id uuid references public.categories(id),
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Orders
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  status text default 'pending' check (status in ('pending', 'paid', 'failed')),
  total_amount decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Order Items
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) not null,
  price decimal(10,2) not null
);

-- 6. Digital Access Tokens (Optional/Extended)
create table public.digital_access (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id) not null,
  order_id uuid references public.orders(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id, order_id)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.digital_access enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Categories Policies
create policy "Categories are viewable by everyone." on public.categories for select using (true);

-- Products Policies
create policy "Products are viewable by everyone." on public.products for select using (is_active = true);

-- Orders Policies
create policy "Users can view their own orders." on public.orders for select using (auth.uid() = user_id);
create policy "Users can create their own orders." on public.orders for insert with check (auth.uid() = user_id);

-- Order Items Policies
create policy "Users can view their own order items." on public.order_items for select using (
  exists (
    select 1 from public.orders where id = order_items.order_id and user_id = auth.uid()
  )
);

-- Digital Access Policies
create policy "Users can access their digital products." on public.digital_access for select using (auth.uid() = user_id);
