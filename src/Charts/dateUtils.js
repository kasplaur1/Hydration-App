export function toISO(date) {
  return date.toISOString().split("T")[0];
}

export function formatShortDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function getCalendarGrid(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  const startDay = first.getDay(); // 0 = Sun
  const totalDays = last.getDate();

  const cells = [];

  // Leading blanks
  for (let i = 0; i < startDay; i++) {
    cells.push(null);
  }

  // Actual days
  for (let d = 1; d <= totalDays; d++) {
    const iso = toISO(new Date(year, month, d));
    cells.push({ day: d, iso });
  }

  // Trailing blanks
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

export function splitIntoWeeks(cells) {
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export function getWeekDateRangeLabel(weekCells) {
  const firstCell = weekCells.find((c) => c);
  const lastCell = [...weekCells].reverse().find((c) => c);

  if (!firstCell || !lastCell) return "";

  const start = formatShortDate(firstCell.iso);
  const end = formatShortDate(lastCell.iso);

  return `${start} – ${end}`;
}
