import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncScores } from "../../scoreboard/store/mathSlice.js";
import apiClient from "../../../shared/lib/axios.js";

/**
 * Maps the current Redux match/innings state to the backend Score model.
 * Backend Score schema: { matchId, innings, battingTeam, score, wickets, overs, runRate, target }
 */
const buildScorePayload = (match) => {
  if (!match || !match.innings) return null;

  const activeInnings = match.innings[match.currentInningsNum - 1];
  if (!activeInnings) return null;

  // Compute overs string in "X.Y" format (Y = balls in current over, 0-5)
  // Backend regex: /^\d+\.[0-5]$/
  const oversStr = `${activeInnings.overs}.${activeInnings.balls}`;

  // Compute runRate: runs / total overs bowled
  const totalOvers = activeInnings.overs + activeInnings.balls / 6;
  const runRate = totalOvers > 0
    ? parseFloat((activeInnings.runs / totalOvers).toFixed(2))
    : 0;

  // Use the innings' own teamId — this is always correct regardless of toss decision
  // (the Redux startMatchSetup reducer sets this based on who is batting)
  const battingTeamId = activeInnings.teamId;

  return {
    matchId: match._id || match.id,
    innings: match.currentInningsNum || 1,
    battingTeam: battingTeamId,
    score: activeInnings.runs || 0,
    wickets: activeInnings.wickets || 0,
    overs: oversStr,
    runRate,
  };
};

/**
 * Hook that provides a function to sync the local Redux score state
 * to the backend database via POST /api/private/scores.
 */
export const useSyncScores = () => {
  const dispatch = useDispatch();
  const match = useSelector((state) => state.match.currentMatch);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Auto-clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSync = useCallback(async () => {
    setError(null);

    const matchId = match?._id || match?.id;

    // Guard: only sync if we have a real match ID (not a demo ID like "IND_AUS")
    if (!matchId || matchId.length < 10) {
      setError(
        'This is a demo match. Create a real match in the Admin Panel to sync scores to the backend.'
      );
      return;
    }

    const payload = buildScorePayload(match);
    if (!payload) {
      setError('Could not build score payload. Match data may be incomplete.');
      return;
    }

    setIsSaving(true);

    try {
      const response = await apiClient.post('/private/scores', payload);

      // Mark as synced in Redux
      dispatch(syncScores());
      setSuccess(true);

      console.log('[Score Sync] Score saved successfully:', response.data);
      return response.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to sync score to backend';
      setError(message);
      console.error('[Score Sync] Error:', message);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [match, dispatch]);

  return {
    handleSync,
    isSaving,
    error,
    success,
    clearError: () => setError(null),
    clearSuccess: () => setSuccess(false),
  };
};

export default useSyncScores;
