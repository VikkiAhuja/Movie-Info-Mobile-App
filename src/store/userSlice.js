import { createSlice } from '@reduxjs/toolkit'
import { showToast } from '../utils/ToastUtils'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    users: []
  },
  reducers: {
    login: (state, { payload }) => {
      const { userName, password } = payload
      const userIndex = state.users.findIndex(user => user.userName?.toLowerCase() === userName.toLowerCase() && user.password?.toLowerCase() === password.toLowerCase())
      if (userIndex > -1) {
        state.userData = state.users[userIndex]
        showToast("Logged in successfully.")
      } else {
        state.userData = null
        showToast("Account not found, ")
      }
    },
    signup: (state, { payload }) => {
      const newUser = {
        id: state.users.length,
        ...payload,
      }
      state.userData = newUser
      state.users = [
        ...state.users,
        newUser
      ]
      showToast("Account created successfully.")
    },
    logout: (state) => {
      state.userData = null
      showToast("Logged out successfully.")
    }
  }
})

export const { login, signup, logout } = userSlice.actions
export default userSlice.reducer