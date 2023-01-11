import {
  ADD_FRIENDS_ERROR,
  ADD_FRIENDS_REQUEST,
  ADD_FRIENDS_RESET,
  ADD_FRIENDS_SUCCESS,
  GET_FRIENDS_ERROR,
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_NOTI_FRIENDS_ERROR,
  GET_NOTI_FRIENDS_REQUEST,
  GET_NOTI_FRIENDS_SUCCESS,
  UPDATE_FRIENDS_ERROR,
  UPDATE_FRIENDS_REQUEST,
  UPDATE_FRIENDS_RESET,
  UPDATE_FRIENDS_SUCCESS,
} from "../Container/FriendsContainer";

//UPDATE COMMENT
export const addFriendReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FRIENDS_REQUEST:
      return {
        loading: true,
      };
    case ADD_FRIENDS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_FRIENDS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_FRIENDS_RESET:
      return {};
    default:
      return state;
  }
};

export const getFriendReducer = (state = [], action) => {
  switch (action.type) {
    case GET_FRIENDS_REQUEST:
      return {
        loading: true,
      };
    case GET_FRIENDS_SUCCESS:
      return {
        loading: false,
        success: true,
        getFriends: action.payload,
      };
    case GET_FRIENDS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getNotiFriendReducer = (state = [], action) => {
  switch (action.type) {
    case GET_NOTI_FRIENDS_REQUEST:
      return {
        loading: true,
      };
    case GET_NOTI_FRIENDS_SUCCESS:
      return {
        loading: false,
        success: true,
        notiFriends: action.payload,
      };
    case GET_NOTI_FRIENDS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateFriendReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_FRIENDS_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_FRIENDS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_FRIENDS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_FRIENDS_RESET:
      return {};
    default:
      return state;
  }
};
