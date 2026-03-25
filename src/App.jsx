import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Home from "./Home";
import Profile from "./Profile";
import Charts from "./Charts";
import Flower from "./Flower";

import { auth, db } from "./firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const ML_PER_CUP = 240;

function App() {
  const [loggedMl, setLoggedMl] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setLoggedMl(0);
        return;
      }

      const todayISO = new Date().toISOString().slice(0, 10);
      const logsRef = collection(db, "users", user.uid, "logs");
      const q = query(logsRef, where("dateISO", "==", todayISO));

      const unsubscribeLogs = onSnapshot(q, (snapshot) => {
        let totalMl = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          totalMl += data.ml || 0;
        });

        setLoggedMl(totalMl);
      });

      return () => unsubscribeLogs();
    });

    return () => unsubscribeAuth();
  }, []);

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
          element={
            <Home
              loggedMl={loggedMl}
              setLoggedMl={setLoggedMl}
              setResetTrigger={setResetTrigger}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/charts" element={<Charts />} />
        <Route
          path="/flower"
          element={<Flower loggedMl={loggedMl} resetTrigger={resetTrigger} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
