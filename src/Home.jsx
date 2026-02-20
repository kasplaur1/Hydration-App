import { useMemo, useState } from "react";

const ML_PER_CUP = 240;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function Home() {
  const goalCups = 8;
  const goalMl = goalCups * ML_PER_CUP;

  const [loggedMl, setLoggedMl] = useState(0);
  const [inputCups, setInputCups] = useState("");

  const loggedCups = loggedMl / ML_PER_CUP;

  const percent = useMemo(() => {
    return clamp((loggedMl / goalMl) * 100, 0, 100);
  }, [loggedMl, goalMl]);

  const notchFractions = [0.25, 0.5, 0.75, 1];

  function addWater(e) {
    e.preventDefault();
    const cups = Number(inputCups);
    if (!Number.isFinite(cups) || cups <= 0) return;

    setLoggedMl((prev) => prev + cups * ML_PER_CUP);
    setInputCups("");
  }

  function reset() {
    setLoggedMl(0);
    setInputCups("");
  }

  return (
    <div className="fade-in home-wrap">
      <div className="home-header">
        <h1 className="home-title">Hydration Buddy 💧</h1>
        <p className="home-names">Lauren • Alexis Boy • Keerthana • Ronan</p>
      </div>

      <div className="home-layout">
        {/* Bottle */}
        <div className="bottle">
          <div className="bottle-neck" />
          <div className="bottle-body">
            <div className="water" style={{ height: `${percent}%` }} />

            {/* Notches */}
            <div className="bottle-marks" aria-hidden="true">
              {notchFractions.map((f) => {
                const notchCups = goalCups * f;
                const notchPct = f * 100;
                const hit = loggedCups >= notchCups;

                return (
                  <div
                    key={f}
                    className={`mark ${hit ? "hit" : ""}`}
                    style={{ bottom: `${notchPct}%` }}
                  >
                    <span className="mark-line" />
                    <span className="mark-text">
                      {Number.isInteger(notchCups)
                        ? notchCups.toFixed(0)
                        : notchCups.toFixed(1)}{" "}
                      cups
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Label — moved up and smaller */}
            <div
              className="bottle-label"
              style={{
                top: "30px",
                position: "absolute",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  padding: "8px 14px",
                  borderRadius: "16px",
                  background: "rgba(255, 252, 245, 0.92)",
                  border: "1px solid rgba(11,27,58,0.15)",
                  boxShadow: "0 8px 24px rgba(11,27,58,0.12)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: loggedMl === 0 ? "1.1rem" : "1.9rem",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "#0b1b3a",
                    fontFamily:
                      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Inter, Arial",
                  }}
                >
                  {loggedMl === 0 ? "Start sipping!" : `${Math.round(percent)}%`}
                </div>

                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "rgba(11,27,58,0.75)",
                    marginTop: "4px",
                  }}
                >
                  {loggedCups.toFixed(1)} / {goalCups} cups
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logging card */}
        <div className="home-card">
          <h2 className="home-card-title">Log Water</h2>

          <form onSubmit={addWater} className="home-form">
            <label className="home-label">
              Amount (cups)
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={inputCups}
                onChange={(e) => setInputCups(e.target.value)}
                placeholder="e.g., 1.5"
                style={{
                  height: "46px",
                  padding: "0 14px",
                  borderRadius: "14px",
                  border: "1px solid rgba(11,27,58,0.16)",
                  background: "rgba(255,255,255,0.9)",
                  color: "#0b1b3a",       // FIXED: text visible
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              />
            </label>

            <button className="home-btn" type="submit">
              Add
            </button>
          </form>

          <div className="home-quick">
            <button
              className="home-chip"
              type="button"
              onClick={() => setLoggedMl((p) => p + 1 * ML_PER_CUP)}
            >
              +1 cup
            </button>
            <button
              className="home-chip"
              type="button"
              onClick={() => setLoggedMl((p) => p + 2 * ML_PER_CUP)}
            >
              +2 cups
            </button>
            <button
              className="home-chip"
              type="button"
              onClick={() => setLoggedMl((p) => p + 3 * ML_PER_CUP)}
            >
              +3 cups
            </button>
          </div>

          <button
            className="home-btn home-btn-secondary"
            type="button"
            onClick={reset}
          >
            Reset Today
          </button>
        </div>
      </div>
    </div>
  );
}
