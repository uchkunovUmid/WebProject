import {musicStore} from "../features/music.ts";
import userSlice from "../features/user.ts";
import {historyStore} from "../features/history.ts";
import {combineReducers} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    music:musicStore,
    user: userSlice.reducer,
    history:historyStore
});
