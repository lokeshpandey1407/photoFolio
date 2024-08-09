import { configureStore } from "@reduxjs/toolkit";
import { albumReducer } from "./albumReducer";
import { imageReducer } from "./imageReducer";
import { authReducer } from "./authReducer";

//Configuring store
const store = configureStore({ reducer: { albumReducer, imageReducer, authReducer } });

export default store;
