import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: false,
  },
  reducers: { 
    setPageLoader: (state, action) => {
      state.loading = action.payload
    }
  },
})

export const { setPageLoader } = loadingSlice.actions
export default loadingSlice.reducer