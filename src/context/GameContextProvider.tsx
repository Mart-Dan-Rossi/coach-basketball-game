import { GameContext } from "./GameContext"
import React from 'react'
import {useState} from 'react';
import {getMinStatPerPosition} from "../utilities/exportableFunctions"

interface props {
    children: JSX.Element | JSX.Element[]
}

export const GameContextProvider = ({ children }: props) => {

    const [playerA1Stats, setPlayerA1Stats] = useState({
        name: "",
        position: "1",
        height: getMinStatPerPosition("height", "1"),
        weight: getMinStatPerPosition("weight", "1"),
        atleticism: getMinStatPerPosition("atleticism", "1"),
        perimeterDefence: getMinStatPerPosition("perimeterDefence", "1"),
        insideDefence: getMinStatPerPosition("insideDefence", "1"),
        rebounding: getMinStatPerPosition("rebounding", "1"),
        perimeterScoring: getMinStatPerPosition("perimeterScoring", "1"),
        insideScoring: getMinStatPerPosition("insideScoring", "1"),
        playMaking: getMinStatPerPosition("playMaking", "1")
    })

    const [playerA2Stats, setPlayerA2Stats] = useState({
        name: "",
        position: "2",
        height: getMinStatPerPosition("height", "2"),
        weight: getMinStatPerPosition("weight", "2"),
        atleticism: getMinStatPerPosition("atleticism", "2"),
        perimeterDefence: getMinStatPerPosition("perimeterDefence", "2"),
        insideDefence: getMinStatPerPosition("insideDefence", "2"),
        rebounding: getMinStatPerPosition("rebounding", "2"),
        perimeterScoring: getMinStatPerPosition("perimeterScoring", "2"),
        insideScoring: getMinStatPerPosition("insideScoring", "2"),
        playMaking: getMinStatPerPosition("playMaking", "2")
    })   

    const [playerA3Stats, setPlayerA3Stats] = useState({
        name: "",
        position: "3",
        height: getMinStatPerPosition("height", "3"),
        weight: getMinStatPerPosition("weight", "3"),
        atleticism: getMinStatPerPosition("atleticism", "3"),
        perimeterDefence: getMinStatPerPosition("perimeterDefence", "3"),
        insideDefence: getMinStatPerPosition("insideDefence", "3"),
        rebounding: getMinStatPerPosition("rebounding", "3"),
        perimeterScoring: getMinStatPerPosition("perimeterScoring", "3"),
        insideScoring: getMinStatPerPosition("insideScoring", "3"),
        playMaking: getMinStatPerPosition("playMaking", "3")
    })    

    const [playerA4Stats, setPlayerA4Stats] = useState({
        name: "",
        position: "4",
        height: getMinStatPerPosition("height", "4"),
        weight: getMinStatPerPosition("weight", "4"),
        atleticism: getMinStatPerPosition("atleticism", "4"),
        perimeterDefence: getMinStatPerPosition("perimeterDefence", "4"),
        insideDefence: getMinStatPerPosition("insideDefence", "4"),
        rebounding: getMinStatPerPosition("rebounding", "4"),
        perimeterScoring: getMinStatPerPosition("perimeterScoring", "4"),
        insideScoring: getMinStatPerPosition("insideScoring", "4"),
        playMaking: getMinStatPerPosition("playMaking", "4")
    })

    const [playerA5Stats, setPlayerA5Stats] = useState({
        name: "",
        position: "5",
        height: getMinStatPerPosition("height", "5"),
        weight: getMinStatPerPosition("weight", "5"),
        atleticism: getMinStatPerPosition("atleticism", "5"),
        perimeterDefence: getMinStatPerPosition("perimeterDefence", "5"),
        insideDefence: getMinStatPerPosition("insideDefence", "5"),
        rebounding: getMinStatPerPosition("rebounding", "5"),
        perimeterScoring: getMinStatPerPosition("perimeterScoring", "5"),
        insideScoring: getMinStatPerPosition("insideScoring", "5"),
        playMaking: getMinStatPerPosition("playMaking", "5")
    }) 

    const [teamAStats, setTeamAStats] = useState({
        playerA1Stats,
        playerA2Stats,
        playerA3Stats,
        playerA4Stats,
        playerA5Stats
    })

    const [playerB1Stats, setPlayerB1Stats] = useState({
        name: "",
        position: "1",
        height: getMinStatPerPosition("height", "1"),
        weight: getMinStatPerPosition("weight", "1"),
        atleticism: getMinStatPerPosition("atleticism", "1"),
        perimeterDefence: getMinStatPerPosition("perimeterDefence", "1"),
        insideDefence: getMinStatPerPosition("insideDefence", "1"),
        rebounding: getMinStatPerPosition("rebounding", "1"),
        perimeterScoring: getMinStatPerPosition("perimeterScoring", "1"),
        insideScoring: getMinStatPerPosition("insideScoring", "1"),
        playMaking: getMinStatPerPosition("playMaking", "1")
    })

    const [playerB2Stats, setPlayerB2Stats] = useState({
        name: "",
        position: "2",
        height: getMinStatPerPosition("height", "2"),
        weight: getMinStatPerPosition("weight", "2"),
        atleticism: getMinStatPerPosition("atleticism", "2"),
        perimeterDefence: getMinStatPerPosition("perimeterDefence", "2"),
        insideDefence: getMinStatPerPosition("insideDefence", "2"),
        rebounding: getMinStatPerPosition("rebounding", "2"),
        perimeterScoring: getMinStatPerPosition("perimeterScoring", "2"),
        insideScoring: getMinStatPerPosition("insideScoring", "2"),
        playMaking: getMinStatPerPosition("playMaking", "2")
    })   

    const [playerB3Stats, setPlayerB3Stats] = useState({
        name: "",
        position: "3",
        height: getMinStatPerPosition("height", "3"),
        weight: getMinStatPerPosition("weight", "3"),
        atleticism: getMinStatPerPosition("atleticism", "3"),
        perimeterDefence: getMinStatPerPosition("perimeterDefence", "3"),
        insideDefence: getMinStatPerPosition("insideDefence", "3"),
        rebounding: getMinStatPerPosition("rebounding", "3"),
        perimeterScoring: getMinStatPerPosition("perimeterScoring", "3"),
        insideScoring: getMinStatPerPosition("insideScoring", "3"),
        playMaking: getMinStatPerPosition("playMaking", "3")
    })    

    const [playerB4Stats, setPlayerB4Stats] = useState({
        name: "",
        position: "4",
        height: getMinStatPerPosition("height", "4"),
        weight: getMinStatPerPosition("weight", "4"),
        atleticism: getMinStatPerPosition("atleticism", "4"),
        perimeterDefence: getMinStatPerPosition("perimeterDefence", "4"),
        insideDefence: getMinStatPerPosition("insideDefence", "4"),
        rebounding: getMinStatPerPosition("rebounding", "4"),
        perimeterScoring: getMinStatPerPosition("perimeterScoring", "4"),
        insideScoring: getMinStatPerPosition("insideScoring", "4"),
        playMaking: getMinStatPerPosition("playMaking", "4")
    })

    const [playerB5Stats, setPlayerB5Stats] = useState({
        name: "",
        position: "5",
        height: getMinStatPerPosition("height", "5"),
        weight: getMinStatPerPosition("weight", "5"),
        atleticism: getMinStatPerPosition("atleticism", "5"),
        perimeterDefence: getMinStatPerPosition("perimeterDefence", "5"),
        insideDefence: getMinStatPerPosition("insideDefence", "5"),
        rebounding: getMinStatPerPosition("rebounding", "5"),
        perimeterScoring: getMinStatPerPosition("perimeterScoring", "5"),
        insideScoring: getMinStatPerPosition("insideScoring", "5"),
        playMaking: getMinStatPerPosition("playMaking", "5")
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

    const [showMoveButton, setShowMoveButton] = useState(false)
    
    const [showStealAttemptButton, setShowStealAttemptButton] = useState(false)

    const [showInterceptPassAttemptButton, setShowInterceptPassAttemptButton] = useState(false)

    const [showWaitPressingButton, setShowWaitPressingButton] = useState(false)

    const [showWaitCarefullyButton, setShowWaitCarefullyButton] = useState(false)

    const [showPassButton, setShowPassButton] = useState(false)

    const [showDribblingButton, setShowDribblingButton] = useState(false)

    const [showWaitWithoutTheBallButton, setShowWaitWithoutTheBallButton] = useState(false)

    const [showTripleThreatButton, setShowTripleThreatButton] = useState(false)

    const [showShootButton, setShowShootButton] = useState(false)

    const [showEndTurnButton, setShowEndTurnButton] = useState(false)

    const [activateConfirmButton, setActivateConfirmButton] = useState(false)

    const [actionConfirmed, setActionConfirmed] = useState("")
    const [finalisingAction, setFinalisingAction] = useState(false)

    const [confirmButtonHandler, setConfirmButtonHandler] = useState(()=> ()=> {})

    const [tileClicked, setTileClicked] = useState([0, 0])

    const [playerClikedTeamA, setPlayerClikedTeamA] = useState([0, 0])
    const [playerClikedTeamB, setPlayerClikedTeamB] = useState([0, 0])

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
                activateConfirmButton, setActivateConfirmButton,

                actionConfirmed, setActionConfirmed,
                finalisingAction, setFinalisingAction,
                
                confirmButtonHandler, setConfirmButtonHandler,

                tileClicked, setTileClicked,

                playerClikedTeamA, setPlayerClikedTeamA,
                playerClikedTeamB, setPlayerClikedTeamB,
            }}>
            { children }
        </GameContext.Provider>
    )
}