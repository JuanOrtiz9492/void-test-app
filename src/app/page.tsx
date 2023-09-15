"use client"
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { delay } from '@/utils'
import { createStyles, Avatar, Text, Group } from '@mantine/core';


export default function Home() {
  const [fullLeaderBoard, setFullLeaderBoard] = useState([])
  const [leaderboard, setLeaderBoard] = useState([] as (never[] | object[]))
  const [loadMore, setLoadMore] = useState(false)
  useEffect(()=> {
    const getData = ()=> {
      fetch('https://api.henrikdev.xyz/valorant/v2/leaderboard/na').then(res => res.json()).then(data => {
        //endpoint retrieves 10k players, seems is not returning by 1k as expected
        setFullLeaderBoard(data.players)
        setLeaderBoard(data.players.slice(0,1000))
      })
    }
    getData()
  },[])

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setLoadMore(true)
      }
    }
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
  <ul>
    {leaderboard.map((player:any)=>(
      <li key={player.leaderboardRank}>
        <Group noWrap>
        <Avatar radius="md" />
        <div>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        {player.leaderboardRank}
        </Text>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        {player.gameName}
        </Text>
        </div>
        </Group>
      </li> 
    ))}
  </ul>
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