import React from 'react'
import './MatchActionsContainer.css'

function MatchActionsContainer() {
  return (
    <div className='match-actions-container'>
        <h4>Actions</h4>
        <div className="actions-container">
            <button>Move</button>
            <button>Steal attempt</button>
            <button>Intercept pass attempt</button>
            <button>Wait pressing</button>
            <button>Wait carefully</button>
            <button>Pass</button>
            <button>Dribbling</button>
            <button>Wait without the ball</button>
            <button>Triple threat</button>
            <button>Shoot</button>
            <button>End turn</button>
            <button>Confirm</button>
        </div>
    </div>
  )
}

export default MatchActionsContainer