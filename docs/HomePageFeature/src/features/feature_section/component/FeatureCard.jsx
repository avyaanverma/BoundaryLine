function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div className={`feature-card ${feature.color}`}>
      <div className={`icon-wrapper ${feature.color}`}>
        <Icon size={28} />
      </div>

      <h3>{feature.title}</h3>

      <p>{feature.description}</p>
    </div>
  );
}

export default FeatureCard;