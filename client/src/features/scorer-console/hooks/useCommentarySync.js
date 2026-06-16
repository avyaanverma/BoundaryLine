import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import apiClient from "../../../shared/lib/axios.js";

/**
 * useCommentarySync
 *
 * Watches the Redux commentary array for new ball events and POSTs
 * each one to the backend as an enriched Commentary document.
 *
 * This is the bridge between the Redux-only scoring engine and the
 * backend database. Every ball that produces a commentary entry in Redux
 * will be persisted to the backend with structured data (batterId,
 * bowlerId, runsScored, etc.) so that the ScoreboardPage can later
 * reconstruct full scorecards from the database.
 */
export const useCommentarySync = () => {
  const match = useSelector((state) => state.match.currentMatch);
  const [syncState, setSyncState] = useState({ isSyncing: false, error: null });
  const lastSyncedIdRef = useRef(null);
  const pendingRef = useRef(false);

  const matchId = match?._id || match?.id;

  const syncBall = useCallback(async (commentaryEntry) => {
    if (!matchId || matchId.length < 10) return; // Skip demo / local matches
    if (pendingRef.current) return; // Avoid concurrent POSTs

    const activeInnings = match.innings?.[match.currentInningsNum - 1];
    if (!activeInnings) return;

    // Find current batter and bowler from Redux state
    const striker = activeInnings.batters?.find(
      (b) => b.playerId === match.activeBatter1Id
    );
    const nonStriker = activeInnings.batters?.find(
      (b) => b.playerId === match.activeBatter2Id
    );
    const bowler = activeInnings.bowlers?.find(
      (b) => b.playerId === match.activeBowlerId
    );

    // Parse over string (e.g. "5.3" → over=5, ball=3)
    const [overNum, ballNum] = commentaryEntry.over.split(".").map(Number);

    // Map the Redux commentary type to the backend enum
    let backendType = "NORMAL";
    if (commentaryEntry.type === "WICKET") backendType = "WICKET";
    else if (commentaryEntry.title?.includes("SIX")) backendType = "SIX";
    else if (commentaryEntry.title?.includes("FOUR")) backendType = "FOUR";
    else if (commentaryEntry.type === "MILESTONE") backendType = "MILESTONE";

    // Extract runs from commentary text (best-effort parsing)
    let runsScored = 0;
    let extraRuns = 0;
    let isLegal = true;
    if (commentaryEntry.title?.includes("WIDE")) { isLegal = false; extraRuns = 1; }
    else if (commentaryEntry.title?.includes("NO BALL")) { isLegal = false; extraRuns = 1; }
    else if (commentaryEntry.type === "BOUNDARY") {
      runsScored = commentaryEntry.title?.includes("SIX") ? 6 : 4;
    }

    const payload = {
      matchId,
      innings: match.currentInningsNum,
      over: overNum,
      ball: ballNum,
      text: commentaryEntry.description || commentaryEntry.title || "",
      type: backendType,
      runsScored,
      extraRuns,
      isLegalDelivery: isLegal,
      batterId: striker?._id || striker?.playerId || null,
      bowlerId: bowler?._id || bowler?.playerId || null,
      nonStrikerId: nonStriker?._id || nonStriker?.playerId || null,
    };

    pendingRef.current = true;
    setSyncState({ isSyncing: true, error: null });

    try {
      await apiClient.post("/private/commentary", payload);
      lastSyncedIdRef.current = commentaryEntry.id;
      setSyncState({ isSyncing: false, error: null });
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Failed to sync commentary";
      console.error("[Commentary Sync] Error:", message);
      setSyncState({ isSyncing: false, error: message });
    } finally {
      pendingRef.current = false;
    }
  }, [match, matchId]);

  // Watch Redux commentary for new entries
  useEffect(() => {
    const commentary = match?.commentary;
    if (!commentary || commentary.length === 0) return;

    const latest = commentary[0];
    if (!latest || !latest.id) return;

    // Only sync non-milestone entries that we haven't synced yet
    if (latest.id === lastSyncedIdRef.current) return;
    if (latest.type === "MILESTONE") {
      lastSyncedIdRef.current = latest.id;
      return;
    }

    syncBall(latest);
  }, [match?.commentary?.[0]?.id, syncBall]);

  return {
    isSyncing: syncState.isSyncing,
    syncError: syncState.error,
  };
};

export default useCommentarySync;
