import React from 'react'
import {useContext, useState} from 'react';
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
    showConfirmButton,
  } = useContext(GameContext)
  
  const [moveButtonSelected, setMoveButtonSelected] = useState(false)
  const [stealAttemptButtonSelected, setStealAttemptButtonSelected] = useState(false)
  const [interceptPassAttemptButtonSelected, setInterceptPassAttemptButtonSelected] = useState(false)
  const [waitPressingButtonSelected, setWaitPressingButtonSelected] = useState(false)
  const [waitCarefullyButtonSelected, setWaitCarefullyButtonSelected] = useState(false)
  const [passButtonSelected, setPassButtonSelected] = useState(false)
  const [dribblingButtonSelected, setDribblingButtonSelected] = useState(false)
  const [waitWithoutTheBallButtonSelected, setWaitWithoutTheBallButtonSelected] = useState(false)
  const [tripleThreatButtonSelected, setTripleThreatButtonSelected] = useState(false)
  const [shootButtonSelected, setShootButtonSelected] = useState(false)
  const [endTurnButtonSelected, setEndTurnButtonSelected] = useState(false)
  const [confirmButtonSelected, setConfirmButtonSelected] = useState(false)

  function clickActionButtonHanddler(previousValue: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) {
    return ()=>{
      setter(!previousValue)
    }
  }

  return (
    <div>
      <div className='match-actions-container'>
          <h4>Actions</h4>
          <div className="actions-container">
              {
                showMoveButton &&
                  <button
                    onClick={clickActionButtonHanddler(moveButtonSelected, setMoveButtonSelected)}
                    className={ moveButtonSelected ? "selected" : "" }
                  >
                      Move
                  </button>
              }

              {
                showStealAttemptButton &&
                  <button
                    onClick={clickActionButtonHanddler(stealAttemptButtonSelected, setStealAttemptButtonSelected)}
                    className={ stealAttemptButtonSelected ? "selected" : "" }
                  >
                      Steal attempt
                  </button>
              }

              {
                showInterceptPassAttemptButton &&
                  <button
                    onClick={clickActionButtonHanddler(interceptPassAttemptButtonSelected, setInterceptPassAttemptButtonSelected)}
                    className={ interceptPassAttemptButtonSelected ? "selected" : "" }
                  >
                      Intercept pass attempt
                  </button>
              }

              {
                showWaitPressingButton &&
                  <button
                    onClick={clickActionButtonHanddler(waitPressingButtonSelected, setWaitPressingButtonSelected)}
                    className={ waitPressingButtonSelected ? "selected" : "" }
                  >
                      Wait pressing
                  </button>
              }

              {
                showWaitCarefullyButton &&
                  <button
                    onClick={clickActionButtonHanddler(waitCarefullyButtonSelected, setWaitCarefullyButtonSelected)}
                    className={ waitCarefullyButtonSelected ? "selected" : "" }
                  >
                      Wait carefully
                  </button>
              }

              {
                showPassButton &&
                  <button
                    onClick={clickActionButtonHanddler(passButtonSelected, setPassButtonSelected)}
                    className={ passButtonSelected ? "selected" : "" }
                  >
                      Pass
                  </button>
              }

              {
                showDribblingButton &&
                  <button
                    onClick={clickActionButtonHanddler(dribblingButtonSelected, setDribblingButtonSelected)}
                    className={ dribblingButtonSelected ? "selected" : "" }
                  >
                      Dribbling
                  </button>
              }

              {
                showWaitWithoutTheBallButton &&
                  <button
                    onClick={clickActionButtonHanddler(waitWithoutTheBallButtonSelected, setWaitWithoutTheBallButtonSelected)}
                    className={ waitWithoutTheBallButtonSelected ? "selected" : "" }
                  >
                      Wait without the ball
                  </button>
              }

              {
                showTripleThreatButton &&
                  <button
                    onClick={clickActionButtonHanddler(tripleThreatButtonSelected, setTripleThreatButtonSelected)}
                    className={ tripleThreatButtonSelected ? "selected" : "" }
                  >
                      Triple threat
                  </button>
              }

              {
                showShootButton &&
                  <button
                    onClick={clickActionButtonHanddler(shootButtonSelected, setShootButtonSelected)}
                    className={ shootButtonSelected ? "selected" : "" }
                  >
                      Shoot
                  </button>
              }

              {
                showEndTurnButton &&
                  <button
                    onClick={clickActionButtonHanddler(endTurnButtonSelected, setEndTurnButtonSelected)}
                    className={ endTurnButtonSelected ? "selected" : "" }
                  >
                      End turn
                  </button>
              }

              {
                showConfirmButton &&
                  <button
                    onClick={clickActionButtonHanddler(confirmButtonSelected, setConfirmButtonSelected)}
                    className={ confirmButtonSelected ? "selected" : "" }
                  >
                      Confirm
                  </button>
              }

          </div>
      </div>  

      <div className='game-narration-container'>
        <p>{gameNarration}</p>
      </div>
    </div>
  )
}

export default MatchActionsContainer