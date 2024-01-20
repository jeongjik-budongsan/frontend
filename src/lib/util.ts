export function average(values: number[]) {
  const sum = values.reduce((acc, cur) => acc + cur, 0);
  return sum / values.length;
}