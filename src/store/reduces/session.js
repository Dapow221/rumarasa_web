import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGOUT_SUCCESS
  } from '../action';
  
  const initialState = {
    isLogin: false,
    isLoading: false,
    user: null,
    error: null,
    token: localStorage.getItem('authToken') || null
  };
  
  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      // Login actions
      case LOGIN_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLogin: true,
          isLoading: false,
          user: action.payload.username || action.payload,
          token: action.payload.token || state.token,
          error: null
        };
      
      case LOGIN_FAILURE:
        return {
          ...state,
          isLogin: false,
          isLoading: false,
          error: action.payload,
          user: null,
          token: null
        };
  
      // Create user actions
      case CREATE_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      
      case CREATE_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          error: null
        };
      
      case CREATE_USER_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
  
      // Get user actions
      case GET_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      
      case GET_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          error: null
        };
      
      case GET_USER_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
  
      // Logout action
      case LOGOUT_SUCCESS:
        return {
          ...state,
          isLogin: false,
          user: null,
          token: null,
          error: null
        };
      
      default:
        return state;
    }
  };
  
  export default sessionReducer;