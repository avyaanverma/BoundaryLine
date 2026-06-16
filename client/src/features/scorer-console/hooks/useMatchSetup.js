import { useState, useCallback } from "react";
import { createDynamicMatch, startMatchSetup } from "../../scoreboard/store/mathSlice";

/**
 * Custom hook to manage the match setup process and state.
 */
export const useMatchSetup = (p1, p2, p3, p4) => {
  const isObj = p1 && typeof p1 === "object" && ("match" in p1 || "selectedXI_A" in p1 || "dispatch" in p1);
  const selectedXI_A = isObj ? p1.selectedXI_A : p2;
  const selectedXI_B = isObj ? p1.selectedXI_B : p3;
  const dispatch = isObj ? p1.dispatch : p4;

  const [setupStep, setSetupStep] = useState(1);
  const [tossWinner, setTossWinner] = useState("");
  const [tossDecision, setTossDecision] = useState("BAT");
  const [newMatchTitle, setNewMatchTitle] = useState("");
  const [newMatchSubtitle, setNewMatchSubtitle] = useState("LIVE • T20 Finals");
  const [newTeamAName, setNewTeamAName] = useState("");
  const [newTeamBName, setNewTeamBName] = useState("");
  const [wizardStrikerId, setWizardStrikerId] = useState("");
  const [wizardNonStrikerId, setWizardNonStrikerId] = useState("");
  const [wizardBowlerId, setWizardBowlerId] = useState("");

  const handleCreateDynamicMatch = useCallback((e) => {
    e.preventDefault();
    if (!newMatchTitle.trim() || !newTeamAName.trim() || !newTeamBName.trim()) {
      alert("Please complete Match Title, Team A Title, and Team B Title!");
      return;
    }

    const generatedId = "match-dynamic-" + Date.now();
    dispatch(
      createDynamicMatch({
        id: generatedId,
        title: newMatchTitle.trim(),
        subtitle: newMatchSubtitle.trim() || "LIVE • T20 Match",
        teamAName: newTeamAName.trim(),
        teamBName: newTeamBName.trim(),
      })
    );

    setNewMatchTitle("");
    setNewTeamAName("");
    setNewTeamBName("");
    alert("⚡ Dynamic Live Match created! Roster builder is now unlocked.");
    setSetupStep(2);
  }, [newMatchTitle, newMatchSubtitle, newTeamAName, newTeamBName, dispatch]);

  const initWizardOpeningRoles = useCallback(() => {
    if (selectedXI_A && selectedXI_A.length > 0) {
      setWizardStrikerId(selectedXI_A[0]?.id || "");
      setWizardNonStrikerId(selectedXI_A[1]?.id || "");
    }
    if (selectedXI_B && selectedXI_B.length > 0) {
      const bowler =
        selectedXI_B.find((p) => p.role === "BOWLER" || p.role === "ALL_ROUNDER") ||
        selectedXI_B[selectedXI_B.length - 1];
      setWizardBowlerId(bowler?.id || "");
    }
  }, [selectedXI_A, selectedXI_B]);

  const handleStartMatch = useCallback(() => {
    if (!tossWinner) {
      alert("Please select Toss Winner first!");
      return;
    }
    if (!selectedXI_A || selectedXI_A.length < 5 || !selectedXI_B || selectedXI_B.length < 5) {
      alert("Please ensure both playing squads have at least 5 players confirmed!");
      return;
    }
    if (!wizardStrikerId || !wizardNonStrikerId || !wizardBowlerId) {
      alert("Please select opening Striker, Non-Striker and Bowler!");
      return;
    }
    if (wizardStrikerId === wizardNonStrikerId) {
      alert("Striker and Non-Striker cannot be the same player!");
      return;
    }

    dispatch(
      startMatchSetup({
        tossWinner,
        tossDecision,
        teamA_XI: selectedXI_A,
        teamB_XI: selectedXI_B,
        strikerId: wizardStrikerId,
        nonStrikerId: wizardNonStrikerId,
        bowlerId: wizardBowlerId,
      })
    );
  }, [
    tossWinner,
    tossDecision,
    selectedXI_A,
    selectedXI_B,
    wizardStrikerId,
    wizardNonStrikerId,
    wizardBowlerId,
    dispatch,
  ]);

  return {
    setupStep,
    setSetupStep,
    tossWinner,
    setTossWinner,
    tossDecision,
    setTossDecision,
    newMatchTitle,
    setNewMatchTitle,
    newMatchSubtitle,
    setNewMatchSubtitle,
    newTeamAName,
    setNewTeamAName,
    newTeamBName,
    setNewTeamBName,
    wizardStrikerId,
    setWizardStrikerId,
    wizardNonStrikerId,
    setWizardNonStrikerId,
    wizardBowlerId,
    setWizardBowlerId,
    handleCreateDynamicMatch,
    initWizardOpeningRoles,
    handleStartMatch,
  };
};

export default useMatchSetup;
