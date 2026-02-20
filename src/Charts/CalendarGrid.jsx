import React from "react";

function getTotalForDate(entries, iso) {
  return entries
    .filter((e) => e.date === iso)
    .reduce((sum, e) => sum + e.cups, 0);
}

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarGrid({ calendarCells, hydrationEntries }) {
  return (
    <div className="calendar-wrapper">
      <div className="calendar-header-row">
        {weekdayLabels.map((label) => (
          <div key={label} className="calendar-header-cell">
            {label}
          </div>
        ))}
      </div>

      <div className="calendar-container">
        {calendarCells.map((cell, i) => {
          if (!cell) {
            return <div key={i} className="calendar-cell empty" />;
          }

          const total = getTotalForDate(hydrationEntries, cell.iso);
          const hasEntry = total > 0;

          return (
            <div
              key={i}
              className={`calendar-cell ${hasEntry ? "has-entry" : ""}`}
            >
              <div className="calendar-day-number">{cell.day}</div>
              {hasEntry && (
                <div className="calendar-hydration-value">{total}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
