import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { barOptions, COLORS } from "./chartUtils.js";
import { toISO, formatShortDate } from "./dateUtils.js";

function getWeeklyDateRange(hydrationEntries) {
  const referenceDate = hydrationEntries.length
    ? new Date(hydrationEntries[hydrationEntries.length - 1].date)
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

function WeeklyTracker({
  hydrationEntries,
  inputValue,
  setInputValue,
  addHydration,
}) {
  const weeklyRange = useMemo(
    () => getWeeklyDateRange(hydrationEntries),
    [hydrationEntries]
  );

  const labels = weeklyRange.map(formatShortDate);

  const data = useMemo(() => {
    const values = weeklyRange.map((dateISO) => {
      const total = hydrationEntries
        .filter((e) => e.date === dateISO)
        .reduce((sum, e) => sum + e.cups, 0);
      return total || null;
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

      <div className="input-row">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add daily hydration"
        />
        <button onClick={addHydration}>Add</button>
      </div>
    </div>
  );
}

export default WeeklyTracker;
