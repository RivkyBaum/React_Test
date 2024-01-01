import { createStore } from "redux";
import { dataReducer } from "./dataReduser";

export const myStore = createStore(dataReducer)
