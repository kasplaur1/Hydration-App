import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { barOptions, COLORS } from "./chartUtils.js";
import { toISO, formatShortDate } from "./dateUtils.js";

function getWeeklyDateRange(hydrationEntries) {
  // Use Firestore field: dateISO
  const referenceDate = hydrationEntries.length
    ? new Date(hydrationEntries[hydrationEntries.length - 1].dateISO)
    : new Date();

  const monday = new Date(referenceDate);
  const day = monday.getDay();
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
  monday.setDate(diff);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(toISO(d));
  }

  return dates;
}

function WeeklyTracker({ hydrationEntries }) {
  const weeklyRange = useMemo(
    () => getWeeklyDateRange(hydrationEntries),
    [hydrationEntries]
  );

  const labels = weeklyRange.map(formatShortDate);

  const data = useMemo(() => {
    const values = weeklyRange.map((dateISO) => {
      const total = hydrationEntries
        .filter((e) => e.dateISO === dateISO)
        .reduce((sum, e) => sum + (e.cups || 0), 0);

      return total || 0;
    });

    return {
      labels,
      datasets: [
        {
          label: "Weekly Hydration (cups)",
          data: values,
          backgroundColor: COLORS.primary,
        },
      ],
    };
  }, [weeklyRange, hydrationEntries, labels]);

  return (
    <div>
      <div className="chart-container chart-container-large">
        <Bar data={data} options={barOptions} />
      </div>
    </div>
  );
}

export default WeeklyTracker;
