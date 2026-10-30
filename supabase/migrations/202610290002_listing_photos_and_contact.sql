CREATE TABLE IF NOT EXISTS public.property_images (
  id text PRIMARY KEY, property_id text NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  storage_key text UNIQUE NOT NULL, position integer NOT NULL CHECK (position BETWEEN 0 AND 5),
  created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(property_id,position)
);
CREATE INDEX IF NOT EXISTS property_images_listing ON public.property_images(property_id);
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id text PRIMARY KEY, user_id text REFERENCES public.users(id) ON DELETE SET NULL,
  name text NOT NULL, email text NOT NULL, subject text NOT NULL CHECK (length(subject) <= 120),
  message text NOT NULL CHECK (length(message) <= 3000), reply text CHECK (length(reply) <= 3000),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','replied')),
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS contact_messages_user ON public.contact_messages(user_id,created_at DESC);
DO $$ DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY['property_images','contact_messages'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY',table_name);
    EXECUTE format('REVOKE ALL ON public.%I FROM anon, authenticated',table_name);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO geoking_backend',table_name);
    EXECUTE format('DROP POLICY IF EXISTS geoking_server_only ON public.%I',table_name);
    EXECUTE format('CREATE POLICY geoking_server_only ON public.%I TO geoking_backend USING (true) WITH CHECK (true)',table_name);
  END LOOP;
END $$;
