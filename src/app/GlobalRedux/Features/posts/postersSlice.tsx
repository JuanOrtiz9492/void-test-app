"use client";
import { PostInterface } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  activePostList: [] as PostInterface[],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setActivePostList: (state, action)=> {
      state.activePostList = action.payload
    }
  },
});

export const { setActivePostList } = postSlice.actions

export default postSlice.reducer;