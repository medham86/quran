import { configureStore } from "@reduxjs/toolkit";
import quran from "./reducers/quran";

export const store = configureStore({
    reducer : {
       quran
    }
})