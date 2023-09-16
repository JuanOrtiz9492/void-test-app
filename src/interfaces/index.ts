interface PlayerCardInterface {
  rankPosition:string, 
  nickName:string,
  raiting:string,
  wins:string,
  banStatus:boolean
  [key:string]:any
}

interface MatchInformation {
  map: string,
  hasWon:boolean,
  KDA: string | number,
  agent: string,
  agentSrc:string,
  gameDate:string,
  gameDuration:number,
  playersImage:string,
  playersNick:string
}

export type { PlayerCardInterface, MatchInformation }