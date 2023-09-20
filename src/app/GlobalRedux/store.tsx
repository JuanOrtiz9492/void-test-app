
"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import postsReducer from './Features/posts/postersSlice';


export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  posts: postsReducer,
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,
 });