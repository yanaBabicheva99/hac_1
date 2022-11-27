import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {userAPI} from "../services/userService";
import {authAPI} from "../services/authService";
import {testAPI} from '../services/testService';
import tokenReducer from "../services/tokenService";
import {taskAPI} from "../services/taskService";


const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [testAPI.reducerPath]: testAPI.reducer,
    [taskAPI.reducerPath]: taskAPI.reducer,
    token: tokenReducer
});

export const createStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([userAPI.middleware, authAPI.middleware, testAPI.middleware, taskAPI.middleware])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
