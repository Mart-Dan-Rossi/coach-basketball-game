import React from "react";
import { PlayerEditableInfo, PlayerStats } from "../../entities/myInterfaces";
import NumericInputs from "./NumericInputs";
import "../../styles/CreatePlayer.css";

interface Props {
  team: string;
  playerPosition: "G" | "SG" | "SF" | "PF" | "C" | "Not detected";
  player: PlayerEditableInfo;
  playerSetter: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>;
  totalTeamPoints: number;
  setTotalTeamPoints: React.Dispatch<React.SetStateAction<number>>;
  pointsUsedInPlayer: number;
  setPointsUsedInPlayer: React.Dispatch<React.SetStateAction<number>>;
  pointsUsedInStats: PlayerStats;
  setPointsUsedInStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
}

const CreatePlayer = ({
  team,
  playerPosition,
  player,
  playerSetter,
  totalTeamPoints,
  setTotalTeamPoints,
  pointsUsedInPlayer,
  setPointsUsedInPlayer,
  pointsUsedInStats,
  setPointsUsedInStats,
}: Props) => {
  function nameOnkeydownHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let inputModified = e.target as HTMLInputElement;
    let inputValue = inputModified.value as string;

    let newPlayerStats = { ...player };
    newPlayerStats.name = inputValue;

    playerSetter(newPlayerStats);
  }

  let arrayOfKeysOfNumericProperties = [] as string[];
  for (let key in player) {
    if (key != "name" && key != "position") {
      arrayOfKeysOfNumericProperties.push(key);
    }
  }

  return (
    <div
      className={`player-${player.position}-customization-container player-customization-container`}
    >
      <div className="player-header">
        <h3>{playerPosition}</h3>
        <div className="name-input-container">
          <input
            type="text"
            name="name"
            placeholder="Player full name"
            className="name-input"
            value={player.name}
            onChange={nameOnkeydownHandler}
          />
        </div>
      </div>

      <div className="player-stats">
        <NumericInputs
          arrayOfKeysOfNumericProperties={arrayOfKeysOfNumericProperties}
          playerPosition={playerPosition}
          team={team}
          player={player}
          totalTeamPoints={totalTeamPoints}
          setTotalTeamPoints={setTotalTeamPoints}
          pointsUsedInStats={pointsUsedInStats}
          setPointsUsedInStats={setPointsUsedInStats}
          pointsUsedInPlayer={pointsUsedInPlayer}
          setPointsUsedInPlayer={setPointsUsedInPlayer}
          playerSetter={playerSetter}
        />
      </div>
    </div>
  );
};

export default CreatePlayer;
