"use client"
import { useEffect, useState } from "react"
import { PostCard } from "./postCard"
import { PostInterface } from "@/interfaces"
import { Flex, Loader } from "@mantine/core"
import { useWindowEvent } from "@mantine/hooks"


const BASE_API = 'https://6396aee2a68e43e41808fa18.mockapi.io/api/posts?p=$&l=5'
export default function Page() {
  const [initialLoad, setInitialLoad] = useState(true)
  const [postList, setPostList] = useState<PostInterface[]>([])
  const [loadMore, setLoadMore] = useState(false)

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setLoadMore(true)
    }
  }
  useWindowEvent('scroll', handleScroll);

  async function getData(page='1') {
    const res = await fetch(BASE_API.replace('$',page))
    return await res.json()
  }

  useEffect(()=>{
    async function saveData () {
      const nextPosts = await getData()
      setPostList(nextPosts)
      setInitialLoad(false)
    }
    saveData()
  },[])

  useEffect(()=> {
    async function saveData() {
      const nextPage = Math.floor(postList.length / 5) + 1
      const nextPosts = await getData(nextPage.toString())
      console.log(postList)
      console.log(nextPosts)
      setPostList([...postList, ...nextPosts])
      setLoadMore(false)
    }
    if(loadMore){
      saveData()
    }
  },[loadMore])
 
  return <div>
    { initialLoad ? <Loader/> :
    <Flex justify="center" align="center">
      <ul>
        {postList.map(({authorName, authorAvatar, postText, postImage, id})=>(
        <li key={id}>
          <PostCard authorName={authorName} authorAvatar={authorAvatar} postText={postText} postImage={postImage} id={id}/>
        </li>
        ))}
      </ul>
    </Flex>
    }
    
  </div>

}