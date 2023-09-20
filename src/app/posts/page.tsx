"use client"
import { useEffect, useState } from "react"
import { PostCard } from "./postCard"
import { PostInterface } from "@/interfaces"
import { createStyles, Flex, Loader, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useWindowEvent, useDebouncedState } from "@mantine/hooks"
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { setActivePostList } from '../GlobalRedux/Features/posts/postersSlice';
import { RootState } from "../GlobalRedux/store"


const useStyles = createStyles(() => ({
  inputStyles:{
    width: '80%'
  },
  searchContainer: {
    marginTop: '3em',
    marginBottom: '3em'
  }
}));

const BASE_API = 'https://6396aee2a68e43e41808fa18.mockapi.io/api/posts'
export default function Page() {
  const [initialLoad, setInitialLoad] = useState(true)
  const [postList, setPostList] = useState<PostInterface[]>([])
  const [filteredPosts, setFilteredPosts] = useState<PostInterface[]>([])
  const [loadMore, setLoadMore] = useDebouncedState(false, 50)
  const [searchValue, setSearchValue] = useDebouncedState('', 500)
  const { classes } = useStyles();

  const activePostList = useSelector((state: RootState) => state.posts.activePostList)
  const dispatch = useDispatch();

  function handleScroll() {
    if (
      (window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100) && searchValue.length === 0
    ) {
      setLoadMore(true)
    }
  }
  useWindowEvent('scroll', handleScroll);

  async function getData(page='1') {
    const res = await fetch(`${BASE_API}?p=${page}&l=5`)
    return await res.json()
  }

  async function findPost(nameOrTopic:string) {
    const byAuthor = await fetch(`${BASE_API}?authorName=${nameOrTopic}`)
    const byPost = await fetch(`${BASE_API}?postText=${nameOrTopic}`)
    const byAuthorList = await byAuthor.json()
    const byPostList = await byPost.json()
    function removeDuplicateObjects(arr:PostInterface[]) {
      const seen = new Set();
      return arr.filter(obj => {
        const objString = JSON.stringify(obj);
        if (!seen.has(objString)) {
          seen.add(objString);
          return true;
        }
        return false;
      });
    }
    return removeDuplicateObjects([...byAuthorList, ...byPostList])
  }

  useEffect(()=>{
    async function saveData () {
      const nextPosts = await getData()
      setPostList(nextPosts)
      dispatch(setActivePostList(nextPosts))
      setInitialLoad(false)
    }
    saveData()
  },[])

  useEffect(()=> {
    async function saveData() {
      const nextPage = Math.floor(postList.length / 5) + 1
      const nextPosts = await getData(nextPage.toString())
      setPostList([...postList, ...nextPosts])
      dispatch(setActivePostList([...postList, ...nextPosts]))
      setLoadMore(false)
    }
    if(loadMore){
      saveData()
    }
  },[loadMore])

  useEffect(()=>{
    async function savePost() {
      const nextFilteredPosts = await findPost(searchValue)
      setFilteredPosts(nextFilteredPosts)
      dispatch(setActivePostList(nextFilteredPosts))
    }
    if(searchValue.length > 0){
      savePost()
    } else {
      dispatch(setActivePostList(postList))
    }
  },[searchValue])

  function renderList () {
    let data = postList
    if(filteredPosts.length > 0 && searchValue.length > 0) {
      data = filteredPosts
    }
    return (
      <ul>
      {activePostList.map(({authorName, authorAvatar, postText, postImage, id})=>(
      <li key={id}>
        <PostCard authorName={authorName} authorAvatar={authorAvatar} postText={postText} postImage={postImage} id={id}/>
      </li>
      ))}
      </ul>
    )
    
  }

  return <div>
    <Flex justify="center" className={classes.searchContainer}>
      <TextInput
        className={classes.inputStyles}
        radius="xl"
        size="md"
        placeholder="Search questions"
        rightSectionWidth={50}
        rightSection={<IconSearch style={{ width: '1.5rem', height: '1.5rem', color:'#9c9c9c' }}/>}
        defaultValue={searchValue}
        onChange={(e)=>setSearchValue(e.target.value)}
      />
    </Flex>
    { initialLoad ? <Loader/> :
    <Flex justify="center" align="center">
      {renderList() }
    </Flex>
    }
    
  </div>

}