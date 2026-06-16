export function ballsToOvers(totalBalls = 0) {
  const balls = Math.max(0, Number(totalBalls) || 0);
  const completedOvers = Math.floor(balls / 6);
  const remainingBalls = balls % 6;

  return `${completedOvers}.${remainingBalls}`;
}

export function calculateCRR(runs = 0, balls = 0) {
  const legalBalls = Number(balls) || 0;

  if (legalBalls <= 0) {
    return 0;
  }

  return Number(((Number(runs) || 0) / (legalBalls / 6)).toFixed(2));
}

export function calculateRRR(target = 0, currentRuns = 0, ballsRemaining = 0) {
  const remainingRuns = Math.max(0, (Number(target) || 0) - (Number(currentRuns) || 0));
  const legalBallsRemaining = Number(ballsRemaining) || 0;

  if (legalBallsRemaining <= 0) {
    return 0;
  }

  return Number((remainingRuns / (legalBallsRemaining / 6)).toFixed(2));
}

export function calculateProjectedScore(runs = 0, balls = 0, totalBalls = 120) {
  const legalBalls = Number(balls) || 0;

  if (legalBalls <= 0) {
    return Number(runs) || 0;
  }

  return Math.round(((Number(runs) || 0) / legalBalls) * (Number(totalBalls) || 120));
}
