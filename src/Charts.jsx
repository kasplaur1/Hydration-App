import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/* ----------------------------------------------------
   DATE HELPERS
----------------------------------------------------- */

function toISO(date) {
  return date.toISOString().split("T")[0];
}

function formatShortDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/* ----------------------------------------------------
   WEEK RANGE (MON → SUN)
----------------------------------------------------- */

function getWeeklyDateRange() {
  const today = new Date();

  const monday = new Date(today);
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

function getWeeklyLabels() {
  return getWeeklyDateRange().map(formatShortDate);
}

/* ----------------------------------------------------
   MAIN COMPONENT
----------------------------------------------------- */

function Charts() {
  const [tab, setTab] = useState("weekly");

  const [hydrationEntries, setHydrationEntries] = useState([
    { date: "2026-02-15", cups: 3 },
    { date: "2026-02-16", cups: 5 },
    { date: "2026-02-17", cups: 2 },
  ]);

  const [inputValue, setInputValue] = useState("");

  const addHydration = () => {
    if (inputValue === "") return;

    const todayISO = toISO(new Date());

    setHydrationEntries([
      ...hydrationEntries,
      { date: todayISO, cups: Number(inputValue) },
    ]);

    setInputValue("");
  };

  /* ----------------------------------------------------
     WEEKLY DATA
  ----------------------------------------------------- */
  function getWeeklyData() {
    const weekDates = getWeeklyDateRange();

    return weekDates.map((dateISO) => {
      const entry = hydrationEntries.find((e) => e.date === dateISO);
      return entry ? entry.cups : null;
    });
  }

  /* ----------------------------------------------------
     MONTHLY DATA
  ----------------------------------------------------- */
  function getMonthlyLabels() {
    return hydrationEntries.map((e) => formatShortDate(e.date));
  }

  function getMonthlyData() {
    return hydrationEntries.map((e) => e.cups);
  }

  /* ----------------------------------------------------
     CHART OPTIONS — horizontal labels + black text
----------------------------------------------------- */
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { size: 18 },
          color: "black",
        },
      },
      tooltip: {
        titleColor: "black",
        bodyColor: "black",
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 16 },
          color: "black",
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
        },
      },
      y: {
        ticks: {
          font: { size: 16 },
          color: "black",
        },
      },
    },
  };

  return (
    <div className="fade-in">
      <h2>Your Charts</h2>

      <div className="chart-tabs">
        <button
          className={tab === "weekly" ? "active-tab pulse" : "pulse"}
          onClick={() => setTab("weekly")}
        >
          Weekly Tracker
        </button>

        <button
          className={tab === "monthly" ? "active-tab pulse" : "pulse"}
          onClick={() => setTab("monthly")}
        >
          Monthly Tracker
        </button>
      </div>

      {/* WEEKLY VIEW */}
      {tab === "weekly" && (
        <div>
          <div
            className="chart-container"
            style={{
              width: "100%",
              height: "550px",   // ← bigger chart height
              margin: "0 auto",
            }}
          >
            <Bar
              data={{
                labels: getWeeklyLabels(),
                datasets: [
                  {
                    label: "Weekly Hydration (cups)",
                    data: getWeeklyData(),
                    backgroundColor: "#4db8ff",
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add daily hydration"
            />
            <button onClick={addHydration}>Add</button>
          </div>
        </div>
      )}

      {/* MONTHLY VIEW */}
      {tab === "monthly" && (
        <div>
          <div
            className="chart-container"
            style={{
              width: "100%",
              height: "550px",   // ← bigger chart height
              margin: "0 auto",
            }}
          >
            <Bar
              data={{
                labels: getMonthlyLabels(),
                datasets: [
                  {
                    label: "Monthly Hydration (cups)",
                    data: getMonthlyData(),
                    backgroundColor: "#4db8ff",
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add daily hydration"
            />
            <button onClick={addHydration}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Charts;
