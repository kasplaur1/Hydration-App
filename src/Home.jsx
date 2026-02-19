import splash from "./images/splash.png";

function Home() {
  return (
    <div className="fade-in">
      <h1>Hydration Buddy 🎉</h1>
      <p>Lauren, Alexis, Keerthana B, Ronan 😎</p>

      <img
        src={splash}
        alt="Hydration Buddy Splash"
        className="float"
        style={{ width: "300px", borderRadius: "12px" }}
      />
    </div>
  );
}

export default Home;
