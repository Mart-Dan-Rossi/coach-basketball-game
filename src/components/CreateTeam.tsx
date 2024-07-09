import React, { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import {
  calculatePlayerOverallRating,
  numberEntire,
  playerPositionDetection,
} from "../utilities/exportableFunctions";
import CreatePlayer from "./CreatePlayer";
import { SwitchTransition, CSSTransition } from "react-transition-group";

interface Props {
  totalTeamAPoints: number;
  setTotalTeamAPoints: React.Dispatch<React.SetStateAction<number>>;
  totalTeamBPoints: number;
  setTotalTeamBPoints: React.Dispatch<React.SetStateAction<number>>;
  maxTeamPoints: number;
  team: string;
}

function CreateTeam({
  totalTeamAPoints,
  setTotalTeamAPoints,
  totalTeamBPoints,
  setTotalTeamBPoints,
  maxTeamPoints,
  team,
}: Props) {
  const {
    playerA1Stats,
    playerA2Stats,
    playerA3Stats,
    playerA4Stats,
    playerA5Stats,
    setPlayerA1Stats,
    setPlayerA2Stats,
    setPlayerA3Stats,
    setPlayerA4Stats,
    setPlayerA5Stats,
    setTeamAStats,
    playerB1Stats,
    playerB2Stats,
    playerB3Stats,
    playerB4Stats,
    playerB5Stats,
    setPlayerB1Stats,
    setPlayerB2Stats,
    setPlayerB3Stats,
    setPlayerB4Stats,
    setPlayerB5Stats,
    setTeamBStats,
    setTeamsCreated,
    pointsUsedInPlayerA1,
    pointsUsedInPlayerA2,
    pointsUsedInPlayerA3,
    pointsUsedInPlayerA4,
    pointsUsedInPlayerA5,
    pointsUsedInPlayerB1,
    pointsUsedInPlayerB2,
    pointsUsedInPlayerB3,
    pointsUsedInPlayerB4,
    pointsUsedInPlayerB5,
    setPointsUsedInPlayerA1,
    setPointsUsedInPlayerA2,
    setPointsUsedInPlayerA3,
    setPointsUsedInPlayerA4,
    setPointsUsedInPlayerA5,
    setPointsUsedInPlayerB1,
    setPointsUsedInPlayerB2,
    setPointsUsedInPlayerB3,
    setPointsUsedInPlayerB4,
    setPointsUsedInPlayerB5,
    pointsUsedInStatsPlayerA1,
    pointsUsedInStatsPlayerA2,
    pointsUsedInStatsPlayerA3,
    pointsUsedInStatsPlayerA4,
    pointsUsedInStatsPlayerA5,
    pointsUsedInStatsPlayerB1,
    pointsUsedInStatsPlayerB2,
    pointsUsedInStatsPlayerB3,
    pointsUsedInStatsPlayerB4,
    pointsUsedInStatsPlayerB5,
    setPointsUsedInStatsPlayerA1,
    setPointsUsedInStatsPlayerA2,
    setPointsUsedInStatsPlayerA3,
    setPointsUsedInStatsPlayerA4,
    setPointsUsedInStatsPlayerA5,
    setPointsUsedInStatsPlayerB1,
    setPointsUsedInStatsPlayerB2,
    setPointsUsedInStatsPlayerB3,
    setPointsUsedInStatsPlayerB4,
    setPointsUsedInStatsPlayerB5,
  } = useContext(GameContext);

  let pointsUsedOnPlayersAArray = [
    pointsUsedInPlayerA1,
    pointsUsedInPlayerA2,
    pointsUsedInPlayerA3,
    pointsUsedInPlayerA4,
    pointsUsedInPlayerA5,
  ];

  let pointsUsedOnPlayersBArray = [
    pointsUsedInPlayerB1,
    pointsUsedInPlayerB2,
    pointsUsedInPlayerB3,
    pointsUsedInPlayerB4,
    pointsUsedInPlayerB5,
  ];

  const [createPlayer, setCreatePlayer] = useState(0);

  function selectPlayer(player: number) {
    return () => {
      if (player != createPlayer) {
        setCreatePlayer(player);
      } else {
        setCreatePlayer(0);
      }
    };
  }

  function addPlayersSelectors() {
    let playerSelector = [];
    let isThisPlayerSelected: boolean;
    for (let i = 1; i <= 5; i++) {
      if (createPlayer == i) {
        isThisPlayerSelected = true;
      } else {
        isThisPlayerSelected = false;
      }
      playerSelector.push(
        <div
          key={`player-selector-${i}-${team}-${playerSelector}`}
          className={
            isThisPlayerSelected
              ? "player-selector selected"
              : "player-selector"
          }
          onClick={selectPlayer(i)}
        >
          <h3>{playerPositionDetection(i.toString())}</h3>
          {team == "A" ? (
            <h4>
              Player valoration{" "}
              <span>
                {calculatePlayerOverallRating(pointsUsedOnPlayersAArray[i - 1])}
              </span>
            </h4>
          ) : (
            <h4>
              Player valoration{" "}
              <span>
                {calculatePlayerOverallRating(pointsUsedOnPlayersBArray[i - 1])}
              </span>
            </h4>
          )}
        </div>
      );
    }
    return <div className="all-players-selectors">{playerSelector}</div>;
  }

  function confirmTeamButtonHandler() {
    if (totalTeamAPoints <= 2 && totalTeamBPoints <= 2) {
      setTeamAStats({
        playerA1Stats,
        playerA2Stats,
        playerA3Stats,
        playerA4Stats,
        playerA5Stats,
      });
      setTeamBStats({
        playerB1Stats,
        playerB2Stats,
        playerB3Stats,
        playerB4Stats,
        playerB5Stats,
      });
      setTeamsCreated(true);
    }
  }

  const teamAVariablesToCreatePlayers = {
    teamInfo: {
      totalTeamPoints: totalTeamAPoints,
      totalTeamPointsSetter: setTotalTeamAPoints,
    },
    playersInfo: [
      {
        playerStats: playerA1Stats,
        statsSetters: setPlayerA1Stats,
        pointsUsedInPlayer: pointsUsedInPlayerA1,
        pointsUsedInPlayerSetter: setPointsUsedInPlayerA1,
        pointsUsedInStatsPlayer: pointsUsedInStatsPlayerA1,
        pointsUsedInStatsSetter: setPointsUsedInStatsPlayerA1,
      },
      {
        playerStats: playerA2Stats,
        statsSetters: setPlayerA2Stats,
        pointsUsedInPlayer: pointsUsedInPlayerA2,
        pointsUsedInPlayerSetter: setPointsUsedInPlayerA2,
        pointsUsedInStatsPlayer: pointsUsedInStatsPlayerA2,
        pointsUsedInStatsSetter: setPointsUsedInStatsPlayerA2,
      },
      {
        playerStats: playerA3Stats,
        statsSetters: setPlayerA3Stats,
        pointsUsedInPlayer: pointsUsedInPlayerA3,
        pointsUsedInPlayerSetter: setPointsUsedInPlayerA3,
        pointsUsedInStatsPlayer: pointsUsedInStatsPlayerA3,
        pointsUsedInStatsSetter: setPointsUsedInStatsPlayerA3,
      },
      {
        playerStats: playerA4Stats,
        statsSetters: setPlayerA4Stats,
        pointsUsedInPlayer: pointsUsedInPlayerA4,
        pointsUsedInPlayerSetter: setPointsUsedInPlayerA4,
        pointsUsedInStatsPlayer: pointsUsedInStatsPlayerA4,
        pointsUsedInStatsSetter: setPointsUsedInStatsPlayerA4,
      },
      {
        playerStats: playerA5Stats,
        statsSetters: setPlayerA5Stats,
        pointsUsedInPlayer: pointsUsedInPlayerA5,
        pointsUsedInPlayerSetter: setPointsUsedInPlayerA5,
        pointsUsedInStatsPlayer: pointsUsedInStatsPlayerA5,
        pointsUsedInStatsSetter: setPointsUsedInStatsPlayerA5,
      },
    ],
  };

  const teamBVariablesToCreatePlayers = {
    teamInfo: {
      totalTeamPoints: totalTeamBPoints,
      totalTeamPointsSetter: setTotalTeamBPoints,
    },
    playersInfo: [
      {
        playerStats: playerB1Stats,
        statsSetters: setPlayerB1Stats,
        pointsUsedInPlayer: pointsUsedInPlayerB1,
        pointsUsedInPlayerSetter: setPointsUsedInPlayerB1,
        pointsUsedInStatsPlayer: pointsUsedInStatsPlayerB1,
        pointsUsedInStatsSetter: setPointsUsedInStatsPlayerB1,
      },
      {
        playerStats: playerB2Stats,
        statsSetters: setPlayerB2Stats,
        pointsUsedInPlayer: pointsUsedInPlayerB2,
        pointsUsedInPlayerSetter: setPointsUsedInPlayerB2,
        pointsUsedInStatsPlayer: pointsUsedInStatsPlayerB2,
        pointsUsedInStatsSetter: setPointsUsedInStatsPlayerB2,
      },
      {
        playerStats: playerB3Stats,
        statsSetters: setPlayerB3Stats,
        pointsUsedInPlayer: pointsUsedInPlayerB3,
        pointsUsedInPlayerSetter: setPointsUsedInPlayerB3,
        pointsUsedInStatsPlayer: pointsUsedInStatsPlayerB3,
        pointsUsedInStatsSetter: setPointsUsedInStatsPlayerB3,
      },
      {
        playerStats: playerB4Stats,
        statsSetters: setPlayerB4Stats,
        pointsUsedInPlayer: pointsUsedInPlayerB4,
        pointsUsedInPlayerSetter: setPointsUsedInPlayerB4,
        pointsUsedInStatsPlayer: pointsUsedInStatsPlayerB4,
        pointsUsedInStatsSetter: setPointsUsedInStatsPlayerB4,
      },
      {
        playerStats: playerB5Stats,
        statsSetters: setPlayerB5Stats,
        pointsUsedInPlayer: pointsUsedInPlayerB5,
        pointsUsedInPlayerSetter: setPointsUsedInPlayerB5,
        pointsUsedInStatsPlayer: pointsUsedInStatsPlayerB5,
        pointsUsedInStatsSetter: setPointsUsedInStatsPlayerB5,
      },
    ],
  };

  let variablesToCreatePlayers =
    team === "A"
      ? teamAVariablesToCreatePlayers
      : teamBVariablesToCreatePlayers;

  return (
    <div
      className={`team-${team}-customization-container team-customization-container`}
    >
      <div className="max-team-points-input-container">
        <label htmlFor="maxTeamPoints">Max team points</label>
        <input
          type="range"
          name="maxTeamPoints"
          id="maxTeamPoints-input"
          min="0"
          max={maxTeamPoints}
          value={team == "A" ? totalTeamAPoints : totalTeamBPoints}
          readOnly
        />
        <span className="maxTeamPoints-number">
          {team == "A"
            ? numberEntire(totalTeamAPoints)
            : numberEntire(totalTeamBPoints)}
        </span>
      </div>

      {addPlayersSelectors()}

      <div className="all-player-customization-container">
        {
          <SwitchTransition>
            <CSSTransition
              classNames="fade"
              key={`fade-${team}-player-${createPlayer.toString()}`}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
            >
              {createPlayer == 0 ? (
                <p>
                  Remember, you have {maxTeamPoints} points to spend among your
                  5 players. You can balance the score between them or enhance
                  any of them.
                </p>
              ) : (
                <CreatePlayer
                  team={team}
                  playerPosition={playerPositionDetection(
                    createPlayer.toString()
                  )}
                  player={
                    variablesToCreatePlayers.playersInfo[createPlayer - 1]
                      .playerStats
                  }
                  playerSetter={
                    variablesToCreatePlayers.playersInfo[createPlayer - 1]
                      .statsSetters
                  }
                  totalTeamPoints={
                    variablesToCreatePlayers.teamInfo.totalTeamPoints
                  }
                  setTotalTeamPoints={
                    variablesToCreatePlayers.teamInfo.totalTeamPointsSetter
                  }
                  pointsUsedInPlayer={
                    variablesToCreatePlayers.playersInfo[createPlayer - 1]
                      .pointsUsedInPlayer
                  }
                  setPointsUsedInPlayer={
                    variablesToCreatePlayers.playersInfo[createPlayer - 1]
                      .pointsUsedInPlayerSetter
                  }
                  pointsUsedInStats={
                    variablesToCreatePlayers.playersInfo[createPlayer - 1]
                      .pointsUsedInStatsPlayer
                  }
                  setPointsUsedInStats={
                    variablesToCreatePlayers.playersInfo[createPlayer - 1]
                      .pointsUsedInStatsSetter
                  }
                />
              )}
            </CSSTransition>
          </SwitchTransition>
        }
      </div>
      <div className="confirm-teams">
        <button
          className={
            totalTeamAPoints <= 2 && totalTeamBPoints <= 2 ? "true" : "false"
          }
          onClick={confirmTeamButtonHandler}
        >
          Confirm both teams
        </button>
        {totalTeamAPoints <= 2 && totalTeamBPoints <= 2 ? (
          <span className="valid">Ready to canfirm</span>
        ) : (
          <span className="error">
            You have to use all your points to confirm
          </span>
        )}
      </div>
    </div>
  );
}

export default CreateTeam;
