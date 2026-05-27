/** Склонение «год / года / лет» */
function pluralYears(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} год`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} года`;
  return `${n} лет`;
}

/** Склонение «месяц / месяца / месяцев» */
function pluralMonths(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} месяц`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} месяца`;
  return `${n} месяцев`;
}

/** Возвращает полные годы и оставшиеся месяцы стажа */
export function getTeachingExperience(startDateIso: string): { years: number; months: number } {
  const start = new Date(startDateIso);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  // Корректировка, если текущий день месяца меньше дня начала
  if (now.getDate() < start.getDate()) {
    months -= 1;
  }

  // Корректировка отрицательных месяцев
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
  };
}

export function formatTeachingStartDateRu(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

export function formatTeachingExperienceLine(startDateIso: string): string {
  const { years, months } = getTeachingExperience(startDateIso);
  const from = formatTeachingStartDateRu(startDateIso);

  // Формируем массив непустых частей
  const parts: string[] = [];
  if (years > 0) parts.push(pluralYears(years));
  if (months > 0) parts.push(pluralMonths(months));

  // На случай, если стаж меньше месяца (0 лет и 0 месяцев)
  const durationText = parts.length > 0 ? parts.join(' ') : 'меньше месяца';

  return `Стаж работы преподавателем: с ${from} (${durationText})`;
}
