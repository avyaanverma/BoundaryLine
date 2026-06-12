import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  calculateCRR,
  calculateRRR,
  calculateProjectedScore,
  ballsToOvers,
} from "../../../shared/utils/cricketMath.js";

/**
 * Custom hook that reads match state from Redux and returns all derived/calculated cricket statistics.
 * No parameters accepted. Reads directly from Redux state.
 */
export const useMatchDerivedStats = () => {
  const match = useSelector((state) => state.match.currentMatch);

  const activeInnings = useMemo(() => {
    if (!match || !match.innings || typeof match.currentInningsNum !== "number") {
      return null;
    }
    return match.innings[match.currentInningsNum - 1] || null;
  }, [match]);

  // Extract variables to safely include in the dependencies array without risking TypeError
  const currentInningsNum = match?.currentInningsNum;
  const runs = activeInnings?.runs;
  const totalBallsBowledVal = activeInnings?.totalBallsBowled;
  const totalOversField = match?.totalOvers;

  return useMemo(() => {
    if (!match || !activeInnings) {
      return {
        activeInnings: null,
        totalBallsBowled: 0,
        totalOvers: "0.0",
        crr: 0,
        rrr: 0,
        projectedScore: 0,
        target: null,
        isSecondInnings: false,
      };
    }

    const tBalls = activeInnings.totalBallsBowled || 0;
    const oversStr = ballsToOvers(tBalls);
    const calculatedCrr = calculateCRR(activeInnings.runs || 0, tBalls);

    const isSecondInnings = match.currentInningsNum === 2;
    const targetVal = isSecondInnings ? (match.innings[0]?.runs || 0) + 1 : null;
    const totalMatchBalls = (match.totalOvers || 20) * 6; // fallback safely to 20 overs
    const ballsRemaining = Math.max(0, totalMatchBalls - tBalls);

    const calculatedRrr = isSecondInnings
      ? calculateRRR(targetVal, activeInnings.runs || 0, ballsRemaining)
      : 0;

    const projected = calculateProjectedScore(
      activeInnings.runs || 0,
      tBalls,
      totalMatchBalls
    );

    return {
      activeInnings,
      totalBallsBowled: tBalls,
      totalOvers: oversStr,
      crr: calculatedCrr,
      rrr: calculatedRrr,
      projectedScore: projected,
      target: targetVal,
      isSecondInnings,
    };
  }, [match, activeInnings, currentInningsNum, runs, totalBallsBowledVal, totalOversField]);
};

export default useMatchDerivedStats;
