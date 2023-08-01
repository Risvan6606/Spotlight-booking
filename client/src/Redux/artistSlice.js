const { createSlice } = require("@reduxjs/toolkit");

const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artist: []
    },
    reducers: {
        setArtist: (state, action) => {
            state.artist = action.payload
        }
    }
})
export const { setArtist } = artistSlice.actions
export default artistSlice.reducer