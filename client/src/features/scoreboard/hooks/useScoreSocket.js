import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import socketService from "../../../shared/services/socket/socket.js";
import { SOCKET_EVENTS } from "../../../shared/services/socket/socket-events.js";
import {
  updateBallEvent,
  addCommentaryRealtime,
  removeCommentaryRealtime,
} from "../../scoreboard/store/mathSlice.js";

export const useScoreSocket = (matchId) => {
  const dispatch = useDispatch();

  // Handle SCORE_UPDATED - most critical for live scoring
  const handleScoreUpdated = useCallback(
    (scoreData) => {
      console.log("[Score Socket] SCORE_UPDATED:", scoreData);
      if (!scoreData || !matchId) return;

      // Sync score update to Redux
      // The ScoreService on backend already calculated runs, overs, balls
      // We dispatch to maintain local state parity with backend
      dispatch(
        updateBallEvent({
          type: "SCORE_SYNC",
          runs: scoreData.score || 0,
          extraRuns: 0,
        })
      );
    },
    [matchId, dispatch]
  );

  // Handle SCORE_CREATED - new ball bowled
  const handleScoreCreated = useCallback(
    (scoreData) => {
      console.log("[Score Socket] SCORE_CREATED:", scoreData);
      if (!scoreData || !matchId) return;

      // Score created = new ball just bowled
      // Already handled by SCORE_UPDATED in most cases
      // This is a backup for initialization
    },
    [matchId]
  );

  // Handle SCORE_DELETED - ball undone/deleted
  const handleScoreDeleted = useCallback(
    (scoreData) => {
      console.log("[Score Socket] SCORE_DELETED:", scoreData);
      if (!scoreData || !matchId) return;

      // Score deleted = undo action from console
      // Backend has already reverted the state
      // Reload page or dispatch refresh action if needed
    },
    [matchId]
  );

  // Handle OVER_COMPLETED - over finished
  const handleOverCompleted = useCallback(
    (overData) => {
      console.log("[Score Socket] OVER_COMPLETED:", overData);
      if (!overData || overData.matchId !== matchId) return;

      // Over completed event
      // Useful for UI state like highlighting end-of-over
      // Can trigger bowler change prompt here if needed
      dispatch(
        updateBallEvent({
          type: "OVER_COMPLETE",
          runs: 0,
          extraRuns: 0,
        })
      );
    },
    [matchId, dispatch]
  );

  // Setup socket listeners on mount, cleanup on unmount
  useEffect(() => {
    if (!matchId) return;

    console.log(`[useScoreSocket] Registering listeners for match: ${matchId}`);

    // Register all score-related listeners
    socketService.listen(SOCKET_EVENTS.SCORE_CREATED, handleScoreCreated);
    socketService.listen(SOCKET_EVENTS.SCORE_UPDATED, handleScoreUpdated);
    socketService.listen(SOCKET_EVENTS.SCORE_DELETED, handleScoreDeleted);
    socketService.listen(SOCKET_EVENTS.OVER_COMPLETED, handleOverCompleted);

    // Cleanup listeners on unmount or matchId change
    return () => {
      console.log(
        `[useScoreSocket] Removing listeners for match: ${matchId}`
      );
      socketService.removeListener(SOCKET_EVENTS.SCORE_CREATED, handleScoreCreated);
      socketService.removeListener(SOCKET_EVENTS.SCORE_UPDATED, handleScoreUpdated);
      socketService.removeListener(SOCKET_EVENTS.SCORE_DELETED, handleScoreDeleted);
      socketService.removeListener(SOCKET_EVENTS.OVER_COMPLETED, handleOverCompleted);
    };
  }, [matchId, handleScoreCreated, handleScoreUpdated, handleScoreDeleted, handleOverCompleted]);
};

export default useScoreSocket;