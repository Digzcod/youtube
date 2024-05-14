import {createSlice} from "@reduxjs/toolkit"

const appMenuSlice = createSlice({
    name: "appMenu",
    initialState: {
        isMenuOpen: true
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen
        },
        closeMenu: (state) => {
            state.isMenuOpen = false
        }
    }
})

export const {toggleMenu, closeMenu} = appMenuSlice.actions
export default appMenuSlice.reducer