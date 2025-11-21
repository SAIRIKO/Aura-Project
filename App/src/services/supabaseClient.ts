import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vumjzesgponvmhkutvqk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bWp6ZXNncG9udm1oa3V0dnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MjA4ODcsImV4cCI6MjA3OTA5Njg4N30.8DqXamoPSrdjYWT7XvuX_i3VHZrMS0pVwGKp-6AJrFE"
);
