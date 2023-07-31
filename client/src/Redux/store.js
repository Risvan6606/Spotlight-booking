import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "@reduxjs/toolkit";
import alertSlice from "./alertSlice";
import userSlice from "./userSlice";

// const rootReducer = combineReducers({
//     alerts: alertSlice
// });
const store = configureStore({
    reducer: {
        alerts: alertSlice,
        user: userSlice
    }
})
export default store;