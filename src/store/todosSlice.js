import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
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

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async(todo, { rejectWithValue }) => {

    try {
      const response = await fetch('https://jsonplaceholder.wtypicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(todo)
      })
  
      if(!response.ok) {
        throw new Error('Can\t add todo. Server error')
      }

      const result = await response.json()
      return result

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true))

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })

      dispatch(removeTodo(id))

      if(!response.ok) {
        throw new Error('Can\'t delete. Server error')
      }

    } catch (error) {
      return rejectWithValue(error.message)
    } finally {
      dispatch(setLoading(false))
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
  reducers: { 
    removeTodo: (state, action) => {
      const id = action.payload
      state.todos = state.todos.filter(todo => todo.id !== id)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    // fetch all todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true
    });
    builder.addCase(fetchTodos.fulfilled, (state, actions) => {
      state.loading = false
      state.todos = actions.payload
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.loading = false
      state.error = true
    });
    // add new todo
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true
    });
    builder.addCase(addTodo.fulfilled, (state, actions) => {
      state.loading = false
      state.todos.push(actions.payload)
    });
    builder.addCase(addTodo.rejected, (state) => {
      state.loading = false
      state.error = true
    });
  }
})

export const { removeTodo, setLoading } = todosSlice.actions
export default todosSlice.reducer