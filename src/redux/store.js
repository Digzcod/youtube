import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const ytStore = configureStore({
    reducer: rootReducer,
})

export default ytStore;