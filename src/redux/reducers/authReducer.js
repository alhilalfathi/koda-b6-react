import { createSlice } from "@reduxjs/toolkit"

const savedUser = localStorage.getItem("user")
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null
}

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    }
  }
})

export const { login, logout } = authReducer.actions
export default authReducer.reducer
