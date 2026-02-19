import flower from "./images/flower.png";

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

export default Flower;
