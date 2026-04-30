import { useState, useEffect, useRef } from "react";
import flower from "./images/flower.png";
import wateringCan from "./images/watering-can.png";

const ML_PER_CUP = 240;
const MAX_GROWTH = 8;

function Flower({ loggedMl }) {
  const [waterLevel, setWaterLevel] = useState(0);
  const [isPouring, setIsPouring] = useState(false);
  const [streamPos, setStreamPos] = useState({ x: 0, y: 0 });
  const [droplets, setDroplets] = useState([]);

  const canRef = useRef(null);
  const dropId = useRef(0);

  const availableCups = Math.floor(loggedMl / ML_PER_CUP);

  const canWater =
    waterLevel < MAX_GROWTH &&
    waterLevel < availableCups;

  useEffect(() => {
    const saved = localStorage.getItem("flowerWaterLevel");
    if (saved !== null) {
      setWaterLevel(parseInt(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("flowerWaterLevel", waterLevel);
  }, [waterLevel]);

  const handleWater = () => {
    if (!canWater) return;

    const rect = canRef.current.getBoundingClientRect();

    const spoutX = rect.left + rect.width * 0.72;
    const spoutY = rect.top + rect.height * 0.45;

    setStreamPos({ x: spoutX, y: spoutY });

    setIsPouring(true);

    const interval = setInterval(() => {
      const id = dropId.current++;

      setDroplets((prev) => [
        ...prev,
        {
          id,
          x: spoutX + (Math.random() * 8 - 4),
          y: spoutY,
          drift: Math.random() * 20 - 10
        }
      ]);

      setTimeout(() => {
        setDroplets((prev) => prev.filter((d) => d.id !== id));
      }, 900);
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      setWaterLevel((prev) => prev + 1);
      setIsPouring(false);
    }, 800);
  };

  const getSize = () => 180 + waterLevel * 20;

  return (
    <div
      style={{
        padding: "40px",
        position: "relative",
        color: "#222" // ✅ GLOBAL TEXT COLOR
      }}
    >
      <style>
        {`
        @keyframes fall {
          0% { transform: translateY(0); opacity:1; }
          100% { transform: translateY(170px); opacity:0; }
        }
        `}
      </style>

      <h2 style={{ textAlign: "center", color: "#222" }}>
        Water Your Flower 🌸
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "120px",
          marginTop: "40px"
        }}
      >
        <div style={{ position: "relative", width: "350px", height: "350px" }}>

          {/* Flower */}
          <img
            src={flower}
            alt="Flower"
            style={{
              width: `${getSize()}px`,
              transition: "width 0.5s ease",
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          />

          {/* Watering Can */}
          <img
            ref={canRef}
            src={wateringCan}
            alt="Watering Can"
            onClick={handleWater}
            style={{
              width: "120px",
              cursor: canWater ? "pointer" : "not-allowed",
              opacity: canWater ? 1 : 0.4,
              position: "absolute",
              top: "0",
              right: "-40px",
              transform: isPouring ? "rotate(-25deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease"
            }}
          />
        </div>

        {/* Status */}
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            padding: "24px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            width: "260px",
            textAlign: "center",
            color: "#222" // ✅ FORCE DARK TEXT
          }}
        >
          <h3 style={{ color: "#222" }}>Flower Status</h3>
          <p style={{ color: "#222" }}>
            🌱 Growth: {waterLevel} / {MAX_GROWTH}
          </p>
          <p style={{ color: "#222" }}>
            💧 You drank: {availableCups} cups
          </p>

          {waterLevel >= MAX_GROWTH && (
            <p style={{ fontWeight: "bold", color: "green" }}>
              🌷 Fully grown!
            </p>
          )}

          {!canWater && waterLevel < MAX_GROWTH && (
            <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "#222" }}>
              Drink more water on the Home page 💧
            </p>
          )}
        </div>
      </div>

      {/* Droplets */}
      {droplets.map((drop) => (
        <div
          key={drop.id}
          style={{
            position: "fixed",
            left: drop.x,
            top: drop.y,
            width: "6px",
            height: "10px",
            background: "#4fc3f7",
            borderRadius: "50%",
            pointerEvents: "none",
            transform: `translateX(${drop.drift}px)`,
            animation: "fall 0.9s linear"
          }}
        />
      ))}
    </div>
  );
}

export default Flower;