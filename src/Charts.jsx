import React, { useState } from "react";
import WeeklyTracker from "./components/Charts/WeeklyTracker.jsx";
import MonthlyTracker from "./components/Charts/MonthlyTracker.jsx";

export default function Charts() {
  const [activeTab, setActiveTab] = useState("weekly");

  return (
    <div className="charts-root fade-in">

      {/* PAGE HEADER */}
      <h1 className="hb-header" style={{ color: "black" }}>
        Your Charts
      </h1>

      {/* TABS */}
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

      {/* ACTIVE VIEW */}
      {activeTab === "weekly" ? <WeeklyTracker /> : <MonthlyTracker />}
    </div>
  );
}
