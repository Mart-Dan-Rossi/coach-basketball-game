import { GameContext } from "./GameContext";
import React from "react";
import { useState } from "react";
import { getInitialPlayerStatsOnCreation } from "../utilities/exportableFunctions";
import { initialGameBoard } from "../utilities/exportableFunctions";

interface props {
  children: JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
}

export const GameContextProvider = ({ children }: props) => {
  const [playerA1Stats, setPlayerA1Stats] = useState(
    getInitialPlayerStatsOnCreation("1")
  );

  const [playerA2Stats, setPlayerA2Stats] = useState(
    getInitialPlayerStatsOnCreation("2")
  );

  const [playerA3Stats, setPlayerA3Stats] = useState(
    getInitialPlayerStatsOnCreation("3")
  );

  const [playerA4Stats, setPlayerA4Stats] = useState(
    getInitialPlayerStatsOnCreation("4")
  );

  const [playerA5Stats, setPlayerA5Stats] = useState(
    getInitialPlayerStatsOnCreation("5")
  );
  const [playerA1Stats, setPlayerA1Stats] = useState(
    getInitialPlayerStatsOnCreation("1")
  );

  const [playerA2Stats, setPlayerA2Stats] = useState(
    getInitialPlayerStatsOnCreation("2")
  );

  const [playerA3Stats, setPlayerA3Stats] = useState(
    getInitialPlayerStatsOnCreation("3")
  );

  const [playerA4Stats, setPlayerA4Stats] = useState(
    getInitialPlayerStatsOnCreation("4")
  );

  const [playerA5Stats, setPlayerA5Stats] = useState(
    getInitialPlayerStatsOnCreation("5")
  );

  const [teamAStats, setTeamAStats] = useState({
    playerA1Stats,
    playerA2Stats,
    playerA3Stats,
    playerA4Stats,
    playerA5Stats,
  });
  const [teamAStats, setTeamAStats] = useState({
    playerA1Stats,
    playerA2Stats,
    playerA3Stats,
    playerA4Stats,
    playerA5Stats,
  });

  const [playerB1Stats, setPlayerB1Stats] = useState(
    getInitialPlayerStatsOnCreation("1")
  );
  const [playerB1Stats, setPlayerB1Stats] = useState(
    getInitialPlayerStatsOnCreation("1")
  );

  const [playerB2Stats, setPlayerB2Stats] = useState(
    getInitialPlayerStatsOnCreation("2")
  );
  const [playerB2Stats, setPlayerB2Stats] = useState(
    getInitialPlayerStatsOnCreation("2")
  );

  const [playerB3Stats, setPlayerB3Stats] = useState(
    getInitialPlayerStatsOnCreation("3")
  );
  const [playerB3Stats, setPlayerB3Stats] = useState(
    getInitialPlayerStatsOnCreation("3")
  );

  const [playerB4Stats, setPlayerB4Stats] = useState(
    getInitialPlayerStatsOnCreation("4")
  );
  const [playerB4Stats, setPlayerB4Stats] = useState(
    getInitialPlayerStatsOnCreation("4")
  );

  const [playerB5Stats, setPlayerB5Stats] = useState(
    getInitialPlayerStatsOnCreation("5")
  );
  const [playerB5Stats, setPlayerB5Stats] = useState(
    getInitialPlayerStatsOnCreation("5")
  );

  const [teamBStats, setTeamBStats] = useState({
    playerB1Stats,
    playerB2Stats,
    playerB3Stats,
    playerB4Stats,
    playerB5Stats,
  });

  const [teamsCreated, setTeamsCreated] = useState(false);

  const initialPointsUsedInStats = {
    height: 0,
    weight: 0,
    atleticism: 0,
    perimeterDefence: 0,
    insideDefence: 0,
    rebounding: 0,
    perimeterScoring: 0,
    insideScoring: 0,
    playMaking: 0,
  };

  const [pointsUsedInPlayerA1, setPointsUsedInPlayerA1] = useState(0);
  const [pointsUsedInStatsPlayerA1, setPointsUsedInStatsPlayerA1] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerA2, setPointsUsedInPlayerA2] = useState(0);
  const [pointsUsedInStatsPlayerA2, setPointsUsedInStatsPlayerA2] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerA3, setPointsUsedInPlayerA3] = useState(0);
  const [pointsUsedInStatsPlayerA3, setPointsUsedInStatsPlayerA3] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerA4, setPointsUsedInPlayerA4] = useState(0);
  const [pointsUsedInStatsPlayerA4, setPointsUsedInStatsPlayerA4] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerA5, setPointsUsedInPlayerA5] = useState(0);
  const [pointsUsedInStatsPlayerA5, setPointsUsedInStatsPlayerA5] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerB1, setPointsUsedInPlayerB1] = useState(0);
  const [pointsUsedInStatsPlayerB1, setPointsUsedInStatsPlayerB1] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerB2, setPointsUsedInPlayerB2] = useState(0);
  const [pointsUsedInStatsPlayerB2, setPointsUsedInStatsPlayerB2] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerB3, setPointsUsedInPlayerB3] = useState(0);
  const [pointsUsedInStatsPlayerB3, setPointsUsedInStatsPlayerB3] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerB4, setPointsUsedInPlayerB4] = useState(0);
  const [pointsUsedInStatsPlayerB4, setPointsUsedInStatsPlayerB4] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerB5, setPointsUsedInPlayerB5] = useState(0);
  const [pointsUsedInStatsPlayerB5, setPointsUsedInStatsPlayerB5] = useState(
    initialPointsUsedInStats
  );

  const [gameNarration, setGameNarration] = useState(["Game narration."]);

  const [showMoveButton, setShowMoveButton] = useState(false);

  const [showStealAttemptButton, setShowStealAttemptButton] = useState(false);

  const [showInterceptPassAttemptButton, setShowInterceptPassAttemptButton] =
    useState(false);

  const [showWaitPressingButton, setShowWaitPressingButton] = useState(false);

  const [showWaitCarefullyButton, setShowWaitCarefullyButton] = useState(false);

  const [showPassButton, setShowPassButton] = useState(false);

  const [showDribblingButton, setShowDribblingButton] = useState(false);

  const [showWaitWithoutTheBallButton, setShowWaitWithoutTheBallButton] =
    useState(false);

  const [showTripleThreatButton, setShowTripleThreatButton] = useState(false);

  const [showShootButton, setShowShootButton] = useState(false);

  const [showEndTurnButton, setShowEndTurnButton] = useState(false);

  const [activateConfirmButton, setActivateConfirmButton] = useState(false);

  const [actionConfirmed, setActionConfirmed] = useState("");
  const [finalisingAction, setFinalisingAction] = useState(false);

  const [confirmButtonHandler, setConfirmButtonHandler] = useState(
    () => () => {}
  );

  const [tileClicked, setTileClicked] = useState([0, 0]);

  const [playerClikedTeamA, setPlayerClikedTeamA] = useState([0, 0]);
  const [playerClikedTeamB, setPlayerClikedTeamB] = useState([0, 0]);

  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const [createPlayer, setCreatePlayer] = useState(0);

  return (
    <GameContext.Provider
      value={{
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
        teamAStats,
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
        teamBStats,
        setTeamBStats,
        teamsCreated,
        setTeamsCreated,
        pointsUsedInPlayerA1,
        pointsUsedInPlayerA2,
        pointsUsedInPlayerA3,
        pointsUsedInPlayerA4,
        pointsUsedInPlayerA5,
        setPointsUsedInPlayerA1,
        setPointsUsedInPlayerA2,
        setPointsUsedInPlayerA3,
        setPointsUsedInPlayerA4,
        setPointsUsedInPlayerA5,
        pointsUsedInStatsPlayerA1,
        pointsUsedInStatsPlayerA2,
        pointsUsedInStatsPlayerA3,
        pointsUsedInStatsPlayerA4,
        pointsUsedInStatsPlayerA5,
        setPointsUsedInStatsPlayerA1,
        setPointsUsedInStatsPlayerA2,
        setPointsUsedInStatsPlayerA3,
        setPointsUsedInStatsPlayerA4,
        setPointsUsedInStatsPlayerA5,
        pointsUsedInStatsPlayerB1,
        pointsUsedInStatsPlayerB2,
        pointsUsedInStatsPlayerB3,
        pointsUsedInStatsPlayerB4,
        pointsUsedInStatsPlayerB5,
        setPointsUsedInStatsPlayerB1,
        setPointsUsedInStatsPlayerB2,
        setPointsUsedInStatsPlayerB3,
        setPointsUsedInStatsPlayerB4,
        setPointsUsedInStatsPlayerB5,
        pointsUsedInPlayerB1,
        pointsUsedInPlayerB2,
        pointsUsedInPlayerB3,
        pointsUsedInPlayerB4,
        pointsUsedInPlayerB5,
        setPointsUsedInPlayerB1,
        setPointsUsedInPlayerB2,
        setPointsUsedInPlayerB3,
        setPointsUsedInPlayerB4,
        setPointsUsedInPlayerB5,
  return (
    <GameContext.Provider
      value={{
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
        teamAStats,
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
        teamBStats,
        setTeamBStats,
        teamsCreated,
        setTeamsCreated,
        pointsUsedInPlayerA1,
        pointsUsedInPlayerA2,
        pointsUsedInPlayerA3,
        pointsUsedInPlayerA4,
        pointsUsedInPlayerA5,
        setPointsUsedInPlayerA1,
        setPointsUsedInPlayerA2,
        setPointsUsedInPlayerA3,
        setPointsUsedInPlayerA4,
        setPointsUsedInPlayerA5,
        pointsUsedInStatsPlayerA1,
        pointsUsedInStatsPlayerA2,
        pointsUsedInStatsPlayerA3,
        pointsUsedInStatsPlayerA4,
        pointsUsedInStatsPlayerA5,
        setPointsUsedInStatsPlayerA1,
        setPointsUsedInStatsPlayerA2,
        setPointsUsedInStatsPlayerA3,
        setPointsUsedInStatsPlayerA4,
        setPointsUsedInStatsPlayerA5,
        pointsUsedInStatsPlayerB1,
        pointsUsedInStatsPlayerB2,
        pointsUsedInStatsPlayerB3,
        pointsUsedInStatsPlayerB4,
        pointsUsedInStatsPlayerB5,
        setPointsUsedInStatsPlayerB1,
        setPointsUsedInStatsPlayerB2,
        setPointsUsedInStatsPlayerB3,
        setPointsUsedInStatsPlayerB4,
        setPointsUsedInStatsPlayerB5,
        pointsUsedInPlayerB1,
        pointsUsedInPlayerB2,
        pointsUsedInPlayerB3,
        pointsUsedInPlayerB4,
        pointsUsedInPlayerB5,
        setPointsUsedInPlayerB1,
        setPointsUsedInPlayerB2,
        setPointsUsedInPlayerB3,
        setPointsUsedInPlayerB4,
        setPointsUsedInPlayerB5,

        gameNarration,
        setGameNarration,
        showMoveButton,
        setShowMoveButton,
        showStealAttemptButton,
        setShowStealAttemptButton,
        showInterceptPassAttemptButton,
        setShowInterceptPassAttemptButton,
        showWaitPressingButton,
        setShowWaitPressingButton,
        showWaitCarefullyButton,
        setShowWaitCarefullyButton,
        showPassButton,
        setShowPassButton,
        showDribblingButton,
        setShowDribblingButton,
        showWaitWithoutTheBallButton,
        setShowWaitWithoutTheBallButton,
        showTripleThreatButton,
        setShowTripleThreatButton,
        showShootButton,
        setShowShootButton,
        showEndTurnButton,
        setShowEndTurnButton,
        activateConfirmButton,
        setActivateConfirmButton,
        gameNarration,
        setGameNarration,
        showMoveButton,
        setShowMoveButton,
        showStealAttemptButton,
        setShowStealAttemptButton,
        showInterceptPassAttemptButton,
        setShowInterceptPassAttemptButton,
        showWaitPressingButton,
        setShowWaitPressingButton,
        showWaitCarefullyButton,
        setShowWaitCarefullyButton,
        showPassButton,
        setShowPassButton,
        showDribblingButton,
        setShowDribblingButton,
        showWaitWithoutTheBallButton,
        setShowWaitWithoutTheBallButton,
        showTripleThreatButton,
        setShowTripleThreatButton,
        showShootButton,
        setShowShootButton,
        showEndTurnButton,
        setShowEndTurnButton,
        activateConfirmButton,
        setActivateConfirmButton,

        actionConfirmed,
        setActionConfirmed,
        finalisingAction,
        setFinalisingAction,

        confirmButtonHandler,
        setConfirmButtonHandler,
        actionConfirmed,
        setActionConfirmed,
        finalisingAction,
        setFinalisingAction,

        confirmButtonHandler,
        setConfirmButtonHandler,

        tileClicked,
        setTileClicked,
        tileClicked,
        setTileClicked,

        playerClikedTeamA,
        setPlayerClikedTeamA,
        playerClikedTeamB,
        setPlayerClikedTeamB,
        gameBoard,
        setGameBoard,

        createPlayer,
        setCreatePlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
