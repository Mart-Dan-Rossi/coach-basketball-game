import React from "react";
import { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import "../styles/MatchActionsContainer.css";
import {} from "../entities/myInterfaces";
import { Match } from "../entities/match";

function MatchActionsContainer() {
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
    gameBoard,
    matchState,
  } = useContext(GameContext);

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

  useEffect(() => {}, [gameNarration]);

  const allActionsButtons = {
    MOVE_BUTTON: {
      id: 0,
      text: "Move",
      showState: showMoveButton,
      selectedState: moveButtonSelected,
      selectedSetter: setMoveButtonSelected,
      actionFunction: () => {
        setActionConfirmed("move");
        setFinalisingAction(true);
      },
    },
    STEAL_ATTEMPT_BUTTON: {
      id: 1,
      text: "Steal attempt",
      showState: showStealAttemptButton,
      selectedState: stealAttemptButtonSelected,
      selectedSetter: setStealAttemptButtonSelected,
      actionFunction: () => {
        setActionConfirmed("steal attempt");
      },
    },
    INTERCEPT_PASS_ATTEMPT_BUTTON: {
      id: 2,
      text: "Intercept pass attempt",
      showState: showInterceptPassAttemptButton,
      selectedState: interceptPassAttemptButtonSelected,
      selectedSetter: setInterceptPassAttemptButtonSelected,
      actionFunction: () => {
        setActionConfirmed("intercept pass attempt");
      },
    },
    OVERWHELING_WAITING_BUTTON: {
      id: 3,
      text: "Overwhelming waiting",
      showState: showWaitPressingButton,
      selectedState: waitPressingButtonSelected,
      selectedSetter: setOverwhelmingWaitingButtonSelected,
      actionFunction: () => {
        setActionConfirmed("overwhelming waiting");
      },
    },
    WAIT_WITH_CAUTION_BUTTON: {
      id: 4,
      text: "Wait with caution",
      showState: showWaitCarefullyButton,
      selectedState: waitCarefullyButtonSelected,
      selectedSetter: setWaitWithCautionButtonSelected,
      actionFunction: () => {
        setActionConfirmed("wait with caution");
      },
    },
    PASS_BUTTON: {
      id: 5,
      text: "Pass",
      showState: showPassButton,
      selectedState: passButtonSelected,
      selectedSetter: setPassButtonSelected,
      actionFunction: () => {
        setActionConfirmed("pass");
        setFinalisingAction(true);
      },
    },
    DRIBBLING_BUTTON: {
      id: 6,
      text: "Dribbling",
      showState: showDribblingButton,
      selectedState: dribblingButtonSelected,
      selectedSetter: setDribblingButtonSelected,
      actionFunction: () => {
        setActionConfirmed("dribbling");
        setFinalisingAction(true);
      },
    },
    WAIT_WITHOUT_THE_BALL_BUTTON: {
      id: 7,
      text: "Wait without the ball",
      showState: showWaitWithoutTheBallButton,
      selectedState: waitWithoutTheBallButtonSelected,
      selectedSetter: setWaitWithoutTheBallButtonSelected,
      actionFunction: () => {
        setActionConfirmed("wait without the ball");
      },
    },
    TRIPLE_THREAT_BUTTON: {
      id: 8,
      text: "Triple threat",
      showState: showTripleThreatButton,
      selectedState: tripleThreatButtonSelected,
      selectedSetter: setTripleThreatButtonSelected,
      actionFunction: () => {
        setActionConfirmed("triple threat");
      },
    },
    SHOOT_BUTTON: {
      id: 9,
      text: "Shoot",
      showState: showShootButton,
      selectedState: shootButtonSelected,
      selectedSetter: setShootButtonSelected,
      actionFunction: () => {
        setActionConfirmed("shoot");

        matchState.shotAttemptedStatus();
      },
    },
    END_TURN_BUTTON: {
      id: 10,
      text: "End turn",
      showState: showEndTurnButton,
      selectedState: endTurnButtonSelected,
      selectedSetter: setEndTurnButtonSelected,
      actionFunction: () => {
        setActionConfirmed("end turn");

        setEndTurnButtonSelected(false);

        matchState.handleSelectedPlayersStatus(
          false,
          gameNarration,
          setGameNarration,
          gameBoard
        );
      },
    },
  };

  function clickActionButtonHanddler(
    previousValueOfThisActionState: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    actionFunction: (match: Match) => void
  ) {
    return () => {
      setActivateConfirmButton(!previousValueOfThisActionState);

      let actionContent = Object.values(allActionsButtons);

      for (let i = 0; i < actionContent.length; i++) {
        actionContent[i].selectedSetter(false);
      }

      setter(!previousValueOfThisActionState);

      setConfirmButtonHandler(() => actionFunction);
    };
  }

  return (
    <div>
      <div className="match-actions-container">
        <div className="header-container">
          <span>{/*Decorative div, do not delete*/}</span>
          <h4>Actions</h4>
          <span>
            {matchState.getActivePlayer()
              ? `Points left: ${matchState.getActivePlayer()!.actionPoints}`
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
                    onClick={clickActionButtonHanddler(
                      action.selectedState,
                      action.selectedSetter,
                      action.actionFunction
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
        {
          <button
            onClick={
              activateConfirmButton
                ? () => {
                    confirmButtonHandler();
                  }
                : () => {
                    console.log("Select action first");
                  }
            }
            className={
              activateConfirmButton
                ? "confirm-button"
                : "disabled confirm-button"
            }
          >
            Confirm
          </button>
        }
      </div>

      <div className="game-narration-container">
        {gameNarration.map((string, index) => {
          return <p key={`narrationRow${index}`}>{string}</p>;
        })}
      </div>
    </div>
  );
}

export default MatchActionsContainer;
