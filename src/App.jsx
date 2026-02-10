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
    <div>
      <h1>Hydration Buddy 🎉</h1>
      <p>Lauren, Alexis, Keerthana, Ronan 😎</p>

      <img
        src={splash}
        alt="Hydration Buddy Splash"
        style={{ width: "300px", borderRadius: "12px" }}
      />
    </div>
  );
}

function Profile() {
  return <h2>Your Profile</h2>;
}

function Charts() {
  const [values, setValues] = useState([3, 5, 2]);
  const [input, setInput] = useState("");

  const addValue = () => {
    if (input === "") return;
    setValues([...values, Number(input)]);
    setInput("");
  };

  const data = {
    labels: values.map((_, i) => `Entry ${i + 1}`),
    datasets: [
      {
        label: "Hydration (cups)",
        data: values,
        backgroundColor: "#4db8ff",
      },
    ],
  };

  return (
    <div>
      <h2>Your Charts</h2>

      <Bar data={data} />

      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add hydration amount"
        />
        <button onClick={addValue}>Add</button>
      </div>
    </div>
  );
}

function Flower() {
  return (
    <div>
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
