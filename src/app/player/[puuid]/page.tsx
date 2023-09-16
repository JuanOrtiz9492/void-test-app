"use client"
import { getCookie } from "@/utils"
import {useState, useEffect} from 'react'
export default function Player ({ params }: { params: { puuid: string } }) {
  const [activePlayer, setActivePlayer] = useState({})
  useEffect(()=> {
    console.log(params)
    const player = getCookie(params.puuid)
    const parsedPlayer = JSON.parse(player)
    setActivePlayer(parsedPlayer)
    const getData = (name:string, tag:string, region = 'na')=> {
      fetch(`https://api.henrikdev.xyz/valorant/v3/matches/${region}/${name}/${tag}`).then(res => res.json()).then(data => {
        console.log(data)
      })
    }
    getData(parsedPlayer.gameName, parsedPlayer.tagLine)
  },[params])
  return <div>My Post: {JSON.stringify(activePlayer)}</div>
}