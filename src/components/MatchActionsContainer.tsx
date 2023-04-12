import React from 'react'
import {useContext, useState, useEffect} from 'react';
import {GameContext} from '../context/GameContext';
import './MatchActionsContainer.css'

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
    setActivateConfirmButton,
    confirmButtonHandler
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



  useEffect(() => {
    return () => {
    }
  }, [gameNarration])
  

  function clickActionButtonHanddler(previousValue: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) {
    return ()=>{
      previousValue ? setActivateConfirmButton(false) : setActivateConfirmButton(true)

      setMoveButtonSelected(false)
      setStealAttemptButtonSelected(false)
      setInterceptPassAttemptButtonSelected(false)
      setOverwhelmingWaitingButtonSelected(false)
      setWaitWithCautionButtonSelected(false)
      setPassButtonSelected(false)
      setDribblingButtonSelected(false)
      setWaitWithoutTheBallButtonSelected(false)
      setTripleThreatButtonSelected(false)
      setShootButtonSelected(false)
      setEndTurnButtonSelected(false)

      setter(!previousValue)
      
    }
  }

  const allActionsButtons = {
    MOVE_BUTTON: {
      text: "Move",
      showState: showMoveButton,
      selectedState: moveButtonSelected,
      selectedSetter: setMoveButtonSelected
    }
    ,
    STEAL_ATTEMPT_BUTTON: {
      text: "Steal attempt",
      showState: showStealAttemptButton,
      selectedState: stealAttemptButtonSelected,
      selectedSetter: setStealAttemptButtonSelected
    }
    ,
    INTERCEPT_PASS_ATTEMPT_BUTTON: {
      text: "Intercept pass attempt",
      showState: showInterceptPassAttemptButton,
      selectedState: interceptPassAttemptButtonSelected,
      selectedSetter: setInterceptPassAttemptButtonSelected
    }
    ,
    OVERWHELING_WAITING_BUTTON: {
      text: "Overwhelming waiting",
      showState: showWaitPressingButton,
      selectedState: waitPressingButtonSelected,
      selectedSetter: setOverwhelmingWaitingButtonSelected
    }
    ,
    WAIT_WITH_CAUTION_BUTTON: {
      text: "Wait with caution",
      showState: showWaitCarefullyButton,
      selectedState: waitCarefullyButtonSelected,
      selectedSetter: setWaitWithCautionButtonSelected
    }
    ,
    PASS_BUTTON: {
      text: "Pass",
      showState: showPassButton,
      selectedState: passButtonSelected,
      selectedSetter: setPassButtonSelected
    }
    ,
    DRIBBLING_BUTTON: {
      text: "Dribbling",
      showState: showDribblingButton,
      selectedState: dribblingButtonSelected,
      selectedSetter: setDribblingButtonSelected
    }
    ,
    WAIT_WITHOUT_THE_BALL_BUTTON: {
      text: "Wait without the ball",
      showState: showWaitWithoutTheBallButton,
      selectedState: waitWithoutTheBallButtonSelected,
      selectedSetter: setWaitWithoutTheBallButtonSelected
    }
    ,
    TRIPLE_THREAT_BUTTON: {
      text: "Triple threat",
      showState: showTripleThreatButton,
      selectedState: tripleThreatButtonSelected,
      selectedSetter: setTripleThreatButtonSelected
    }
    ,
    SHOOT_BUTTON: {
      text: "Shoot",
      showState: showShootButton,
      selectedState: shootButtonSelected,
      selectedSetter: setShootButtonSelected
    }
    ,
    END_TURN_BUTTON: {
      text: "End turn",
      showState: showEndTurnButton,
      selectedState: endTurnButtonSelected,
      selectedSetter: setEndTurnButtonSelected
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
                      onClick={clickActionButtonHanddler(action.selectedState, action.selectedSetter)}
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
                  onClick={activateConfirmButton ? ()=> confirmButtonHandler() : ()=>{console.log("Select action first")}}
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