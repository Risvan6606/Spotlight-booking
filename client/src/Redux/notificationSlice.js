import { createSlice } from '@reduxjs/toolkit'
const notificationSlilce = createSlice({
    name: 'notification',
    initialState: {
        notification: [],
    },
    reducers: {
        setNotifications: (state, action) => {
            state.notification = action.payload;
        }
    }
})
export const { setNotifications } = notificationSlilce.actions
export default notificationSlilce.reducer