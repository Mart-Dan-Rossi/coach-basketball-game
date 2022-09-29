import { GameContext } from "./GameContext"
import React from 'react'
import {useState} from 'react';

interface props {
    children: JSX.Element | JSX.Element[]
}

export const GameContextProvider = ({ children }: props) =>{

    //Use the min values per position to fill this info
    const [playerA1Stats, setPlayerA1Stats] = useState({
        name: "",
        position: "1",
        height: 165,
        weight: 60,
        atleticism: 60,
        perimeterDefence: 50,
        insideDefence: 10,
        rebounding: 10,
        perimeterScoring: 50,
        insideScoring: 30,
        playMaking: 40
    })

    //Use the min values per position to fill this info
    const [playerA2Stats, setPlayerA2Stats] = useState({
        name: "",
        position: "2",
        height: 170,
        weight: 65,
        atleticism: 40,
        perimeterDefence: 45,
        insideDefence: 15,
        rebounding: 15,
        perimeterScoring: 50,
        insideScoring: 30,
        playMaking: 40
    })   

    //Use the min values per position to fill this info
    const [playerA3Stats, setPlayerA3Stats] = useState({
        name: "",
        position: "3",
        height: 175,
        weight: 70,
        atleticism: 40,
        perimeterDefence: 40,
        insideDefence: 30,
        rebounding: 30,
        perimeterScoring: 30,
        insideScoring: 40,
        playMaking: 10
    })    

    //Use the min values per position to fill this info
    const [playerA4Stats, setPlayerA4Stats] = useState({
        name: "",
        position: "4",
        height: 190,
        weight: 80,
        atleticism: 30,
        perimeterDefence: 20,
        insideDefence: 40,
        rebounding: 50,
        perimeterScoring: 10,
        insideScoring: 60,
        playMaking: 5
    })

    //Use the min values per position to fill this info
    const [playerA5Stats, setPlayerA5Stats] = useState({
        name: "",
        position: "5",
        height: 205,
        weight: 90,
        atleticism: 15,
        perimeterDefence: 5,
        insideDefence: 60,
        rebounding: 60,
        perimeterScoring: 5,
        insideScoring: 65,
        playMaking: 1
    }) 

    const [teamAStats, setTeamAStats] = useState({
        playerA1Stats,
        playerA2Stats,
        playerA3Stats,
        playerA4Stats,
        playerA5Stats
    })

    //Use the min values per position to fill this info
    const [playerB1Stats, setPlayerB1Stats] = useState({
        name: "",
        position: "1",
        height: 165,
        weight: 60,
        atleticism: 60,
        perimeterDefence: 50,
        insideDefence: 10,
        rebounding: 10,
        perimeterScoring: 50,
        insideScoring: 30,
        playMaking: 40
    })

    //Use the min values per position to fill this info
    const [playerB2Stats, setPlayerB2Stats] = useState({
        name: "",
        position: "2",
        height: 170,
        weight: 65,
        atleticism: 40,
        perimeterDefence: 45,
        insideDefence: 15,
        rebounding: 15,
        perimeterScoring: 50,
        insideScoring: 30,
        playMaking: 40
    })   

    //Use the min values per position to fill this info
    const [playerB3Stats, setPlayerB3Stats] = useState({
        name: "",
        position: "3",
        height: 175,
        weight: 70,
        atleticism: 40,
        perimeterDefence: 40,
        insideDefence: 30,
        rebounding: 30,
        perimeterScoring: 30,
        insideScoring: 40,
        playMaking: 10
    })    

    //Use the min values per position to fill this info
    const [playerB4Stats, setPlayerB4Stats] = useState({
        name: "",
        position: "4",
        height: 190,
        weight: 80,
        atleticism: 30,
        perimeterDefence: 20,
        insideDefence: 40,
        rebounding: 50,
        perimeterScoring: 10,
        insideScoring: 60,
        playMaking: 5
    })

    //Use the min values per position to fill this info
    const [playerB5Stats, setPlayerB5Stats] = useState({
        name: "",
        position: "5",
        height: 205,
        weight: 90,
        atleticism: 15,
        perimeterDefence: 5,
        insideDefence: 60,
        rebounding: 60,
        perimeterScoring: 5,
        insideScoring: 65,
        playMaking: 1
    }) 

    const [teamBStats, setTeamBStats] = useState({
        playerB1Stats,
        playerB2Stats,
        playerB3Stats,
        playerB4Stats,
        playerB5Stats
    })

    const [teamsCreated, setTeamsCreated] = useState(false)

    const [pointsUsedInPlayerA1, setPointsUsedInPlayerA1] = useState(0)
    const [pointsUsedInStatsPlayerA1, setPointsUsedInStatsPlayerA1] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerA2, setPointsUsedInPlayerA2] = useState(0)
    const [pointsUsedInStatsPlayerA2, setPointsUsedInStatsPlayerA2] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerA3, setPointsUsedInPlayerA3] = useState(0)
    const [pointsUsedInStatsPlayerA3, setPointsUsedInStatsPlayerA3] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerA4, setPointsUsedInPlayerA4] = useState(0)
    const [pointsUsedInStatsPlayerA4, setPointsUsedInStatsPlayerA4] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerA5, setPointsUsedInPlayerA5] = useState(0)
    const [pointsUsedInStatsPlayerA5, setPointsUsedInStatsPlayerA5] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerB1, setPointsUsedInPlayerB1] = useState(0)
    const [pointsUsedInStatsPlayerB1, setPointsUsedInStatsPlayerB1] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerB2, setPointsUsedInPlayerB2] = useState(0)
    const [pointsUsedInStatsPlayerB2, setPointsUsedInStatsPlayerB2] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerB3, setPointsUsedInPlayerB3] = useState(0)
    const [pointsUsedInStatsPlayerB3, setPointsUsedInStatsPlayerB3] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerB4, setPointsUsedInPlayerB4] = useState(0)
    const [pointsUsedInStatsPlayerB4, setPointsUsedInStatsPlayerB4] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerB5, setPointsUsedInPlayerB5] = useState(0)
    const [pointsUsedInStatsPlayerB5, setPointsUsedInStatsPlayerB5] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [gameNarration, setGameNarration] = useState(["Game narration."])

    const [showMoveButton, setShowMoveButton] = useState(true)
    
    const [showStealAttemptButton, setShowStealAttemptButton] = useState(true)

    const [showInterceptPassAttemptButton, setShowInterceptPassAttemptButton] = useState(true)

    const [showWaitPressingButton, setShowWaitPressingButton] = useState(true)

    const [showWaitCarefullyButton, setShowWaitCarefullyButton] = useState(true)

    const [showPassButton, setShowPassButton] = useState(true)

    const [showDribblingButton, setShowDribblingButton] = useState(true)

    const [showWaitWithoutTheBallButton, setShowWaitWithoutTheBallButton] = useState(true)

    const [showTripleThreatButton, setShowTripleThreatButton] = useState(true)

    const [showShootButton, setShowShootButton] = useState(true)

    const [showEndTurnButton, setShowEndTurnButton] = useState(true)

    const [showConfirmButton, setShowConfirmButton] = useState(true)

    const [gameBoard, setGameBoard] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ])


    return (
        <GameContext.Provider 
        value={
            {
                playerA1Stats, playerA2Stats, playerA3Stats, playerA4Stats, playerA5Stats, setPlayerA1Stats, setPlayerA2Stats, setPlayerA3Stats, setPlayerA4Stats, setPlayerA5Stats, teamAStats, setTeamAStats,
                playerB1Stats, playerB2Stats, playerB3Stats, playerB4Stats, playerB5Stats, setPlayerB1Stats, setPlayerB2Stats, setPlayerB3Stats, setPlayerB4Stats, setPlayerB5Stats, teamBStats, setTeamBStats,
                teamsCreated,
                setTeamsCreated,
                pointsUsedInPlayerA1, pointsUsedInPlayerA2, pointsUsedInPlayerA3, pointsUsedInPlayerA4, pointsUsedInPlayerA5, setPointsUsedInPlayerA1, setPointsUsedInPlayerA2, setPointsUsedInPlayerA3, setPointsUsedInPlayerA4, setPointsUsedInPlayerA5,
                pointsUsedInStatsPlayerA1, pointsUsedInStatsPlayerA2, pointsUsedInStatsPlayerA3, pointsUsedInStatsPlayerA4, pointsUsedInStatsPlayerA5, setPointsUsedInStatsPlayerA1, setPointsUsedInStatsPlayerA2, setPointsUsedInStatsPlayerA3, setPointsUsedInStatsPlayerA4, setPointsUsedInStatsPlayerA5,
                pointsUsedInStatsPlayerB1, pointsUsedInStatsPlayerB2, pointsUsedInStatsPlayerB3, pointsUsedInStatsPlayerB4, pointsUsedInStatsPlayerB5, setPointsUsedInStatsPlayerB1, setPointsUsedInStatsPlayerB2, setPointsUsedInStatsPlayerB3, setPointsUsedInStatsPlayerB4, setPointsUsedInStatsPlayerB5,
                pointsUsedInPlayerB1, pointsUsedInPlayerB2, pointsUsedInPlayerB3, pointsUsedInPlayerB4, pointsUsedInPlayerB5, setPointsUsedInPlayerB1, setPointsUsedInPlayerB2, setPointsUsedInPlayerB3, setPointsUsedInPlayerB4, setPointsUsedInPlayerB5,

                gameNarration, setGameNarration,
                showMoveButton, setShowMoveButton,
                showStealAttemptButton, setShowStealAttemptButton,
                showInterceptPassAttemptButton, setShowInterceptPassAttemptButton,
                showWaitPressingButton, setShowWaitPressingButton,
                showWaitCarefullyButton, setShowWaitCarefullyButton,
                showPassButton, setShowPassButton,
                showDribblingButton, setShowDribblingButton,
                showWaitWithoutTheBallButton, setShowWaitWithoutTheBallButton,
                showTripleThreatButton, setShowTripleThreatButton,
                showShootButton, setShowShootButton,
                showEndTurnButton, setShowEndTurnButton,
                showConfirmButton, setShowConfirmButton,

                gameBoard, setGameBoard
            }}>
            { children }
        </GameContext.Provider>
    )
}