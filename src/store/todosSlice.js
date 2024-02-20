import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

      if(!response.ok) {
        throw new Error('Server error')
      }

      const result = await response.json()
      return result

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, actions) => {
      state.loading = true
    })
    builder.addCase(fetchTodos.fulfilled, (state, actions) => {
      state.todos = actions.payload
      state.loading = false
    })
    builder.addCase(fetchTodos.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export const { setTodos } = todosSlice.actions
export default todosSlice.reducer