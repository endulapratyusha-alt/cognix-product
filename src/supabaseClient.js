const env = import.meta.env || {};
export const supabaseConfig = {
  url: env.VITE_SUPABASE_URL || window.COGNIX_SUPABASE_URL || "",
  anonKey: env.VITE_SUPABASE_ANON_KEY || window.COGNIX_SUPABASE_ANON_KEY || ""
};

export const isSupabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey);

export const supabase = isSupabaseConfigured
  ? (await import("https://esm.sh/@supabase/supabase-js@2.45.4")).createClient(supabaseConfig.url, supabaseConfig.anonKey)
  : null;
