import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
  access_token: string;
}

const initialState: AuthState = {
  access_token: Cookies.get('access_token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.access_token = action.payload.access_token;
      Cookies.set('access_token', action.payload.access_token,  { expires: 7 });
    },
    logout: (state) => {
      Cookies.remove('access_token');
      state.access_token = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;