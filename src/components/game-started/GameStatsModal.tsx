import React, { useState } from "react";
import Modal from "../Modal";
import { Match } from "../../entities/match";
import { TeamGameStats } from "../../entities/myInterfaces";
//@ts-ignore
import "../../styles/GameStatsModal.css";
import { playerPositionDetection } from "../../utilities/exportableFunctions";

type DisplayStat =
  | { type: "fg"; label: string }
  | { type: "tp"; label: string }
  | { type: "ft"; label: string }
  | { type: "raw"; key: keyof TeamGameStats; label: string };

const displayStats: DisplayStat[] = [
  { type: "fg", label: "FG" },
  { type: "tp", label: "3PT" },
  { type: "ft", label: "FT" },
  { type: "raw", key: "assists", label: "AST" },
  { type: "raw", key: "rebounds", label: "REB" },
  { type: "raw", key: "offensiveRebounds", label: "OREB" },
  { type: "raw", key: "steals", label: "STL" },
  { type: "raw", key: "blocks", label: "BLK" },
  { type: "raw", key: "turnOvers", label: "TO" },
  { type: "raw", key: "fouls", label: "FOULS" },
];

function formatFG(stats: TeamGameStats): string {
  const made = stats.fieldGoalsMade;
  const att = stats.fieldGoalsattempt;

  if (att === 0) return "0% (0/0)";

  const percentage = Math.round((made / att) * 100);

  return `${percentage}% (${made}/${att})`;
}

const formatTP = (stats: TeamGameStats): string => {
  const made = stats.triplesMade;
  const att = stats.triplesAttempt;

  if (att === 0) return "0% (0/0)";

  const percentage = Math.round((made / att) * 100);
  return `${percentage}% (${made}/${att})`;
};

const formatFT = (stats: TeamGameStats): string => {
  const made = stats.freeThrowsMade;
  const att = stats.freeThrowsAttempt;

  if (att === 0) return "0% (0/0)";

  const percentage = Math.round((made / att) * 100);
  return `${percentage}% (${made}/${att})`;
};

const GameStatsModal = ({
  isOpen,
  onClose,
  matchState,
}: {
  isOpen: boolean;
  onClose: () => void;
  matchState: Match;
}) => {
  const [view, setView] = useState<"team" | "players">("team");
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B">("A");

  const teamAStats = matchState.teamA.stats;
  const teamBStats = matchState.teamB.stats;

  const selectedTeamData =
    selectedTeam === "A" ? matchState.teamA : matchState.teamB;

  const playersToShow = selectedTeamData.players;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalSize="large"
      title="Estadísticas"
    >
      <div className="game-stats-modal-content">
        <div className="stats-toggle">
          <button
            className={view === "team" ? "active" : ""}
            onClick={() => setView("team")}
          >
            Equipos
          </button>
          <button
            className={view === "players" ? "active" : ""}
            onClick={() => setView("players")}
          >
            Jugadores
          </button>
        </div>

        {view === "team" && (
          <div className="team-stats">
            {displayStats.map((stat) => (
              <div key={stat.label} className="team-stat-row">
                <span className="team-stat-value left">
                  {stat.type === "fg" && formatFG(teamAStats)}
                  {stat.type === "tp" && formatTP(teamAStats)}
                  {stat.type === "ft" && formatFT(teamAStats)}
                  {stat.type === "raw" && teamAStats[stat.key]}
                </span>

                <span className="team-stat-label">{stat.label}</span>

                <span className="team-stat-value right">
                  {stat.type === "fg" && formatFG(teamBStats)}
                  {stat.type === "tp" && formatTP(teamBStats)}
                  {stat.type === "ft" && formatFT(teamBStats)}
                  {stat.type === "raw" && teamBStats[stat.key]}
                </span>
              </div>
            ))}
          </div>
        )}

        {view === "players" && (
          <>
            <div className="team-selector">
              <button
                className={selectedTeam === "A" ? "active" : ""}
                onClick={() => setSelectedTeam("A")}
              >
                {matchState.teamA.name}
              </button>

              <button
                className={selectedTeam === "B" ? "active" : ""}
                onClick={() => setSelectedTeam("B")}
              >
                {matchState.teamB.name}
              </button>
            </div>

            <div className="player-stats-table-wrapper">
              <table className="player-stats-table">
                <thead>
                  <tr>
                    <th>Jugador</th>
                    {displayStats.map((stat) => (
                      <th key={stat.label}>{stat.label}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {playersToShow.map((player) => (
                    <tr key={`player-stats-${player.team}-${player.position}`}>
                      <td className="player-name-cell">
                        {player.name ||
                          playerPositionDetection(player.position)}
                      </td>

                      {displayStats.map((stat) => (
                        <td key={stat.label} className="stat-value-cell">
                          {stat.type === "fg" && formatFG(player.stats)}
                          {stat.type === "tp" && formatTP(player.stats)}
                          {stat.type === "ft" && formatFT(player.stats)}
                          {stat.type === "raw" && player.stats[stat.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default GameStatsModal;
