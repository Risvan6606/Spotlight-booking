import { createSlice } from '@reduxjs/toolkit'
const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
        banner: [],
    },
    reducers: {
        setbanner: (state, action) => {
            state.banner = action.payload;
        }
    }
})
export const { setbanner } = bannerSlice.actions
export default bannerSlice.reducer