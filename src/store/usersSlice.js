import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    usersAdded(state, action) {
      state.users = action.payload
    },
  },
})

export const { usersAdded } = usersSlice.actions
export default usersSlice.reducer