"use client"
import { getCookie } from "@/utils"
import {useState, useEffect} from 'react'
import MatchCard from "./matchCard"
import { MatchInformation } from "@/interfaces"
import { createStyles, Group, Text, Avatar, Loader, Flex } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  groupStyles: {
    marginBottom: '2em'
  }
}));

export default function Player ({ params }: { params: { puuid: string } }) {

  const { classes } = useStyles();

  const [activePlayer, setActivePlayer] = useState({playersNickname:'', playersImage:'' })
  const [usersGameData, setUsersGameData] = useState<MatchInformation[]>([])
  const [initalLoad, setInitailLoad] = useState(true)
  useEffect(()=> {
    const player = getCookie(params.puuid)
    const parsedPlayer = JSON.parse(player)
    const getData = async (name:string, tag:string, region = 'na')=> {
      const response = await fetch(`https://api.henrikdev.xyz/valorant/v3/matches/${region}/${name}/${tag}`)
      const parsedResponse = await response.json()
      saveData(parsedResponse.data)
      return parsedResponse
    }
    const saveData = (data:Array<object>)=> {
      const nextUserGameData = data.map((gameData)=>{
        const gameDuration = gameData.metadata.game_length
        const map = gameData.metadata.map
        const gameDate = gameData.metadata.game_start_patched
        const currentPlayer = gameData.players.all_players.find((gamePlayer) => gamePlayer.puuid === params.puuid )
        const agent = currentPlayer.character
        const agentSrc = currentPlayer.assets.agent.small
        const playersImage = currentPlayer.assets.card.large
        const {kills, deaths, assists} = currentPlayer.stats
        const KDA = ((kills + assists) / deaths).toFixed(2)
        const playersNick = parsedPlayer.gameName
        const hasWon = gameData.teams[currentPlayer.team.toLowerCase()]?.has_won
        return {
        map,
        hasWon,
        KDA,
        agent,
        agentSrc,
        gameDate,
        gameDuration,
        playersImage,
        playersNick
        }
      })
      setUsersGameData(nextUserGameData)
      const [first, ...rest] = nextUserGameData
      setActivePlayer({playersImage: first.playersImage, playersNickname: first.playersNick})
      setInitailLoad(false)
    }
    getData(parsedPlayer.gameName, parsedPlayer.tagLine)
  },[params])

  return (
  <div>
    <Group className={classes.groupStyles}>
      <Avatar size="xl" src={activePlayer.playersImage}/>
      <Text c="white" size="xl" transform="uppercase">{activePlayer.playersNickname} Match History:</Text>
    </Group>
    {initalLoad ?  <Flex justify="center" align="center"><Loader/></Flex> :
    <ul>
    {usersGameData.map(({map,
      hasWon,
      KDA,
      agent,
      agentSrc,
      gameDate,
      gameDuration}, idx)=>(
      <li key={idx}>
        <MatchCard 
          map={map} 
          hasWon={hasWon} 
          KDA={KDA}
          agent={agent} 
          agentSrc={agentSrc} 
          gameDate={gameDate} 
          gameDuration={gameDuration} 
          />
      </li>
    ))}
  </ul>
    }
    
  </div>
  )
}

/* Map played
If the player’s team lost/win
Player’s KDA
Agent used by player
Date and time at which the match started
Match duration
Bonus (you may or may not add this):
Player’s card (image)
Agent’s image
 */