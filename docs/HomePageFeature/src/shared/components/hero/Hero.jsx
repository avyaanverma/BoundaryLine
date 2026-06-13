import "./Hero.css";
// import heroImage from "../../../assets/images/heroimage.png";

function Hero() {
  return (
    <section className="hero">
      {/* Left Side */}
      <div className="hero-left">
        <div className="live-badge">
          ● LIVE: IND VS AUS 4TH TEST
        </div>

        <h1>
          Never Miss
          <span> A Ball </span>
          Again
        </h1>

        <p>
          Real-time cricket scores, match analytics,
          player statistics and breaking cricket news
          delivered at lightning speed.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">
            View Live Scores ⚡
          </button>

          <button className="btn-secondary">
            Get Started
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="hero-right">
        <div className="dashboard">
          <div className="dashboard-header">
            <p>Live Insights Hub</p>
          </div>

          <img
            src="/heroimge.png"
            alt="Cricket Analytics Dashboard"
            className="dashboard-image"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;