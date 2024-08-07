import { configureStore } from "@reduxjs/toolkit";
import { albumReducer } from "./albumReducer";
import { imageReducer } from "./imageReducer";

//Configuring store
const store = configureStore({ reducer: { albumReducer, imageReducer } });

export default store;
