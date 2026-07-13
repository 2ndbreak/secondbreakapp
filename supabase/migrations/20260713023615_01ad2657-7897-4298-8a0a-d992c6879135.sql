-- Auto-grant admin role to 2ndbreakk@gmail.com on signup or email confirmation
CREATE OR REPLACE FUNCTION public.grant_admin_for_team_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF lower(NEW.email) = '2ndbreakk@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_grant_team_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_grant_team_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_admin_for_team_email();

DROP TRIGGER IF EXISTS on_auth_user_updated_grant_team_admin ON auth.users;
CREATE TRIGGER on_auth_user_updated_grant_team_admin
AFTER UPDATE OF email, email_confirmed_at ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_admin_for_team_email();

-- Backfill if the user already exists
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE lower(email) = '2ndbreakk@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;