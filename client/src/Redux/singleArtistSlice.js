const { createSlice } = require("@reduxjs/toolkit");

const singleArtistSlice = createSlice({
    name: 'singleArtist',
    initialState: {
        singleArtist: {},
    },
    reducers: {
        setSingleArtist: (state, action) => {
            state.singleArtist = action.payload
        },
    },
})
export const { setSingleArtist } = singleArtistSlice.actions
export default singleArtistSlice.reducer