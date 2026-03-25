import React, { useMemo, useState } from "react";
import { getCalendarGrid, splitIntoWeeks } from "./dateUtils.js";
import CalendarGrid from "./CalendarGrid.jsx";
import WeeklyScatter from "./WeeklyScatter.jsx";

// Safely normalize Firestore entries
function normalizeEntry(e) {
  // Prefer the dateISO string written by Home.jsx
  if (e.dateISO) return e;

  // Fallback: convert timestamp → dateISO
  if (e.timestamp?.toDate) {
    const d = e.timestamp.toDate();
    return { ...e, dateISO: d.toISOString().slice(0, 10) };
  }

  // Final fallback: ignore invalid entries
  return { ...e, dateISO: null };
}

function MonthlyTracker({ hydrationEntries }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  // Normalize all entries safely
  const entriesWithDates = useMemo(() => {
    return hydrationEntries.map(normalizeEntry);
  }, [hydrationEntries]);

  const calendarCells = useMemo(
    () => getCalendarGrid(year, month),
    [year, month]
  );

  const weeks = useMemo(() => splitIntoWeeks(calendarCells), [calendarCells]);

  function goToPreviousMonth() {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }

  function goToNextMonth() {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }

  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="monthly-layout">
      <div className="monthly-left">
        <div className="month-header">
          <button onClick={goToPreviousMonth}>&lt;</button>
          <span>{monthLabel}</span>
          <button onClick={goToNextMonth}>&gt;</button>
        </div>

        <CalendarGrid
          calendarCells={calendarCells}
          hydrationEntries={entriesWithDates}
        />
      </div>

      <div className="monthly-right">
        {weeks.slice(0, 4).map((week, i) => (
          <WeeklyScatter
            key={i}
            weekCells={week}
            hydrationEntries={entriesWithDates}
            weekIndex={i}
          />
        ))}
      </div>
    </div>
  );
}

export default MonthlyTracker;
