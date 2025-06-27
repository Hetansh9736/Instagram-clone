import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
     setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addPost, setPosts, setLoading } = postSlice.actions;
export default postSlice.reducer;
