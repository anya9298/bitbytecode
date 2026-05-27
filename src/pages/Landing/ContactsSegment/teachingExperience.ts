/** Склонение «год / года / лет» для целого числа лет */
function pluralYears(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} год`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} года`;
  return `${n} лет`;
}

/** Полных лет стажа с даты начала (ISO YYYY-MM-DD) */
export function getTeachingExperienceYears(startDateIso: string): number {
  const start = new Date(startDateIso);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (beforeAnniversary) years -= 1;
  return Math.max(0, years);
}

export function formatTeachingStartDateRu(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

export function formatTeachingExperienceLine(startDateIso: string): string {
  const years = getTeachingExperienceYears(startDateIso);
  const from = formatTeachingStartDateRu(startDateIso);
  return `Стаж работы преподавателем: с ${from} (${pluralYears(years)})`;
}
