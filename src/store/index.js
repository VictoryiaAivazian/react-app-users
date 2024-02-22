import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import todosReducer from './todosSlice'
import loadingReducer from './loadingSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    todos: todosReducer,
    loading: loadingReducer,
  },
})