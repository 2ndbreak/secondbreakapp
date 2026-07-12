
CREATE TABLE public.signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'home',
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.signups TO anon;
GRANT SELECT, INSERT ON public.signups TO authenticated;
GRANT ALL ON public.signups TO service_role;

ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

-- Anyone can add themselves; nobody can read via API (only service_role / admin)
CREATE POLICY "Anyone can sign up" ON public.signups
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 120
    AND length(email) BETWEEN 3 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (message IS NULL OR length(message) <= 2000)
    AND length(source) BETWEEN 1 AND 60
  );
