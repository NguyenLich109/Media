import {
  ADD_CONTENT_ERROR,
  ADD_CONTENT_REQUEST,
  ADD_CONTENT_RESET,
  ADD_CONTENT_SUCCESS,
  GET_COMMMENT_ERROR,
  GET_COMMMENT_SUCCESS,
  GET_CONTENT_ERROR,
  GET_CONTENT_REQUEST,
  GET_CONTENT_SUCCESS,
  UPDATE_COMMENTSCHILD_ERROR,
  UPDATE_COMMENTSCHILD_REQUEST,
  UPDATE_COMMENTSCHILD_RESET,
  UPDATE_COMMENTSCHILD_SUCCESS,
  UPDATE_COMMENTS_ERROR,
  UPDATE_COMMENTS_REQUEST,
  UPDATE_COMMENTS_RESET,
  UPDATE_COMMENTS_SUCCESS,
  UPDATE_CONTENT_ERROR,
  UPDATE_CONTENT_REQUEST,
  UPDATE_CONTENT_RESET,
  UPDATE_CONTENT_SUCCESS,
} from "../Container/ContentPostContainer";

//ADD CONTENT
export const addContentPostReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_CONTENT_REQUEST:
      return {
        loading: true,
      };
    case ADD_CONTENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_CONTENT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_CONTENT_RESET:
      return {};
    default:
      return state;
  }
};

//GET CONTENT
export const getContentPostReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONTENT_REQUEST:
      return {
        loading: true,
      };
    case GET_CONTENT_SUCCESS:
      return {
        loading: false,
        contents: action.payload,
        success: true,
      };
    case GET_CONTENT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//UPDATE CONTENT
export const updateContentPostReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CONTENT_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_CONTENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_CONTENT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_CONTENT_RESET:
      return {};
    default:
      return state;
  }
};

//UPDATE COMMENT
export const updateCommentReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_COMMENTS_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_COMMENTS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_COMMENTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_COMMENTS_RESET:
      return {};
    default:
      return state;
  }
};

//UPDATE COMMENT
export const updateCommentChildReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_COMMENTSCHILD_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_COMMENTSCHILD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_COMMENTSCHILD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_COMMENTSCHILD_RESET:
      return {};
    default:
      return state;
  }
};

//GET NOTI COMMENT
export const getCommmentReducer = (state = [], action) => {
  switch (action.type) {
    case GET_COMMMENT_SUCCESS:
      return {
        loading: false,
        getComments: action.payload,
      };
    case GET_COMMMENT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
