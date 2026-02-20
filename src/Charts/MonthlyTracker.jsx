import React, { useMemo, useState } from "react";
import { getCalendarGrid, splitIntoWeeks } from "./dateUtils.js";
import CalendarGrid from "./CalendarGrid.jsx";
import WeeklyScatter from "./WeeklyScatter.jsx";

function MonthlyTracker({ hydrationEntries }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-indexed

  const calendarCells = useMemo(
    () => getCalendarGrid(year, month),
    [year, month]
  );

  const weeks = useMemo(
    () => splitIntoWeeks(calendarCells),
    [calendarCells]
  );

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
          hydrationEntries={hydrationEntries}
        />
      </div>

      <div className="monthly-right">
        {weeks.slice(0, 4).map((week, i) => (
          <WeeklyScatter
            key={i}
            weekCells={week}
            hydrationEntries={hydrationEntries}
            weekIndex={i}
          />
        ))}
      </div>
    </div>
  );
}

export default MonthlyTracker;
