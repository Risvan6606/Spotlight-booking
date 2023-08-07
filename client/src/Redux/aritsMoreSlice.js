const { createSlice } = require("@reduxjs/toolkit");

const artistMoreSlice = createSlice({
    name: 'artistMore',
    initialState: {
        artistMore: []
    },
    reducers: {
        setArtistMore: (state, action) => {
            state.artistMore = action.payload
        }
    }
})
export const { setArtistMore } = artistMoreSlice.actions
export default artistMoreSlice.reducer