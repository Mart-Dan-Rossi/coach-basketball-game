import React from "react";
import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/GameContext";
//@ts-ignore
import "../../styles/MatchActionsContainer.css";
import {} from "../../entities/myInterfaces";
import { Match } from "../../entities/match";
import GameStatsModal from "./GameStatsModal";
import toast from "react-hot-toast";

interface Props {
  match: Match;
  setMatchState: React.Dispatch<React.SetStateAction<Match>>;
}

const MatchActionsContainer = ({ match, setMatchState }: Props) => {
  const {
    gameNarration,
    setGameNarration,
    showMoveButton,
    showStealAttemptButton,
    showInterceptPassAttemptButton,
    showWaitPressingButton,
    showWaitCarefullyButton,
    showPassButton,
    showDribblingButton,
    showWaitWithoutTheBallButton,
    showTripleThreatButton,
    showShootButton,
    showEndTurnButton,
    activateConfirmButton,
    setFinalisingAction,
    setActivateConfirmButton,
    confirmButtonHandler,
    setConfirmButtonHandler,
    setActionConfirmed,
    gameboard,
    setGameboard,
    setActivePlayer,
  } = useContext(GameContext);

  let matchCopy = match;

  const [moveButtonSelected, setMoveButtonSelected] = useState(false);
  const [stealAttemptButtonSelected, setStealAttemptButtonSelected] =
    useState(false);
  const [
    interceptPassAttemptButtonSelected,
    setInterceptPassAttemptButtonSelected,
  ] = useState(false);
  const [waitPressingButtonSelected, setOverwhelmingWaitingButtonSelected] =
    useState(false);
  const [waitCarefullyButtonSelected, setWaitWithCautionButtonSelected] =
    useState(false);
  const [passButtonSelected, setPassButtonSelected] = useState(false);
  const [dribblingButtonSelected, setDribblingButtonSelected] = useState(false);
  const [
    waitWithoutTheBallButtonSelected,
    setWaitWithoutTheBallButtonSelected,
  ] = useState(false);
  const [tripleThreatButtonSelected, setTripleThreatButtonSelected] =
    useState(false);
  const [shootButtonSelected, setShootButtonSelected] = useState(false);
  const [endTurnButtonSelected, setEndTurnButtonSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, [gameNarration]);

  const allActionsButtons = {
    MOVE_BUTTON: {
      id: 0,
      text: "Move",
      showState: showMoveButton,
      selectedState: moveButtonSelected,
      selectedSetter: setMoveButtonSelected,
      actionFunction: handleMove,
    },
    STEAL_ATTEMPT_BUTTON: {
      id: 1,
      text: "Steal attempt",
      showState: showStealAttemptButton,
      selectedState: stealAttemptButtonSelected,
      selectedSetter: setStealAttemptButtonSelected,
      actionFunction: handleStealAttempt,
    },
    INTERCEPT_PASS_ATTEMPT_BUTTON: {
      id: 2,
      text: "Intercept pass attempt",
      showState: showInterceptPassAttemptButton,
      selectedState: interceptPassAttemptButtonSelected,
      selectedSetter: setInterceptPassAttemptButtonSelected,
      actionFunction: handleInterceptPassAttempt,
    },
    OVERWHELING_WAITING_BUTTON: {
      id: 3,
      text: "Overwhelming waiting",
      showState: showWaitPressingButton,
      selectedState: waitPressingButtonSelected,
      selectedSetter: setOverwhelmingWaitingButtonSelected,
      actionFunction: () => handleWait("overwhelmingWaiting"),
    },
    WAIT_WITH_CAUTION_BUTTON: {
      id: 4,
      text: "Wait with caution",
      showState: showWaitCarefullyButton,
      selectedState: waitCarefullyButtonSelected,
      selectedSetter: setWaitWithCautionButtonSelected,
      actionFunction: () => handleWait("withCaution"),
    },
    PASS_BUTTON: {
      id: 5,
      text: "Pass",
      showState: showPassButton,
      selectedState: passButtonSelected,
      selectedSetter: setPassButtonSelected,
      actionFunction: handlePass,
    },
    DRIBBLING_BUTTON: {
      id: 6,
      text: "Dribbling",
      showState: showDribblingButton,
      selectedState: dribblingButtonSelected,
      selectedSetter: setDribblingButtonSelected,
      actionFunction: handleDribbling,
    },
    WAIT_WITHOUT_THE_BALL_BUTTON: {
      id: 7,
      text: "Wait without the ball",
      showState: showWaitWithoutTheBallButton,
      selectedState: waitWithoutTheBallButtonSelected,
      selectedSetter: setWaitWithoutTheBallButtonSelected,
      actionFunction: () => handleWait("withoutTheBall"),
    },
    TRIPLE_THREAT_BUTTON: {
      id: 8,
      text: "Triple threat",
      showState: showTripleThreatButton,
      selectedState: tripleThreatButtonSelected,
      selectedSetter: setTripleThreatButtonSelected,
      actionFunction: () => handleWait("tripleThreat"),
    },
    SHOOT_BUTTON: {
      id: 9,
      text: "Shoot",
      showState: showShootButton,
      selectedState: shootButtonSelected,
      selectedSetter: setShootButtonSelected,

      actionFunction: handleShot,
    },
    END_TURN_BUTTON: {
      id: 10,
      text: "End turn",
      showState: showEndTurnButton,
      selectedState: endTurnButtonSelected,
      selectedSetter: setEndTurnButtonSelected,
      actionFunction: handleEndTurn,
    },
  };

  function handleMove(): void {
    setActionConfirmed(() => "move");
    setFinalisingAction(() => true);
    setMoveButtonSelected(() => false);
  }

  function handleStealAttempt(): void {
    setActionConfirmed(() => "stealAttempt");
  }

  function handleInterceptPassAttempt(): void {
    setActionConfirmed(() => "interceptPassAttempt");
  }

  function handlePass(): void {
    setActionConfirmed(() => "pass");
    setFinalisingAction(() => true);
  }

  function handleDribbling(): void {
    setActionConfirmed(() => "dribbling");
    setFinalisingAction(() => true);
    setDribblingButtonSelected(() => false);
  }

  function handleWait(type: string): void {
    setActionConfirmed(() => type);

    setWaitWithCautionButtonSelected(() => false);
    setOverwhelmingWaitingButtonSelected(() => false);
    setWaitWithoutTheBallButtonSelected(() => false);
    setTripleThreatButtonSelected(() => false);

    try {
      matchCopy.handlePlayerWait(
        type,
        gameNarration,
        setGameNarration,
        gameboard,
        setGameboard,
      );
    } catch (err) {
      toast.error(
        `${
          err instanceof Error ? err.message : "Unexpected error"
        } while handling wait ${type}`,
      );
    }

    setActivePlayer(() => matchCopy.getActivePlayer());

    setMatchState(() => matchCopy);
  }

  function handleShot(): void {
    setActionConfirmed(() => "shoot");

    setShootButtonSelected(() => false);

    try {
      matchCopy.shotAttemptedStatus();
    } catch (err) {
      toast.error(
        `${
          err instanceof Error ? err.message : "Unexpected error"
        } while handling shot status`,
      );
    }

    handleEndTurn();
  }

  function handleEndTurn(): void {
    setActionConfirmed(() => "end turn");

    setEndTurnButtonSelected(() => false);

    try {
      matchCopy.handleEndTurn(
        gameNarration,
        setGameNarration,
        gameboard,
        setGameboard,
      );
    } catch (err) {
      toast.error(
        `${
          err instanceof Error ? err.message : "Unexpected error"
        } while ending turn`,
      );
    }

    setActivePlayer(() => matchCopy.getActivePlayer());

    setMatchState(() => matchCopy);
  }

  function clickActionButtonHandler(
    previousValueOfThisActionState: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    actionFunction: (match: Match) => void,
  ): () => void {
    return () => {
      previousValueOfThisActionState
        ? setActivateConfirmButton(() => false)
        : setActivateConfirmButton(() => true);

      let actionContent = Object.values(allActionsButtons);

      for (let i = 0; i < actionContent.length; i++) {
        actionContent[i].selectedSetter(false);
      }

      setter(!previousValueOfThisActionState);

      setConfirmButtonHandler(() => actionFunction);
    };
  }

  function clickStatsButtonHandler(): void {
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="match-actions-container">
        <div className="header-container">
          <div className="stats-button">
            <button onClick={clickStatsButtonHandler}>Stats</button>
          </div>
          <h4>Actions</h4>
          <span>
            {match.getActivePlayer()
              ? `Points left: ${match.getActivePlayer()?.actionPoints}`
              : ""}
          </span>
        </div>

        <div className="actions-container">
          {Object.values(allActionsButtons).map((action) => {
            return (
              <div
                className={action.showState ? "" : "display-none"}
                key={action.text}
              >
                {action.showState && (
                  <button
                    onClick={clickActionButtonHandler(
                      action.selectedState,
                      action.selectedSetter,
                      action.actionFunction,
                    )}
                    className={action.selectedState ? "selected" : ""}
                  >
                    {action.text}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={
            activateConfirmButton
              ? () => {
                  confirmButtonHandler();
                }
              : () => {
                  toast("Select action first");
                }
          }
          className={
            activateConfirmButton ? "confirm-button" : "disabled confirm-button"
          }
        >
          Confirm
        </button>
      </div>

      <div className="game-narration-container">
        {gameNarration.map((string, index) => {
          return <p key={`narrationRow${index}`}>{string}</p>;
        })}
      </div>
      <GameStatsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        matchState={matchCopy}
      />
    </div>
  );
};

export default MatchActionsContainer;
