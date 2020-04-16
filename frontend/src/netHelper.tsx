export function formatDate(date: any) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return month + "/" + day + "/" + year;
}

export function roundDigits(number: number) {
  return Math.round(number * 100) / 100;
}
