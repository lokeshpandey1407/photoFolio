import { createSlice } from "@reduxjs/toolkit";

//Initial State Object
const initialState = {
  images: [],
  albumName: "",
  isImagesLoading: false,
  isImagesUploading: false,
  isImageDeleting: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push(...action.payload);
    },
    setAlbum: (state, action) => {
      state.albumName = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    deleteImage: (state, action) => {
      state.images = state.images.filter(
        (image) => image._id !== action.payload._id
      );
    },
    handleLoading: (state, action) => {
      state.isImagesLoading = action.payload;
    },
    handleUploadLoading: (state, action) => {
      state.isImagesUploading = action.payload;
    },
    handleDeleteLoading: (state, action) => {
      state.isImageDeleting = action.payload;
    },
  },
  // extraReducers: {},
});

export const imageReducer = imageSlice.reducer;
export const imageSelector = (state) => state.imageReducer;
export const {
  setImages,
  addImage,
  setAlbum,
  deleteImage,
  handleLoading,
  handleUploadLoading,
  handleDeleteLoading,
} = imageSlice.actions;
