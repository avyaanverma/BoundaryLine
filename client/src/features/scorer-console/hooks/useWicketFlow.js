import { useState, useCallback } from "react";
import { commitWicketState } from "../../scoreboard/store/matchSlice.js";

/**
 * Custom hook to handle wicket flow states and actions in the Scorer Console.
 * 
 * @param {Object} match - The current match object from Redux
 * @param {Object} activeInnings - The active innings object
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} setActiveModal - Setter for active modal state
 */
export const useWicketFlow = (match, activeInnings, dispatch, setActiveModal) => {
  const [wicketType, setWicketType] = useState("BOWLED");
  const [outBatterId, setOutBatterId] = useState("");
  const [fielderId, setFielderId] = useState("");
  const [keeperId, setKeeperId] = useState("");
  const [wicketBowlerId, setWicketBowlerId] = useState("");
  const [newBatterId, setNewBatterId] = useState("");

  const handleWicketButtonClick = useCallback(() => {
    if (!match) return;
    
    const onStrikeId = match.activeBatter1Id;
    const currentBowlerId = match.activeBowlerId;
    
    setOutBatterId(onStrikeId);
    setWicketBowlerId(currentBowlerId);
    
    if (activeInnings && activeInnings.batters) {
      const activeYetToBat = activeInnings.batters.filter(
        (b) => !b.battingStats?.isOut && b.playerId !== match.activeBatter1Id && b.playerId !== match.activeBatter2Id
      );
      setNewBatterId(activeYetToBat[0]?.playerId || "");
    } else {
      setNewBatterId("");
    }
    
    setWicketType("BOWLED");
    setFielderId("");
    setKeeperId("");
    
    setActiveModal("WICKET_FLOW");
  }, [match, activeInnings, setActiveModal]);

  const handleWicketConfirm = useCallback(() => {
    if (!wicketType) {
      alert("Please choose dismissal type!");
      return;
    }
    if (!outBatterId) {
      alert("Invalid dismissal target!");
      return;
    }

    dispatch(
      commitWicketState({
        dismissalType: wicketType,
        outBatterId,
        newBatterId,
        fielderId: ["CAUGHT", "RUN_OUT"].includes(wicketType) ? fielderId : undefined,
        bowlerId: ["CAUGHT", "STUMPED", "BOWLED", "LBW", "HIT_WICKET"].includes(wicketType) ? wicketBowlerId : undefined,
        keeperId: wicketType === "STUMPED" ? keeperId : undefined,
      })
    );

    setActiveModal("NONE");
  }, [wicketType, outBatterId, newBatterId, fielderId, wicketBowlerId, keeperId, dispatch, setActiveModal]);

  return {
    wicketType,
    setWicketType,
    outBatterId,
    setOutBatterId,
    fielderId,
    setFielderId,
    keeperId,
    setKeeperId,
    wicketBowlerId,
    setWicketBowlerId,
    newBatterId,
    setNewBatterId,
    handleWicketButtonClick,
    handleWicketConfirm,
  };
};

export default useWicketFlow;
