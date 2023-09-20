"use client"

import { useEffect, useState } from "react"
import { PostInterface } from "@/interfaces"
import { PostCard } from "../postCard"
import { Flex } from "@mantine/core"
import { useSelector } from 'react-redux/es/exports';
import { RootState } from "@/app/GlobalRedux/store"

export default function Post({ params }: { params: { id: string } }){
  const [post, setPost] = useState<PostInterface>({authorName:'', authorAvatar:'', postImage:'', postText:'', id:''})
  const activePostList = useSelector((state: RootState) => state.posts.activePostList)
  
  useEffect(()=>{
    const selectedPost = activePostList.find(post => post.id === params.id)
    setPost(selectedPost as PostInterface)
  },[])

  return(
    <Flex justify="center">
      <PostCard authorName={post?.authorName} authorAvatar={post?.authorAvatar} postImage={post?.postImage} postText={post?.postText} id={post?.id}/>
    </Flex>
  )
} 