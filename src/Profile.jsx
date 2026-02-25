import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const GOAL_OPTIONS = [
  "Drink 8 cups of water",
  "Finish a 1-liter bottle",
  "Hydrate every hour",
  "Morning hydration routine",
  "Evening hydration routine"
];

function Profile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState("AM");

  // Goals
  const [selectedGoal, setSelectedGoal] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleReminderAtTime = async () => {
    let hours24 = parseInt(hour);
    if (ampm === "PM" && hours24 !== 12) hours24 += 12;
    if (ampm === "AM" && hours24 === 12) hours24 = 0;

    const minutes = parseInt(minute);

    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Notifications are blocked. Please allow them in your browser.");
        return;
      }
    }

    const now = new Date();
    const reminderDate = new Date();
    reminderDate.setHours(hours24, minutes, 0, 0);

    if (reminderDate <= now) {
      reminderDate.setDate(reminderDate.getDate() + 1);
    }

    const delay = reminderDate - now;

    setTimeout(() => {
      new Notification("Hydration Reminder", {
        body: "Time to drink water!",
        icon: "/water-icon.png"
      });
    }, delay);

    alert(`Reminder set for ${hour}:${minute} ${ampm}`);
  };

  const handleAddGoal = () => {
    let goalText = selectedGoal === "custom" ? customGoal.trim() : selectedGoal;
    if (!goalText) return;

    const newGoal = {
      id: Date.now(),
      text: goalText,
      completed: false
    };

    setGoals((prev) => [...prev, newGoal]);
    setSelectedGoal("");
    setCustomGoal("");
  };

  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100 font-sans">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Profile
      </h1>

      {user ? (
        <div className="space-y-8">
          {/* Welcome & Logout */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h2 className="text-lg font-medium text-gray-700">
              Welcome, <span className="font-bold text-indigo-600">{user.email}</span>
            </h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>

          {/* REMINDER TIME PICKER */}
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <h3 className="text-md font-semibold text-blue-900 mb-3">💧 Water Reminder</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2 bg-white p-3 rounded-md border border-blue-200 shadow-sm">
                  <select
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    className="bg-transparent text-gray-700 outline-none cursor-pointer px-4 py-3 text-lg"
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const h = String(i + 1).padStart(2, "0");
                      return <option key={h}>{h}</option>;
                    })}
                  </select>
                  <span className="font-bold text-gray-400 text-lg">:</span>
                  <select
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    className="bg-transparent text-gray-700 outline-none cursor-pointer px-4 py-3 text-lg"
                  >
                    {["00","05","10","15","20","25","30","35","40","45","50","55"].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    value={ampm}
                    onChange={(e) => setAmpm(e.target.value)}
                    className="bg-transparent text-gray-700 outline-none cursor-pointer font-medium px-4 py-3 text-lg"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
                <button
                  onClick={handleReminderAtTime}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors text-lg"
                >
                  Set Reminder
                </button>
              </div>
            </div>

          {/* Goals Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Your Goals</h3>

            <div className="space-y-3 mb-5">
              <label className="block text-sm font-medium text-gray-600">
                Choose a hydration goal:
              </label>

              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">-- Select a goal --</option>
                {GOAL_OPTIONS.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
                <option value="custom">✨ Custom goal...</option>
              </select>

              {selectedGoal === "custom" && (
                <input
                  type="text"
                  placeholder="Enter your custom hydration goal..."
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              )}

              <button
                onClick={handleAddGoal}
                className="w-full sm:w-auto px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition-colors"
              >
                Add Goal
              </button>
            </div>

            {goals.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 italic">
                  No goals yet. Pick one above to get started!
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {goals.map((goal) => (
                  <li
                    key={goal.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      goal.completed
                        ? "bg-gray-50 border-gray-200"
                        : "bg-white border-gray-300 shadow-sm"
                    }`}
                  >
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => toggleGoal(goal.id)}
                        className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span
                        className={`text-md transition-all ${
                          goal.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700 font-medium"
                        }`}
                      >
                        {goal.text}
                      </span>
                    </label>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete goal"
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        // Logged-out UI
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
            Login or Create an Account
          </h2>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleLogin}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md shadow-sm transition-colors"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="flex-1 py-3 bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 font-bold rounded-md shadow-sm transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-3 bg-red-50 border border-red-200 text-red-600 text-center rounded-md font-medium">
          {error}
        </div>
      )}
    </div>
  );
}

export default Profile;