import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  error: string;
  info: string;
}

const initialState: AuthState = {
  error: '',
  info: '',
};

const errorInfoSlice = createSlice({
  name: 'errorInfo',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload
    },
    setInfo: (state, action) => {
      state.info = action.payload
    },
  },
});

export const { setError, setInfo } = errorInfoSlice.actions;
export default errorInfoSlice.reducer;