import { createSlice } from "@reduxjs/toolkit";

//Initial State Object
const initialState = {
  albums: [],
  isAlbumsLoading: false,
};

const alubmSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    createAlbum: (state, action) => {
      state.albums.push(action.payload);
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    handleLoading: (state, action) => {
      state.isAlbumsLoading = action.payload;
    },
  },
  // extraReducers: {},
});

export const albumReducer = alubmSlice.reducer;
export const albumSelector = (state) => state.albumReducer;
export const { setAlbums, createAlbum } = alubmSlice.actions;
