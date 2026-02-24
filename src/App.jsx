import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Home from "./Home";
import Profile from "./Profile";
import Charts from "./Charts";
import Flower from "./Flower";

function App() {
  const [loggedMl, setLoggedMl] = useState(0);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/charts">Charts</Link> |{" "}
        <Link to="/flower">Flower</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home loggedMl={loggedMl} setLoggedMl={setLoggedMl} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/charts" element={<Charts />} />
        <Route
          path="/flower"
          element={<Flower loggedMl={loggedMl} setLoggedMl={setLoggedMl} />}
        />
      </Routes>
    </Router>
  );
}

export default App;