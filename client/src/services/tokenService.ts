import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDto, InfoRefresh } from "../types";

import { DispatchType, InitStateToken, StateType } from "../store/storeTypes";

const initialState: InitStateToken = {
  tokenValue: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  role: localStorage.getItem('role') || null
};

const authSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    created(state, action: PayloadAction<InfoRefresh<UserDto>>) {
      // if (!state.userId) {
      //     localStorage.setItem('token', action.payload.accessToken);
      //     localStorage.setItem('userId', action.payload.user.id);
      //
      //     state.tokenValue = action.payload.accessToken;
      //     state.userId = action.payload.user.id;
      // } else {
      //     localStorage.setItem('token', action.payload.accessToken);
      //     state.tokenValue = action.payload.accessToken;
      // }

      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("userId", action.payload.user.id);
      localStorage.setItem('role', action.payload.user.role)

      state.tokenValue = action.payload.accessToken;
      state.userId = action.payload.user.id;
      state.role = action.payload.user.role;
    },
    removed(state) {
      localStorage.removeItem("token");
      state.tokenValue = null;
    },
  },
});

const { actions, reducer: tokenReducer } = authSlice;
const { created, removed } = actions;

export const createToken =
  (data: InfoRefresh<UserDto>) => (dispatch: DispatchType) => {
    dispatch(created(data));
  };
export const removeToken = () => (dispatch: DispatchType) => {
  dispatch(removed());
};

export const getToken = () => (state: StateType) => state.token.tokenValue;
export const getUser = () => (state: StateType) => state.token.userId;
export const getRole = () => (state: StateType) => state.token.role;

export default tokenReducer;
