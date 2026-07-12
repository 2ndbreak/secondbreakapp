
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Share submissions
CREATE TABLE public.share_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL,
  language text NOT NULL,
  province text NOT NULL,
  community text NOT NULL,
  title text NOT NULL,
  story text NOT NULL,
  how_played text,
  why_mattered text,
  how_lives_today text,
  credit_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  consent_publish boolean NOT NULL,
  consent_elder boolean NOT NULL,
  involves_minor boolean NOT NULL,
  guardian_consent boolean NOT NULL DEFAULT false
);
GRANT INSERT ON public.share_submissions TO anon, authenticated;
GRANT SELECT ON public.share_submissions TO authenticated;
GRANT ALL ON public.share_submissions TO service_role;
ALTER TABLE public.share_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone insert share" ON public.share_submissions FOR INSERT TO anon, authenticated WITH CHECK (
  consent_publish = true AND consent_elder = true AND (involves_minor = false OR guardian_consent = true)
);
CREATE POLICY "admin read share" ON public.share_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Host a break
CREATE TABLE public.host_a_break_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  organisation text,
  city text NOT NULL,
  email text NOT NULL,
  message text
);
GRANT INSERT ON public.host_a_break_requests TO anon, authenticated;
GRANT SELECT ON public.host_a_break_requests TO authenticated;
GRANT ALL ON public.host_a_break_requests TO service_role;
ALTER TABLE public.host_a_break_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone insert host" ON public.host_a_break_requests FOR INSERT TO anon, authenticated WITH CHECK (length(name)>0 AND length(email)>3);
CREATE POLICY "admin read host" ON public.host_a_break_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Playground signups
CREATE TABLE public.playground_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL
);
GRANT INSERT ON public.playground_signups TO anon, authenticated;
GRANT SELECT ON public.playground_signups TO authenticated;
GRANT ALL ON public.playground_signups TO service_role;
ALTER TABLE public.playground_signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone insert playground" ON public.playground_signups FOR INSERT TO anon, authenticated WITH CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
CREATE POLICY "admin read playground" ON public.playground_signups FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Contact messages
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone insert contact" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (length(name)>0 AND length(email)>3 AND length(message)>0);
CREATE POLICY "admin read contact" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
