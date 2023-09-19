"use client"
import { createStyles,Grid, Text, Skeleton } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useRouter } from 'next/navigation'
import { PlayerCardInterface } from '@/interfaces';
import PlayerCard from './playerCard';
import { setCookie } from '@/utils';

const useStyles = createStyles((theme) => ({
  itemList: {
    marginBottom: '0.8em',
    border: '1px solid white',
    borderRadius: '5px',
    padding: '0.8em 0.5em'
  },
  tableHeader:{
    borderBottom: '2px solid white',
    padding: '0.8em 0.5em',
    marginBottom: '0.8em'
  },
  tableHeaderText:{
    color:'white'
  },
  hovered: {
    cursor: 'pointer'
  }
}));

export default function PlayerRankBoard ({playersList, isLoading=false}:{playersList:PlayerCardInterface[], isLoading:boolean}){
  const router = useRouter()
  const { classes } = useStyles();
  const emptyArr = new Array(10).fill('')
  const navigateTo = (id:string) => {
    const player = playersList.find((player)=> player.puuid === id)
    setCookie(player?.puuid, JSON.stringify(player))
    router.push(`player/${player?.puuid}`)

  }
  return (
    <>
      <div className={classes.tableHeader}>
        <Grid>
          <Grid.Col span={1}><Text transform='uppercase' className={classes.tableHeaderText}>Position</Text></Grid.Col>
          <Grid.Col span={1}><Text transform='uppercase' className={classes.tableHeaderText}>Avatar</Text></Grid.Col>
          <Grid.Col span={3}><Text transform='uppercase' className={classes.tableHeaderText}>Nickname</Text></Grid.Col>
          <Grid.Col span={1}><Text transform='uppercase' className={classes.tableHeaderText}>Raiting</Text></Grid.Col>
          <Grid.Col span={1}><Text transform='uppercase' className={classes.tableHeaderText}>Victories</Text></Grid.Col>
          <Grid.Col span={2}><Text transform='uppercase' className={classes.tableHeaderText}>Status</Text></Grid.Col>
        </Grid>
      </div>
      {isLoading ?
      <ul>
        {emptyArr.map((val, index)=>(
          <li key={index}>
            <Grid>
              <Grid.Col span={1}><Skeleton height="2em"/></Grid.Col>
              <Grid.Col span={1}><Skeleton height="2em"circle/></Grid.Col>
              <Grid.Col span={3}><Skeleton height="2em"/></Grid.Col>
              <Grid.Col span={1}><Skeleton height="2em"/></Grid.Col>
              <Grid.Col span={1}><Skeleton height="2em"/></Grid.Col>
              <Grid.Col span={2}><Skeleton height="2em"/></Grid.Col>
          </Grid>
          </li>

        ))}
      </ul>
      :
      <ul>
      {playersList.map((player:any)=>(
          <li className={classes.itemList} key={player.leaderboardRank}>
            <div className={classes.hovered} onClick={()=> navigateTo(player.puuid)}>
              <PlayerCard
              rankPosition={player.leaderboardRank}
              nickName={player.gameName}
              raiting={player.rankedRating}
              wins={player.numberOfWins}
              banStatus={player.IsBanned}
              />
            </div>
            
          </li> 
        ))}
      </ul>}
    </>
  )
}