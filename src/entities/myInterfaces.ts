export interface PlayerEditableInfo {    
    name: string,
    position: string,
    height: number,
    weight: number,
    atleticism: number,
    perimeterDefence: number,
    insideDefence: number,
    rebounding: number,
    perimeterScoring: number,
    insideScoring: number,
    playMaking: number    
}

export interface PlayerStats {
    height: number;
    weight: number;
    atleticism: number;
    perDef: number;
    insDef: number;
    reb: number;
    perScor: number;
    insScor: number;
    plmkn: number;
}

export interface TeamAStats{
    playerA1Stats: PlayerEditableInfo,
    playerA2Stats: PlayerEditableInfo,
    playerA3Stats: PlayerEditableInfo,
    playerA4Stats: PlayerEditableInfo,
    playerA5Stats: PlayerEditableInfo
}

export interface TeamBStats{
    playerB1Stats: PlayerEditableInfo,
    playerB2Stats: PlayerEditableInfo,
    playerB3Stats: PlayerEditableInfo,
    playerB4Stats: PlayerEditableInfo,
    playerB5Stats: PlayerEditableInfo
}