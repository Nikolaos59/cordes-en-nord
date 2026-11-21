-- V0.1 student records. Do not seed real students in source control.
-- Teacher rows are provisioned by an administrator after the teacher account exists.

create table if not exists public.teachers (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(trim(display_name)) between 1 and 100),
  created_at timestamptz not null default now()
);

alter table public.teachers enable row level security;
revoke all on table public.teachers from anon, authenticated;
grant select on table public.teachers to authenticated;

create policy "Teachers can read their own membership"
  on public.teachers
  for select
  to authenticated
  using (id = (select auth.uid()));

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers (id) on delete cascade,
  display_name text not null check (char_length(trim(display_name)) between 1 and 100),
  age smallint not null check (age between 3 and 120),
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  experience_months integer not null default 0 check (experience_months between 0 and 1200),
  foundations_status text not null default 'not_assessed'
    check (foundations_status in ('not_assessed', 'in_progress', 'needs_review', 'solid')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists students_teacher_created_idx
  on public.students (teacher_id, created_at desc);

alter table public.students enable row level security;
revoke all on table public.students from anon, authenticated;
grant select, insert, update, delete on table public.students to authenticated;

create policy "Teachers can read their students"
  on public.students
  for select
  to authenticated
  using (
    teacher_id = (select auth.uid())
    and exists (select 1 from public.teachers where id = (select auth.uid()))
  );

create policy "Teachers can add their own students"
  on public.students
  for insert
  to authenticated
  with check (
    teacher_id = (select auth.uid())
    and exists (select 1 from public.teachers where id = (select auth.uid()))
  );

create policy "Teachers can update their own students"
  on public.students
  for update
  to authenticated
  using (
    teacher_id = (select auth.uid())
    and exists (select 1 from public.teachers where id = (select auth.uid()))
  )
  with check (
    teacher_id = (select auth.uid())
    and exists (select 1 from public.teachers where id = (select auth.uid()))
  );

create policy "Teachers can delete their own students"
  on public.students
  for delete
  to authenticated
  using (
    teacher_id = (select auth.uid())
    and exists (select 1 from public.teachers where id = (select auth.uid()))
  );

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

create trigger students_set_updated_at
  before update on public.students
  for each row
  execute function public.set_updated_at();
