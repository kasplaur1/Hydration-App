import React from "react";
import { Scatter } from "react-chartjs-2";
import { scatterOptions, COLORS } from "./chartUtils.js";
import { getWeekDateRangeLabel } from "./dateUtils.js";

function getPointsForWeek(weekCells, hydrationEntries) {
  const points = [];

  weekCells.forEach((cell, index) => {
    if (!cell) return;

    const total = hydrationEntries
      .filter((e) => e.date === cell.iso)
      .reduce((sum, e) => sum + e.cups, 0);

    if (total > 0) {
      points.push({ x: index, y: total });
    }
  });

  return points;
}

function WeeklyScatter({ weekCells, hydrationEntries, weekIndex }) {
  const points = getPointsForWeek(weekCells, hydrationEntries);

  const avg =
    points.length > 0
      ? points.reduce((sum, p) => sum + p.y, 0) / points.length
      : 0;

  const data = {
    datasets: [
      {
        label: "Daily Hydration",
        data: points,
        backgroundColor: COLORS.primary,
      },
      {
        label: "Weekly Average",
        type: "line",
        data: [
          { x: 0, y: avg },
          { x: 6, y: avg },
        ],
        borderColor: COLORS.average,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const rangeLabel = getWeekDateRangeLabel(weekCells);

  return (
    <div className="weekly-scatter-card">
      <h4 className="weekly-scatter-title">
        Week {weekIndex + 1}
        {rangeLabel && (
          <span className="weekly-scatter-range"> ({rangeLabel})</span>
        )}
      </h4>
      <div className="weekly-scatter-chart">
        <Scatter data={data} options={scatterOptions} />
      </div>
    </div>
  );
}

export default WeeklyScatter;
