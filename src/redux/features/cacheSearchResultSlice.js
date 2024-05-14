import { createSlice } from "@reduxjs/toolkit";


const cacheSearchResultSlice = createSlice({
    name: "search",
    initialState: {},
    reducers: {
        handleCacheSearchResults: (state, action) => {
            /**
             * iphone: ["iphone 12, iphone 13, iphone: pro max15"]
            */
            state = Object.assign(state, action.payload)
        }
    }
})


export const { handleCacheSearchResults } = cacheSearchResultSlice.actions
export default cacheSearchResultSlice.reducer 