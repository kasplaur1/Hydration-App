import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import splash from "./images/splash.png";
import flower from "./images/flower.png";

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

function Home() {
  return (
    <div className="fade-in">
      <h1>Hydration Buddy 🎉</h1>
      <p>Lauren, Alexis, Keerthana, Ronan 😎</p>

      <img
        src={splash}
        alt="Hydration Buddy Splash"
        className="float"
        style={{ width: "300px", borderRadius: "12px" }}
      />
    </div>
  );
}

function Profile() {
  return <h2 className="fade-in">Your Profile</h2>;
}

/* -------------------------------------------------------
   WEEKLY LABELS — ALWAYS MONDAY → SUNDAY WITH DATES
-------------------------------------------------------- */
function getWeeklyLabels() {
  const labels = [];
  const today = new Date();

  const monday = new Date(today);
  const day = monday.getDay();
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
  monday.setDate(diff);

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
    const month = d.getMonth() + 1;
    const dayNum = d.getDate();

    labels.push(`${weekday} (${month}/${dayNum})`);
  }

  return labels;
}

/* -------------------------------------------------------
   WEEKLY DATA — ALWAYS 7 ENTRIES, FILL MISSING WITH null
-------------------------------------------------------- */
function getWeeklyData(values) {
  const data = [...values];
  while (data.length < 7) data.push(null);
  return data.slice(0, 7);
}

function Charts() {
  const [tab, setTab] = useState("weekly");

  const [weeklyValues, setWeeklyValues] = useState([3, 5, 2]);
  const [weeklyInput, setWeeklyInput] = useState("");

  const addWeekly = () => {
    if (weeklyInput === "") return;
    setWeeklyValues([...weeklyValues, Number(weeklyInput)]);
    setWeeklyInput("");
  };

  const [monthlyValues, setMonthlyValues] = useState([10, 12, 8, 15]);
  const [monthlyInput, setMonthlyInput] = useState("");

  const addMonthly = () => {
    if (monthlyInput === "") return;
    setMonthlyValues([...monthlyValues, Number(monthlyInput)]);
    setMonthlyInput("");
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { font: { size: 18 } },
      },
    },
    scales: {
      x: { ticks: { font: { size: 16 } } },
      y: { ticks: { font: { size: 16 } } },
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

      {tab === "weekly" && (
        <div>
          <div className="chart-container">
            <Bar
              data={{
                labels: getWeeklyLabels(),
                datasets: [
                  {
                    label: "Weekly Hydration (cups)",
                    data: getWeeklyData(weeklyValues),
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
              value={weeklyInput}
              onChange={(e) => setWeeklyInput(e.target.value)}
              placeholder="Add daily hydration"
            />
            <button onClick={addWeekly}>Add</button>
          </div>
        </div>
      )}

      {tab === "monthly" && (
        <div>
          <div className="chart-container">
            <Bar
              data={{
                labels: monthlyValues.map((_, i) => `Entry ${i + 1}`),
                datasets: [
                  {
                    label: "Monthly Hydration (cups)",
                    data: monthlyValues,
                    backgroundColor: "#ffb84d",
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <input
              type="number"
              value={monthlyInput}
              onChange={(e) => setMonthlyInput(e.target.value)}
              placeholder="Add monthly hydration"
            />
            <button onClick={addMonthly}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Flower() {
  return (
    <div className="fade-in">
      <h2>Flower Page</h2>
      <img
        src={flower}
        alt="Flower"
        className="flower-sway"
        style={{ width: "250px" }}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/charts">Charts</Link> |{" "}
        <Link to="/flower">Flower</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/flower" element={<Flower />} />
      </Routes>
    </Router>
  );
}

export default App;
