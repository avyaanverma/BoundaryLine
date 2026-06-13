import { useState, useCallback } from "react";
import { commitWicketState } from "../../scoreboard/store/mathSlice";

export const useWicketFlow = (p1, p2, p3, p4) => {
  const isObj = p1 && typeof p1 === "object" && ("match" in p1 || "activeInnings" in p1 || "setActiveModal" in p1);
  const match = isObj ? p1.match : p1;
  const activeInnings = isObj ? p1.activeInnings : p2;
  const dispatch = isObj ? p1.dispatch : p3;
  const setActiveModal = isObj ? p1.setActiveModal : p4;

  const [wicketType, setWicketType] = useState("BOWLED");
  const [outBatterId, setOutBatterId] = useState("");
  const [fielderId, setFielderId] = useState("");
  const [keeperId, setKeeperId] = useState("");
  const [wicketBowlerId, setWicketBowlerId] = useState("");
  const [newBatterId, setNewBatterId] = useState("");

  const initWicketFlow = useCallback(() => {
    if (!match) return;

    const onStrikeId = match.activeBatter1Id;
    const currentBowlerId = match.activeBowlerId;

    setOutBatterId(onStrikeId || "");
    setWicketBowlerId(currentBowlerId || "");

    if (activeInnings && activeInnings.batters) {
      const activeYetToBat = activeInnings.batters.find(
        (b) =>
          !b.battingStats?.isOut &&
          b.playerId !== match.activeBatter1Id &&
          b.playerId !== match.activeBatter2Id
      );
      setNewBatterId(activeYetToBat?.playerId || "");
    } else {
      setNewBatterId("");
    }

    setWicketType("BOWLED");
    setFielderId("");
    setKeeperId("");

    setActiveModal("WICKET_FLOW");
  }, [match, activeInnings, setActiveModal]);

  const confirmWicket = useCallback(() => {
    if (!wicketType) {
      alert("Please choose dismissal type!");
      return;
    }
    if (!outBatterId) {
      alert("Invalid dismissal target!");
      return;
    }

    const payload = {
      dismissalType: wicketType,
      outBatterId,
      newBatterId,
      fielderId: ["CAUGHT", "RUN_OUT"].includes(wicketType) ? fielderId : undefined,
      bowlerId: ["CAUGHT", "STUMPED", "BOWLED", "LBW", "HIT_WICKET"].includes(wicketType) ? wicketBowlerId : undefined,
      keeperId: wicketType === "STUMPED" ? keeperId : undefined,
    };

    dispatch(commitWicketState(payload));
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
    initWicketFlow,
    confirmWicket,
    // Backward compatibility aliases to prevent existing components from breaking
    handleWicketButtonClick: initWicketFlow,
    handleWicketConfirm: confirmWicket,
  };
};

export default useWicketFlow;
