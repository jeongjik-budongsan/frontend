import { BASE_URL } from "$lib/request";

interface GeoItem {
  id: number;
  sido: string;
  sigungu: string;
  dong: string;
}

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