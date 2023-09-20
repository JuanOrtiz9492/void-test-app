"use client"

import { useEffect, useState } from "react"
import { PostInterface } from "@/interfaces"
import { PostCard } from "../postCard"
import { Flex, Loader } from "@mantine/core"

export default function Post({ params }: { params: { id: string } }){
  const [post, setPost] = useState<PostInterface>({authorName:'', authorAvatar:'', postImage:'', postText:'', id:''})
  const [initialLoad, setInitailLoad] = useState(true)
  useEffect(()=>{
    async function loadPost() {
      const res = await fetch(`https://6396aee2a68e43e41808fa18.mockapi.io/api/posts/${params.id}`)
      const parsedPost = await res.json()
      setPost(parsedPost)
      setInitailLoad(false)
    }
    loadPost()
  },[])
  return(
    <Flex justify="center">
      {initialLoad ? 
      <Loader/>
      :
      <PostCard authorName={post?.authorName} authorAvatar={post?.authorAvatar} postImage={post?.postImage} postText={post?.postText} id={post?.id}/>
      }
    </Flex>
  )
} 