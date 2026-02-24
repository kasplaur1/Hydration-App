import { useState, useEffect } from "react";
import flower from "./images/flower.png";
import wateringCan from "./images/watering-can.png";

const ML_PER_CUP = 240;
const MAX_GROWTH = 8;

function Flower({ loggedMl, resetTrigger }) {
  const [waterLevel, setWaterLevel] = useState(0);
  const [isPouring, setIsPouring] = useState(false);

  const availableCups = Math.floor(loggedMl / ML_PER_CUP);

  const canWater =
    waterLevel < MAX_GROWTH &&
    waterLevel < availableCups;

  // Only reset when Home reset button is pressed
  useEffect(() => {
    setWaterLevel(0);
  }, [resetTrigger]);

  const handleWater = () => {
    if (!canWater) return;

    setIsPouring(true);

    setTimeout(() => {
      setWaterLevel((prev) => prev + 1);
      setIsPouring(false);
    }, 800);
  };

  const getSize = () => 180 + waterLevel * 20;

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Water Your Flower 🌸</h2>

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

          <img
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

          {isPouring && (
            <div
              style={{
                position: "absolute",
                top: "90px",
                right: "-5px",
                width: "6px",
                height: "120px",
                background:
                  "linear-gradient(to bottom, #4fc3f7, transparent)"
              }}
            />
          )}
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            padding: "24px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            width: "260px",
            textAlign: "center"
          }}
        >
          <h3>Flower Status</h3>
          <p>🌱 Growth: {waterLevel} / {MAX_GROWTH}</p>
          <p>💧 You drank: {availableCups} cups</p>

          {waterLevel >= MAX_GROWTH && (
            <p style={{ fontWeight: "bold", color: "green" }}>
              🌷 Fully grown!
            </p>
          )}

          {!canWater && waterLevel < MAX_GROWTH && (
            <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
              Drink more water on the Home page 💧
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flower;