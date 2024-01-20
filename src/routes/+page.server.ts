import { BASE_URL } from "$lib/request";
import type { components } from "../types/schema";

export type GeoItem = components["schemas"]["GeoItem"];
export type Agency = components["schemas"]["Agency"];


export async function load() {
  const response = await fetch(`${BASE_URL}/geo`);
  const geo: GeoItem[] = await response.json();

  const addresses = geo.reduce((acc, cur) => {
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