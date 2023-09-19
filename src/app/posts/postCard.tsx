"use client"
import { Avatar, Group, createStyles, Text, Flex } from '@mantine/core';
import { PostInterface } from '@/interfaces';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  postContainer: {
    backgroundColor:'#575757',
    border: '3px solid #171717',
    borderRadius: '20px',
    padding: '1.5em 2em',
    marginBottom: '2em',
    width: '55vw'
  },
  postHeader: {
    width: 'max-content',
    marginBottom: '0.8em'
  },
  textStyles: {
    color: '#E8E8E8'
  },
  imgStyles: {
    marginBottom: '0.8em',
    width: '30vw'
  },
  imgLink:{
    alignSelf: 'center',
    width:'max-content'
  }
}));

export function PostCard ({authorAvatar, authorName, postImage, postText, id}:PostInterface) {
  const { classes } = useStyles();
  return(
    <Flex className={classes.postContainer} direction="column">
      <Group className={classes.postHeader}>
        <Avatar src={authorAvatar} size="lg"/>
        <Text className={classes.textStyles}>{authorName}</Text>
      </Group>
      <Link href={`/posts/${id}`} className={classes.imgLink}>
        <img src={postImage} alt={postText} className={classes.imgStyles}></img>
      </Link>
      <Link href={`/posts/${id}`}>
        <Text className={classes.textStyles}>{postText}</Text>
      </Link>
      
    </Flex>
  )
}