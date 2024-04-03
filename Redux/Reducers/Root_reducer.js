import  {combineReducers} from "redux";
import userAuthReducer from "../auth/reducer";
export  const combinedReducer = combineReducers({
    userAuthReducer
});