import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY =
  (process.env.SUPABASE_SERVICE_ROLE as string) ||
  (process.env.SUPABASE_KEY as string);

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    "Variáveis SUPABASE_URL e SUPABASE_SERVICE_ROLE / SUPABASE_KEY são necessárias"
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
