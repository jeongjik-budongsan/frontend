import { createClient } from "@supabase/supabase-js";
import type { Database } from './database.types';

export const supabase = createClient<Database>(
  'https://hxaymmlsctexxndrgdmr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4YXltbWxzY3RleHhuZHJnZG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAzMDg3NjgsImV4cCI6MjAxNTg4NDc2OH0.4kc0WIC3PQPnijGgJiCkvJpm5medlJaEou9ZJlrVVuA'
);
