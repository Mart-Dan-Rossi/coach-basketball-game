import React from 'react'
import {useContext, useState, useEffect} from 'react';
import {GameContext} from '../context/GameContext';
import './MatchActionsContainer.css'
import {  } from '../entities/myInterfaces';
import { dribblingButtonFunction, endTurnButtonFunction, interceptPassAttemptButtonFunction, moveButtonFunction, overwhelmingWaitingButtonFunction, passButtonFunction, shootButtonFunction, stealAttemptButtonFunction, tripleThreatButtonFunction, waitWithCautionButtonFunction, waitWithoutTheBallButtonFunction } from '../utilities/exportableFunctions';

function MatchActionsContainer() {
  const {
    gameNarration,
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
    setShowMoveButton,
    setShowStealAttemptButton,
    setShowInterceptPassAttemptButton,
    setShowWaitPressingButton,
    setShowWaitCarefullyButton,
    setShowPassButton,
    setShowDribblingButton,
    setShowWaitWithoutTheBallButton,
    setShowTripleThreatButton,
    setShowShootButton,
    setShowEndTurnButton,
    setActivateConfirmButton,
    confirmButtonHandler,
    setConfirmButtonHandler,
  } = useContext(GameContext)
  
  const [moveButtonSelected, setMoveButtonSelected] = useState(false)
  const [stealAttemptButtonSelected, setStealAttemptButtonSelected] = useState(false)
  const [interceptPassAttemptButtonSelected, setInterceptPassAttemptButtonSelected] = useState(false)
  const [waitPressingButtonSelected, setOverwhelmingWaitingButtonSelected] = useState(false)
  const [waitCarefullyButtonSelected, setWaitWithCautionButtonSelected] = useState(false)
  const [passButtonSelected, setPassButtonSelected] = useState(false)
  const [dribblingButtonSelected, setDribblingButtonSelected] = useState(false)
  const [waitWithoutTheBallButtonSelected, setWaitWithoutTheBallButtonSelected] = useState(false)
  const [tripleThreatButtonSelected, setTripleThreatButtonSelected] = useState(false)
  const [shootButtonSelected, setShootButtonSelected] = useState(false)
  const [endTurnButtonSelected, setEndTurnButtonSelected] = useState(false)

  console.log("cbh: ", confirmButtonHandler)

  function hideActionsButtons() {
    setShowMoveButton(false)
    setShowStealAttemptButton(false)
    setShowInterceptPassAttemptButton(false)
    setShowWaitPressingButton(false)
    setShowWaitCarefullyButton(false)
    setShowPassButton(false)
    setShowDribblingButton(false)
    setShowWaitWithoutTheBallButton(false)
    setShowTripleThreatButton(false)
    setShowShootButton(false)
    setShowEndTurnButton(false)
  }


  useEffect(() => {
    return () => {
    }
  }, [gameNarration])

  const allActionsButtons = {
    MOVE_BUTTON: {
      id: 0,
      text: "Move",
      showState: showMoveButton,
      selectedState: moveButtonSelected,
      selectedSetter: setMoveButtonSelected,
      actionFunction: ()=> {
        moveButtonFunction()
      }
      ,
    }
    ,
    STEAL_ATTEMPT_BUTTON: {
      id: 1,
      text: "Steal attempt",
      showState: showStealAttemptButton,
      selectedState: stealAttemptButtonSelected,
      selectedSetter: setStealAttemptButtonSelected,
      actionFunction: ()=> {
        stealAttemptButtonFunction()
      },
    }
    ,
    INTERCEPT_PASS_ATTEMPT_BUTTON: {
      id: 2,
      text: "Intercept pass attempt",
      showState: showInterceptPassAttemptButton,
      selectedState: interceptPassAttemptButtonSelected,
      selectedSetter: setInterceptPassAttemptButtonSelected,
      actionFunction: ()=> {
        interceptPassAttemptButtonFunction()
      },
    }
    ,
    OVERWHELING_WAITING_BUTTON: {
      id: 3,
      text: "Overwhelming waiting",
      showState: showWaitPressingButton,
      selectedState: waitPressingButtonSelected,
      selectedSetter: setOverwhelmingWaitingButtonSelected,
      actionFunction: ()=> {
        overwhelmingWaitingButtonFunction()
      },
    }
    ,
    WAIT_WITH_CAUTION_BUTTON: {
      id: 4,
      text: "Wait with caution",
      showState: showWaitCarefullyButton,
      selectedState: waitCarefullyButtonSelected,
      selectedSetter: setWaitWithCautionButtonSelected,
      actionFunction: ()=> {
        waitWithCautionButtonFunction()
      },
    }
    ,
    PASS_BUTTON: {
      id: 5,
      text: "Pass",
      showState: showPassButton,
      selectedState: passButtonSelected,
      selectedSetter: setPassButtonSelected,
      actionFunction: ()=> {
        passButtonFunction()
      },
    }
    ,
    DRIBBLING_BUTTON: {
      id: 6,
      text: "Dribbling",
      showState: showDribblingButton,
      selectedState: dribblingButtonSelected,
      selectedSetter: setDribblingButtonSelected,
      actionFunction: ()=> {
        dribblingButtonFunction()
      },
    }
    ,
    WAIT_WITHOUT_THE_BALL_BUTTON: {
      id: 7,
      text: "Wait without the ball",
      showState: showWaitWithoutTheBallButton,
      selectedState: waitWithoutTheBallButtonSelected,
      selectedSetter: setWaitWithoutTheBallButtonSelected,
      actionFunction: ()=> {
        waitWithoutTheBallButtonFunction()
      },
    }
    ,
    TRIPLE_THREAT_BUTTON: {
      id: 8,
      text: "Triple threat",
      showState: showTripleThreatButton,
      selectedState: tripleThreatButtonSelected,
      selectedSetter: setTripleThreatButtonSelected,
      actionFunction: ()=> {
        tripleThreatButtonFunction()
      },
    }
    ,
    SHOOT_BUTTON: {
      id: 9,
      text: "Shoot",
      showState: showShootButton,
      selectedState: shootButtonSelected,
      selectedSetter: setShootButtonSelected,
      actionFunction: ()=> {
        shootButtonFunction()
      },
    }
    ,
    END_TURN_BUTTON: {
      id: 10,
      text: "End turn",
      showState: showEndTurnButton,
      selectedState: endTurnButtonSelected,
      selectedSetter: setEndTurnButtonSelected,
      actionFunction: ()=> {
        endTurnButtonFunction()
      },
    }
    ,
  }  

  function clickActionButtonHanddler(previousValueOfThisActionState: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>, actionFunction: ()=> void) {
    return ()=>{
      previousValueOfThisActionState ? setActivateConfirmButton(false) : setActivateConfirmButton(true)
      
      let actionContent = Object.values(allActionsButtons)
      
      for(let i = 0; i < actionContent.length; i++) {
        actionContent[i].selectedSetter(false)        
        
      }

      setter(!previousValueOfThisActionState)

      setConfirmButtonHandler(()=> actionFunction)
    }
  }

  return (
    <div>
      <div className='match-actions-container'>
          <h4>Actions</h4>
          <div className="actions-container">
            {
              Object.values(allActionsButtons).map(action=> {
                return (
                  <>
                  {
                    action.showState &&
                    <button
                      onClick={clickActionButtonHanddler(action.selectedState, action.selectedSetter, action.actionFunction)}
                      className={ action.selectedState ? "selected" : "" }
                    >
                        {action.text}
                    </button>
                  }
                  </>
                )
              }) 
            }

          </div>
              {
                  <button
                  onClick={activateConfirmButton ? ()=> {confirmButtonHandler()} : ()=>{console.log("Select action first")}}
                  className={ activateConfirmButton ? "confirm-button" : "disabled confirm-button" }
                  >
                      Confirm
                  </button>
              }
      </div>  

      <div className='game-narration-container'>
        {
          gameNarration.map((string, index) => {
            return <p key={`narrationRow${index}`}>{string}</p>
          })
        }
      </div>
    </div>
  )
}

export default MatchActionsContainer