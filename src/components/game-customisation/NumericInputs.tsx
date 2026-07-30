import React from "react";
import { PlayerEditableInfo, PlayerEditableStatsKeys, PlayerStats } from "../../entities/myInterfaces";
import NumericInput from "./NumericInput";

interface Props {
  arrayOfKeysOfNumericProperties: PlayerEditableStatsKeys[];
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
      {arrayOfKeysOfNumericProperties.map((stat) => {
        if (!stat) return null;
        return (
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
          />
        );
      })}
    </>
  );
};

export default NumericInputs;
