import React from "react";
import { PlayerEditableInfo, PlayerStats } from "../../entities/myInterfaces";
import {
  firstLetterToUpper,
  getMaxStatPerPosition,
  getMinStatPerPosition,
  getValue,
  numberEntire,
  separateCamelCaseBySpace,
  setPointsUsedOnThisSkill,
} from "../../utilities/exportableFunctions";
import "../../styles/NumericInput.css";

interface Props {
  stat: string;

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

const NumericInput = ({
  stat,
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
  function inputOnChangeHandler(statType: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputModified = e.target as HTMLInputElement;
      let inputValue = Number(inputModified.value) as number;

      let newPlayerStats = { ...player };

      let minStatValue = getMinStatPerPosition(statType, player.position);
      let maxStatValue = getMaxStatPerPosition(statType, player.position);
      let statRange = maxStatValue - minStatValue;

      if (
        statType == "height" ||
        statType == "weight" ||
        statType == "atleticism" ||
        statType == "perimeterDefence" ||
        statType == "insideDefence" ||
        statType == "rebounding" ||
        statType == "perimeterScoring" ||
        statType == "insideScoring" ||
        statType == "playMaking"
      ) {
        if (
          (totalTeamPoints <= 0 && inputValue < newPlayerStats[statType]) ||
          totalTeamPoints > 0
        ) {
          let teamPointsCost =
            ((newPlayerStats[statType] - inputValue) * 100) / statRange;
          if (totalTeamPoints + teamPointsCost >= 0) {
            setTotalTeamPoints(totalTeamPoints + teamPointsCost);
            newPlayerStats[statType] = inputValue;
            let pointsUsedOnThisSkillOld = pointsUsedInStats[statType];
            let pointsUsedOnThisSkill =
              ((inputValue - minStatValue) * 100) / statRange;
            setPointsUsedOnThisSkill(
              statType,
              pointsUsedInStats,
              setPointsUsedInStats,
              pointsUsedOnThisSkill
            );
            setPointsUsedInPlayer(
              pointsUsedInPlayer +
                pointsUsedOnThisSkill -
                pointsUsedOnThisSkillOld
            );
          }
        }
      }

      playerSetter(newPlayerStats);
    };
  }

  function pointsUsedOnThisSkill(statType: string) {
    if (
      statType == "height" ||
      statType == "weight" ||
      statType == "atleticism" ||
      statType == "perimeterDefence" ||
      statType == "insideDefence" ||
      statType == "rebounding" ||
      statType == "perimeterScoring" ||
      statType == "insideScoring" ||
      statType == "playMaking"
    ) {
      return pointsUsedInStats[statType];
    } else {
      return 0;
    }
  }

  return (
    <div
      key={`create-player-${stat}-input-${playerPosition}-${team}`}
      className={`${stat}-input-container create-player-stat-input`}
    >
      <label htmlFor={`${stat}`}>{`${firstLetterToUpper(
        separateCamelCaseBySpace(stat)
      )}: `}</label>
      <input
        type="range"
        name={`${stat}`}
        id={`${stat}-input`}
        value={getValue(stat, player)}
        min={getMinStatPerPosition(stat, player.position)}
        max={getMaxStatPerPosition(stat, player.position)}
        onChange={inputOnChangeHandler(stat)}
      />
      <span className="points-used-on-this-skill">
        {numberEntire(pointsUsedOnThisSkill(stat))}
      </span>
    </div>
  );
};

export default NumericInput;
