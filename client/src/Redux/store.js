import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "@reduxjs/toolkit";
import alertSlice from "./alertSlice";
import userSlice from "./userSlice";
import artistSlice from "./artistSlice";
import bannerSlice from "./bannerSlice";

// const rootReducer = combineReducers({
//     alerts: alertSlice
// });
const store = configureStore({
    reducer: {
        alerts: alertSlice,
        user: userSlice,
        artist: artistSlice,
        banner: bannerSlice
    }
})
export default store;