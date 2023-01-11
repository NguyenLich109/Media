import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  addUserReducer,
  updateUserReducer,
  getUserReducer,
  getAllUserReducer,
} from "./Reducers/UserReducers.js";
import { modalDelete } from "./Reducers/ModalReducer";
import {
  addFriendReducer,
  getFriendReducer,
  getNotiFriendReducer,
  updateFriendReducer,
} from "./Reducers/FriendsReducer";
import {
  addContentPostReducer,
  getContentPostReducer,
  updateContentPostReducer,
  updateCommentReducer,
  updateCommentChildReducer,
  getCommmentReducer,
} from "./Reducers/ContentPostReducer";
import {
  addZoomReducer,
  getZoomReducer,
  updateZoomReducer,
  deleteZoomReducer,
} from "./Reducers/MessengerReducer";
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
  getCommmentReducer,
  updateContentPostReducer,
  updateCommentReducer,
  updateCommentChild: updateCommentChildReducer,
  addFriendReducer,
  getFriendReducer,
  getNotiFriend: getNotiFriendReducer,
  updateFriend: updateFriendReducer,
  addZoomReducer,
  getZoomReducer,
  updateZoomReducer,
  deleteZoomReducer,
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
