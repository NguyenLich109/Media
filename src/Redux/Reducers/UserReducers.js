import {
  ADD_USER_ERROR,
  ADD_USER_RESET,
  ADD_USER_SUCCESS,
  ADD_USER_REQUEST,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_RESET,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
} from "../Container/UseContainer.js";

export const addUserReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER_REQUEST:
      return {
        loading: true,
      };
    case ADD_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        success: true,
      };
    case ADD_USER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const updateUserReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        success: true,
      };
    case UPDATE_USER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const getUserReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        success: true,
      };
    case GET_USER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllUserReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        listAllUsers: action.payload,
        success: true,
      };
    case GET_USERS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
