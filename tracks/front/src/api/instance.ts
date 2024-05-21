import axios from "axios";
import {apiUrl} from "../constants/constants.ts";
import {RootState} from "../store/store.ts";
import {Store} from "@reduxjs/toolkit";


type AppStore = Store<RootState>
const instance = axios.create({
    baseURL:apiUrl
})
let appStore:AppStore;
export const appStoreInject = (store:AppStore) => {

    appStore = store
}


instance.interceptors.request.use((config) => {
    try {
        config.headers.Authorization = appStore.getState().user.userInfo?.token


    } catch (e) {
        // sad
    }
    return config
})
export default instance;