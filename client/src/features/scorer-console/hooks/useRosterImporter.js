import { useState, useCallback } from "react";
import { addPlayerToRoster, bulkAddPlayersToRoster } from "../../scoreboard/store/mathSlice";

/**
 * Custom hook to handle roster additions and imports.
 */
export const useRosterImporter = (p1, p2) => {
  const isObj = p1 && typeof p1 === "object" && ("match" in p1 || "dispatch" in p1);
  const match = isObj ? p1.match : p1;
  const dispatch = isObj ? p1.dispatch : p2;

  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerRole, setNewPlayerRole] = useState("BATTER");

  const handleAddManualPlayer = useCallback((teamChar) => {
    if (!newPlayerName.trim()) {
      alert("Please enter a player name!");
      return;
    }
    const teamId = teamChar === "A" ? match.teamA.id : match.teamB.id;
    const player = {
      id: "p-custom-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      name: newPlayerName.trim(),
      role: newPlayerRole,
    };
    dispatch(addPlayerToRoster({ teamId, player }));
    setNewPlayerName("");
  }, [newPlayerName, newPlayerRole, match, dispatch]);

  const handleXLSXImportSimulation = useCallback((teamTarget) => {
    const targetTeamId = teamTarget === "A" ? match.teamA.id : match.teamB.id;
    const mockPlayers = [
      { id: "xlsx-p1-" + Date.now(), name: "Yashasvi Jaiswal", role: "BATTER" },
      { id: "xlsx-p2-" + Date.now(), name: "Shubman Gill", role: "BATTER" },
      { id: "xlsx-p3-" + Date.now(), name: "Virat Kohli", role: "BATTER" },
      { id: "xlsx-p4-" + Date.now(), name: "Rishabh Pant", role: "WICKET_KEEPER" },
      { id: "xlsx-p5-" + Date.now(), name: "Suryakumar Yadav", role: "BATTER" },
      { id: "xlsx-p6-" + Date.now(), name: "Hardik Pandya", role: "ALL_ROUNDER" },
      { id: "xlsx-p7-" + Date.now(), name: "Rinku Singh", role: "BATTER" },
      { id: "xlsx-p8-" + Date.now(), name: "Axar Patel", role: "ALL_ROUNDER" },
      { id: "xlsx-p9-" + Date.now(), name: "Jasprit Bumrah", role: "BOWLER" },
      { id: "xlsx-p10-" + Date.now(), name: "Arshdeep Singh", role: "BOWLER" },
      { id: "xlsx-p11-" + Date.now(), name: "Kuldeep Yadav", role: "BOWLER" }
    ];

    dispatch(bulkAddPlayersToRoster({ teamId: targetTeamId, players: mockPlayers }));
    alert("📂 Simulated XLSX Parse Successful! 11 players mapped into " + (teamTarget === "A" ? match.teamA.name : match.teamB.name) + "'s roster!");
  }, [match, dispatch]);

  return {
    newPlayerName,
    setNewPlayerName,
    newPlayerRole,
    setNewPlayerRole,
    handleAddManualPlayer,
    handleXLSXImportSimulation
  };
};

export default useRosterImporter;
