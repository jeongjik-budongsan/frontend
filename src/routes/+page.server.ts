import { supabase } from "../supabase";
import type { GeoItem } from "../types/types";

export async function load() {
  const geo = await supabase.from('geo').select('*');

  const addresses = geo.data!.reduce((acc, cur) => {
    if (!acc[cur.sido]) {
      acc[cur.sido] = {};
    }
    if (!acc[cur.sido][cur.sigungu]) {
      acc[cur.sido][cur.sigungu] = [];
    }
    acc[cur.sido][cur.sigungu].push(cur);
    return acc;
  }, {'none': {}} as { [sido: string]: { [sigungu: string]: GeoItem[] }});

  return {
    addresses,
  };
}