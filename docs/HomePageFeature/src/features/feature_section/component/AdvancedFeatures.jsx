import FeatureCard from "./FeatureCard";
import featuresData from "../data/featuresData";

import "../styles/Feature.css";

function AdvancedFeatures() {
  return (
    <section className="advanced-features">
      <div className="container">
        <h2>Advanced Features</h2>

        <p className="subtitle">
          Experience the game with depth and
          detail that standard scorecards
          simply can't match.
        </p>

        <div className="feature-grid">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdvancedFeatures;