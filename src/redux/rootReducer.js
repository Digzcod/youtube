import { combineReducers } from "@reduxjs/toolkit"
import appMenuSlice from "./features/appMenuSlice"
import cacheSearchResultSlice from "./features/cacheSearchResultSlice"
import chatSlice from "./features/chatSlice"

const rootReducer = combineReducers({
appMenu: appMenuSlice,
cacheSearchResults: cacheSearchResultSlice,
liveChatMessage: chatSlice,
})

export default rootReducer