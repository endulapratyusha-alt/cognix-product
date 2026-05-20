create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  website text,
  stage text,
  employee_range text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.diagnostic_projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  owner_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  diagnostic_type text,
  company_stage text,
  primary_buyer text,
  primary_motion text not null,
  status text not null default 'draft' check (status in ('draft', 'signals_ready', 'analyzing', 'report_ready', 'error')),
  coherence_score int,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.signals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.diagnostic_projects(id) on delete cascade,
  owner_id uuid not null references public.users(id) on delete cascade,
  signal_type text not null,
  title text not null,
  content text,
  notes text,
  file_path text,
  file_name text,
  file_mime_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.analysis_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.diagnostic_projects(id) on delete cascade,
  owner_id uuid not null references public.users(id) on delete cascade,
  status text not null default 'queued' check (status in ('queued', 'running', 'completed', 'failed')),
  model text,
  prompt jsonb,
  error text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.diagnostic_projects(id) on delete cascade,
  owner_id uuid not null references public.users(id) on delete cascade,
  analysis_run_id uuid references public.analysis_runs(id) on delete set null,
  coherence_score int not null,
  narrative_drift_score int not null,
  buyer_clarity_score int not null,
  differentiation_score int not null,
  sales_usability_score int not null,
  launch_readiness_score int not null,
  top_diagnosis text not null,
  summary text not null,
  evidence jsonb not null default '[]'::jsonb,
  fix_first jsonb not null default '[]'::jsonb,
  raw_output jsonb not null,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_touch_updated_at on public.users;
create trigger users_touch_updated_at before update on public.users
for each row execute function public.touch_updated_at();

drop trigger if exists companies_touch_updated_at on public.companies;
create trigger companies_touch_updated_at before update on public.companies
for each row execute function public.touch_updated_at();

drop trigger if exists diagnostic_projects_touch_updated_at on public.diagnostic_projects;
create trigger diagnostic_projects_touch_updated_at before update on public.diagnostic_projects
for each row execute function public.touch_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

alter table public.users enable row level security;
alter table public.companies enable row level security;
alter table public.diagnostic_projects enable row level security;
alter table public.signals enable row level security;
alter table public.analysis_runs enable row level security;
alter table public.reports enable row level security;

create policy "Users can read own profile" on public.users
for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users
for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users manage own companies" on public.companies
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "Users manage own projects" on public.diagnostic_projects
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "Users manage own signals" on public.signals
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "Users read own analysis runs" on public.analysis_runs
for select using (auth.uid() = owner_id);
create policy "Users create own analysis runs" on public.analysis_runs
for insert with check (auth.uid() = owner_id);

create policy "Users read own reports" on public.reports
for select using (auth.uid() = owner_id);

insert into storage.buckets (id, name, public)
values ('gtm-signals', 'gtm-signals', false)
on conflict (id) do nothing;

create policy "Users can upload own signal files" on storage.objects
for insert with check (
  bucket_id = 'gtm-signals'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can read own signal files" on storage.objects
for select using (
  bucket_id = 'gtm-signals'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete own signal files" on storage.objects
for delete using (
  bucket_id = 'gtm-signals'
  and auth.uid()::text = (storage.foldername(name))[1]
);
