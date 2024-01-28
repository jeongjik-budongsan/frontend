import type { Database } from "../supabase/database.types";

export type GeoItem = Database['public']['Tables']["geo"]['Row'];
export type Agency = Database['public']['Tables']["agency"]['Row'];
