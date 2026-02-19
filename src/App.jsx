import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import Profile from "./Profile";
import Charts from "./Charts";
import Flower from "./Flower";

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
