"use client"
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { delay } from '@/utils'
import { createStyles, Loader, Flex } from '@mantine/core';
import PlayerRankBoard from '@/components/playerRankBoard';
import { PlayerCardInterface } from '@/interfaces/intex';
import PlayerCard from '@/components/playerCard';


const useStyles = createStyles((theme) => ({
  itemList: {
    marginBottom: '5px'
  },

  list: {
    width: '50vw',
    margin: '0 auto'
  },
}));

export default function Home() {
  const [fullLeaderBoard, setFullLeaderBoard] = useState([])
  const [leaderboard, setLeaderBoard] = useState<PlayerCardInterface[]>([]);
  const [firstLoad, setFirstLoad] = useState(true)
  const [loadMore, setLoadMore] = useState(false)
  const { classes } = useStyles();
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
    <Flex direction="column">
      <PlayerRankBoard playersList={leaderboard} isLoading={firstLoad}/>
      { loadMore ? <Loader/> : null}
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