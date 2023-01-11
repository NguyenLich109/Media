import {
  ADD_MEESENGER_ERROR,
  ADD_MEESENGER_REQUEST,
  ADD_MEESENGER_RESET,
  ADD_MEESENGER_SUCCESS,
  GET_MEESENGER_ERROR,
  GET_MEESENGER_REQUEST,
  GET_MEESENGER_SUCCESS,
  UPDATE_MEESENGER_ERROR,
  UPDATE_MEESENGER_REQUEST,
  UPDATE_MEESENGER_SUCCESS,
  DELETE_MEESENGER_ERROR,
  DELETE_MEESENGER_REQUEST,
  DELETE_MEESENGER_SUCCESS,
} from "../Container/MessengerContainer";

export const addZoomReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_MEESENGER_REQUEST:
      return {
        loading: true,
      };
    case ADD_MEESENGER_SUCCESS:
      return {
        loading: false,
        success: true,
        idchatZoom: action.payload,
      };
    case ADD_MEESENGER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_MEESENGER_RESET:
      return {};
    default:
      return state;
  }
};

export const getZoomReducer = (state = [], action) => {
  switch (action.type) {
    case GET_MEESENGER_REQUEST:
      return {
        loading: true,
      };
    case GET_MEESENGER_SUCCESS:
      return {
        loading: false,
        success: true,
        zoom: action.payload,
      };
    case GET_MEESENGER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateZoomReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_MEESENGER_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_MEESENGER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_MEESENGER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteZoomReducer = (state = [], action) => {
  switch (action.type) {
    case DELETE_MEESENGER_REQUEST:
      return {
        loading: true,
      };
    case DELETE_MEESENGER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_MEESENGER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
