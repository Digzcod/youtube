import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name: "chat message",
    initialState: {
        messages: [],
        showChat: false
    },
    reducers: {
        addMessage: (state, actions) => {
            if(state.messages.length === 250) {
                state.messages.shift()
            }
            state.messages.push(actions.payload)
        }
    },
})

export const { addMessage } = chatSlice.actions
export default chatSlice.reducer;
