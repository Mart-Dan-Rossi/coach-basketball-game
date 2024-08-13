import React from "react";
import { PlayerEditableInfo, PlayerStats } from "../../entities/myInterfaces";
import NumericInput from "./NumericInput";

interface Props {
  arrayOfKeysOfNumericProperties: string[];
  playerPosition: string;
  team: string;
  player: PlayerEditableInfo;

  totalTeamPoints: number;
  setTotalTeamPoints: React.Dispatch<React.SetStateAction<number>>;

  pointsUsedInStats: PlayerStats;
  setPointsUsedInStats: React.Dispatch<React.SetStateAction<PlayerStats>>;

  pointsUsedInPlayer: number;
  setPointsUsedInPlayer: React.Dispatch<React.SetStateAction<number>>;

  playerSetter: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>;
}

const NumericInputs = ({
  arrayOfKeysOfNumericProperties,
  playerPosition,
  team,
  player,
  totalTeamPoints,
  setTotalTeamPoints,
  pointsUsedInStats,
  setPointsUsedInStats,
  pointsUsedInPlayer,
  setPointsUsedInPlayer,
  playerSetter,
}: Props) => {
  return (
    <>
      {arrayOfKeysOfNumericProperties.map((stat, i) => {
        <NumericInput
          stat={stat}
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
        />;
      })}
    </>
  );
};

export default NumericInputs;
