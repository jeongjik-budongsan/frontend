import dong_json from './dong.json';

export function getDongCoordinates(dongName: string) {
  for (const feature of dong_json['features']) {
    if (dongName === feature.properties.EMD_CD) {
      return feature.geometry.coordinates[0];
    }
  }
  return false;
}