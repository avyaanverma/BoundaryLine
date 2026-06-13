/**
 * Pure cricket calculation utility functions.
 * No React, no Redux, no side effects.
 */

/**
 * Converts total balls to a standard overs string representation (e.g. 7 balls -> "1.1").
 * @param {number} balls - Total number of balls bowled
 * @returns {string} - Overs string representation (Format: X.Y)
 */
export const ballsToOvers = (balls) => {
  if (typeof balls !== "number" || isNaN(balls) || balls < 0) {
    return "0.0";
  }
  const overs = Math.floor(balls / 6);
  const remainingBalls = balls % 6;
  return `${overs}.${remainingBalls}`;
};

/**
 * Converts an overs float representation (e.g. 4.3) to total balls (e.g. 27).
 * @param {number} overs - Overs bowled (Format: X.Y)
 * @returns {number} - Total balls bowled as an integer
 */
export const oversToBalls = (overs) => {
  if (typeof overs !== "number" || isNaN(overs) || overs < 0) {
    return 0;
  }
  const wholeOvers = Math.floor(overs);
  const remainingBalls = Math.round((overs - wholeOvers) * 10);
  return wholeOvers * 6 + remainingBalls;
};

/**
 * Calculates current run rate (CRR).
 * @param {number} runs - Runs scored
 * @param {number} balls - Balls bowled
 * @returns {number} - Current run rate rounded to 2 decimal places
 */
export const calculateCRR = (runs, balls) => {
  if (
    typeof runs !== "number" ||
    typeof balls !== "number" ||
    isNaN(runs) ||
    isNaN(balls) ||
    balls <= 0
  ) {
    return 0;
  }
  const crr = (runs / balls) * 6;
  return Number(crr.toFixed(2));
};

/**
 * Calculates required run rate (RRR).
 * @param {number} target - Runs needed to win
 * @param {number} currentRuns - Runs already scored
 * @param {number} ballsRemaining - Remaining balls in the innings
 * @returns {number} - Required run rate rounded to 2 decimal places
 */
export const calculateRRR = (target, currentRuns, ballsRemaining) => {
  if (
    typeof target !== "number" ||
    typeof currentRuns !== "number" ||
    typeof ballsRemaining !== "number" ||
    isNaN(target) ||
    isNaN(currentRuns) ||
    isNaN(ballsRemaining) ||
    ballsRemaining <= 0
  ) {
    return 0;
  }
  const runsNeeded = target - currentRuns;
  if (runsNeeded <= 0) {
    return 0;
  }
  const rrr = (runsNeeded / ballsRemaining) * 6;
  return Number(rrr.toFixed(2));
};

/**
 * Calculates projected score based on current run rate.
 * @param {number} currentRuns - Runs scored so far
 * @param {number} balls - Balls bowled so far
 * @param {number} totalBalls - Total balls in the innings (e.g., 120 for T20, 300 for ODI)
 * @returns {number} - Projected final score
 */
export const calculateProjectedScore = (currentRuns, balls, totalBalls) => {
  if (
    typeof currentRuns !== "number" ||
    typeof balls !== "number" ||
    typeof totalBalls !== "number" ||
    isNaN(currentRuns) ||
    isNaN(balls) ||
    isNaN(totalBalls)
  ) {
    return 0;
  }
  if (balls <= 0) {
    return currentRuns;
  }
  const currentRate = currentRuns / balls;
  return Math.round(currentRate * totalBalls);
};

/**
 * Determines match result text based on target, wickets, and remaining balls.
 * @param {number} battingTeamRuns - Total runs scored by the batting team
 * @param {number} bowlingTeamRuns - Total runs scored by the bowling team
 * @param {number} wickets - Fall of wickets for batting team
 * @param {number} ballsRemaining - Remaining balls in the match/innings
 * @param {string} teamName - Name of the winning team
 * @returns {string} - Match result text description
 */
export const getMatchResult = (battingTeamRuns, bowlingTeamRuns, wickets, ballsRemaining, teamName) => {
  if (
    typeof battingTeamRuns !== "number" ||
    typeof bowlingTeamRuns !== "number" ||
    typeof wickets !== "number" ||
    typeof ballsRemaining !== "number" ||
    isNaN(battingTeamRuns) ||
    isNaN(bowlingTeamRuns) ||
    isNaN(wickets) ||
    isNaN(ballsRemaining)
  ) {
    return "";
  }

  if (battingTeamRuns > bowlingTeamRuns && ballsRemaining > 0) {
    return teamName + " won by " + (10 - wickets) + " wickets";
  }

  if (battingTeamRuns > bowlingTeamRuns && ballsRemaining === 0) {
    return teamName + " won by " + (battingTeamRuns - bowlingTeamRuns) + " runs";
  }

  if (battingTeamRuns === bowlingTeamRuns) {
    return "Match Tied";
  }

  return "";
};
