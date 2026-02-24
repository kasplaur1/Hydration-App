import React, { useState } from "react";
import WeeklyTracker from "./Charts/WeeklyTracker.jsx";
import MonthlyTracker from "./Charts/MonthlyTracker.jsx";

export default function Charts() {
  const [activeTab, setActiveTab] = useState("weekly");

  // hydration data state
  const [hydrationEntries, setHydrationEntries] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function addHydration() {
    if (!inputValue) return;

    const today = new Date().toISOString().slice(0, 10);

    setHydrationEntries([
      ...hydrationEntries,
      { date: today, cups: Number(inputValue) },
    ]);

    setInputValue("");
  }

  return (
    <div className="charts-root fade-in">

      <h1 className="hb-header">Your Charts</h1>

      <div className="chart-tabs">
        <button
          className={activeTab === "weekly" ? "active-tab" : ""}
          onClick={() => setActiveTab("weekly")}
        >
          Weekly Tracker
        </button>

        <button
          className={activeTab === "monthly" ? "active-tab" : ""}
          onClick={() => setActiveTab("monthly")}
        >
          Monthly Tracker
        </button>
      </div>

      {activeTab === "weekly" ? (
        <WeeklyTracker
          hydrationEntries={hydrationEntries}
          inputValue={inputValue}
          setInputValue={setInputValue}
          addHydration={addHydration}
        />
      ) : (
        <MonthlyTracker hydrationEntries={hydrationEntries} />
      )}
    </div>
  );
}