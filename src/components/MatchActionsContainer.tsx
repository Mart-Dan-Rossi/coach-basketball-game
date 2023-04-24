import React from 'react'
import {useContext, useState, useEffect} from 'react';
import {GameContext} from '../context/GameContext';
import './MatchActionsContainer.css'
import {  } from '../entities/myInterfaces';
import { dribblingButtonFunction, endTurnButtonFunction, interceptPassAttemptButtonFunction, moveButtonFunction, overwhelmingWaitingButtonFunction, passButtonFunction, shootButtonFunction, stealAttemptButtonFunction, tripleThreatButtonFunction, waitWithCautionButtonFunction, waitWithoutTheBallButtonFunction } from '../utilities/exportableFunctions';
import { Match } from '../entities/match';

interface Props {
  match: Match
}

function MatchActionsContainer( { match } : Props) {
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

  useEffect(() => {
  }, [gameNarration])

  const allActionsButtons = {
    MOVE_BUTTON: {
      id: 0,
      text: "Move",
      showState: showMoveButton,
      selectedState: moveButtonSelected,
      selectedSetter: setMoveButtonSelected,
      actionFunction: (match: Match)=> {

        moveButtonFunction(match)
        match.handleSelectedPlayersStatus()

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
      actionFunction: (match: Match)=> {

        match.handleSelectedPlayersStatus()
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
      actionFunction: (match: Match)=> {

        match.handleSelectedPlayersStatus()
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
      actionFunction: (match: Match)=> {

        match.handleSelectedPlayersStatus()
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
      actionFunction: (match: Match)=> {

        match.handleSelectedPlayersStatus()
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
      actionFunction: (match: Match)=> {

        match.handleSelectedPlayersStatus()
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
      actionFunction: (match: Match)=> {

        match.handleSelectedPlayersStatus()
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
      actionFunction: (match: Match)=> {

        match.handleSelectedPlayersStatus()
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
      actionFunction: (match: Match)=> {

        match.handleSelectedPlayersStatus()
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
      actionFunction: (match: Match)=> {

        match.handleSelectedPlayersStatus()
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
      actionFunction: (match: Match)=> {

        match.handleSelectedPlayersStatus()
        endTurnButtonFunction()
        
      },
    }
    ,
  }  

  function clickActionButtonHanddler(previousValueOfThisActionState: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>, actionFunction: (match: Match)=> void) {
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

  console.log("cfh: ", confirmButtonHandler)

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