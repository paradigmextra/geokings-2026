-- Application accounts use Geoking's existing bcrypt + HTTP-only session authentication.
-- The publishable key must never read accounts, KYC details, sessions or payments.
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'geoking_backend') THEN
    CREATE ROLE geoking_backend NOLOGIN NOINHERIT;
  END IF;
END $$;
CREATE TABLE IF NOT EXISTS public.users (
  id text PRIMARY KEY, name text NOT NULL, email text UNIQUE NOT NULL,
  password text NOT NULL, role text NOT NULL DEFAULT 'client' CHECK (role IN ('admin','client')),
  account_type text NOT NULL DEFAULT 'buyer' CHECK (account_type IN ('buyer','seller')),
  kyc_status text NOT NULL DEFAULT 'not_submitted' CHECK (kyc_status IN ('not_submitted','pending','approved','rejected')),
  kyc_id_number text, kyc_phone text, kyc_address text, kyc_document_key text, kyc_document_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower ON public.users(lower(email));
CREATE TABLE IF NOT EXISTS public.sessions (
  token text PRIMARY KEY, user_id text NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  expires bigint NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_expiry ON public.sessions(expires);
CREATE TABLE IF NOT EXISTS public.properties (
  id text PRIMARY KEY, title text NOT NULL, location text NOT NULL,
  type text NOT NULL CHECK (type IN ('House','Land','Commercial')),
  description text NOT NULL, price bigint NOT NULL CHECK (price > 0), image text NOT NULL,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available','draft','sold')),
  owner_user_id text REFERENCES public.users(id) ON DELETE SET NULL,
  approval_status text NOT NULL DEFAULT 'approved' CHECK (approval_status IN ('approved','pending','rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS properties_owner ON public.properties(owner_user_id);
CREATE INDEX IF NOT EXISTS properties_catalogue ON public.properties(approval_status,status,created_at DESC);
CREATE TABLE IF NOT EXISTS public.payments (
  id text PRIMARY KEY, user_id text REFERENCES public.users(id) ON DELETE SET NULL,
  property_id text NOT NULL REFERENCES public.properties(id), title text NOT NULL,
  amount bigint NOT NULL CHECK (amount > 0), currency text NOT NULL DEFAULT 'MWK',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid')),
  checkout_url text, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS property_active_payment ON public.payments(property_id) WHERE status IN ('pending','paid');
CREATE INDEX IF NOT EXISTS payments_user ON public.payments(user_id);
CREATE TABLE IF NOT EXISTS public.saved_properties (
  user_id text NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  property_id text NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  PRIMARY KEY(user_id,property_id)
);
CREATE TABLE IF NOT EXISTS public.rate_limits (
  key text PRIMARY KEY, count integer NOT NULL, reset bigint NOT NULL
);
GRANT CONNECT ON DATABASE postgres TO geoking_backend;
GRANT USAGE ON SCHEMA public TO geoking_backend;
DO $$ DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY['users','sessions','properties','payments','saved_properties','rate_limits'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY',table_name);
    EXECUTE format('REVOKE ALL ON public.%I FROM anon, authenticated',table_name);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO geoking_backend',table_name);
    EXECUTE format('DROP POLICY IF EXISTS geoking_server_only ON public.%I',table_name);
    EXECUTE format('CREATE POLICY geoking_server_only ON public.%I TO geoking_backend USING (true) WITH CHECK (true)',table_name);
  END LOOP;
END $$;
