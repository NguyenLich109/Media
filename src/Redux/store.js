import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  addUserReducer,
  updateUserReducer,
  getUserReducer,
  getAllUserReducer,
} from "./Reducers/UserReducers.js";
import { modalDelete } from "./Reducers/ModalReducer";
import {
  addContentPostReducer,
  getContentPostReducer,
} from "./Reducers/ContentPostReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const listReducer = combineReducers({
  addUserReducer,
  updateUserReducer,
  modalDelete,
  getUserReducer,
  getAllUserReducer,
  addContent: addContentPostReducer,
  getContent: getContentPostReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  addUserReducer: {
    users: userInfoFromLocalStorage,
    loading: false,
  },
};

const store = createStore(
  listReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
