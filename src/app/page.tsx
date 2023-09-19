"use client"
import { useEffect, useState } from 'react'
import { delay } from '@/utils'
import { Loader, Flex } from '@mantine/core';
import PlayerRankBoard from '@/components/playerRankBoard';
import { PlayerCardInterface } from '@/interfaces';
import { useWindowEvent } from '@mantine/hooks';

export default function Home() {
  const [fullLeaderBoard, setFullLeaderBoard] = useState([])
  const [leaderboard, setLeaderBoard] = useState<PlayerCardInterface[]>([]);
  const [firstLoad, setFirstLoad] = useState(true)
  const [loadMore, setLoadMore] = useState(false)
  useEffect(()=> {
    const getData = ()=> {
      fetch('https://api.henrikdev.xyz/valorant/v2/leaderboard/na').then(res => res.json()).then(data => {
        //endpoint retrieves 10k players, seems is not returning by 1k as expected
        setFullLeaderBoard(data.players)
        setLeaderBoard(data.players.slice(0,1000))
        setFirstLoad(false)
      })
    }
    getData()
  },[])

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setLoadMore(true)
    }
  }
  useWindowEvent('scroll', handleScroll)

  useEffect(()=>{
    if(loadMore){
      delay().then(()=>{
        const itemCount = leaderboard.length
        setLeaderBoard([...leaderboard, ...fullLeaderBoard.slice(itemCount, itemCount+1000)])
        setLoadMore(false)
      })
    }
  },[loadMore])
 
  return (
    <Flex direction="column">
      <PlayerRankBoard playersList={leaderboard} isLoading={firstLoad}/>
        { loadMore ? 
        <Flex
          justify="center"
          align="center"
          direction="row"
        >
          <Loader/>
        </Flex> 
        :
        null}
      
    </Flex>
  )
}

/* IsAnonymized: false
IsBanned: false
PlayerCardID: "38defae8-4b79-f5cc-09c1-ceb5e109c4c9"
TitleID: "129190d4-42fa-4e79-75e3-ffb5679d1dc2"
competitiveTier: 27
gameName: "M80 Zander"
leaderboardRank: 1
numberOfWins:92
puuid: "46831b96-eec3-528b-85b2-7c18cfce1fbe"
rankedRating: 1101
tagLine: "swag" */