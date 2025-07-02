import { configureStore } from "@reduxjs/toolkit";
import getCityReducer from "./getCitySlice";
import choiceReducer from "./choiceSlice";
import getTrainsReducer from "./getTrainsSlice";
import filterReducer from "./getFilterSlice";

export const store = configureStore({
  reducer: {
    city: getCityReducer,
    choice: choiceReducer,
    trains: getTrainsReducer,
    filters: filterReducer
  }
}); 