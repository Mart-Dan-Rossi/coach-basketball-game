import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

function MatchInfo() {
  const { matchState } = useContext(GameContext);

  function setDisplayableTeamName(teamName: string) {
    if (teamName.length <= 11) {
      return teamName;
    } else {
      let displayableTeamName = teamName.slice(0, 6) + "...";
      return displayableTeamName;
    }
  }

  return (
    <div className="match-info-container">
      <span className="team-score">{matchState.teamA.stats.points}</span>
      <span className="team-name team-a-name-in-scoreboard">
        {setDisplayableTeamName("TeamA")}
      </span>

      <div className="clocks-container">
        <div className="match-moment-container">
          <div className="game-clock-container">
            <span className="game-clock">{matchState.timeLeft.minutes}</span>
            <span>:</span>
            <span className="game-clock">
              {matchState.timeLeft.seconds < 10
                ? `0${matchState.timeLeft.seconds}`
                : matchState.timeLeft.seconds}
            </span>
          </div>
          <span className="quarter-counter">
            {matchState.quarter}
            {matchState.quarter == 1
              ? "RST"
              : matchState.quarter == 2
              ? "ND"
              : matchState.quarter == 3
              ? "RD"
              : "RTH"}
          </span>
        </div>
        <span className="shot-clock">{matchState.shotClock}</span>
      </div>

      <span className="team-name team-b-name-in-scoreboard">
        {setDisplayableTeamName("TeamB")}
      </span>
      <span className="team-score">{matchState.teamB.stats.points}</span>
    </div>
  );
}

export default MatchInfo;
