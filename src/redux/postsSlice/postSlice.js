// redux/postsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    page: 1,
    loading: false,
    error: null,
    hasMore: true,
    renderedPage: 0,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setRenderedPage: (state, action) => {
      state.renderedPage = action.payload;
    },
  },
});

export const { setPosts, addPosts, setPage, setLoading, setError, setHasMore, setRenderedPage } = postsSlice.actions;

export default postsSlice.reducer;
