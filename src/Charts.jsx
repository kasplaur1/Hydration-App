import React, { useState, useEffect } from "react";
import WeeklyTracker from "./Charts/WeeklyTracker.jsx";
import MonthlyTracker from "./Charts/MonthlyTracker.jsx";

import { auth, db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function Charts() {
  const [activeTab, setActiveTab] = useState("weekly");
  const [hydrationEntries, setHydrationEntries] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const logsRef = collection(db, "users", user.uid, "logs");
    const q = query(logsRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHydrationEntries(entries);
    });

    return () => unsubscribe();
  }, []);

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
        <WeeklyTracker hydrationEntries={hydrationEntries} />
      ) : (
        <MonthlyTracker hydrationEntries={hydrationEntries} />
      )}
    </div>
  );
}
