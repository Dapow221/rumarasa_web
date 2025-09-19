export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const BASE_URL = "https://koa-backend.vercel.app";

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const createUserRequest = () => ({
  type: CREATE_USER_REQUEST
});

export const createUserSuccess = (userData) => ({
  type: CREATE_USER_SUCCESS,
  payload: userData
});

export const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error
});

export const getUserRequest = () => ({
  type: GET_USER_REQUEST
});

export const getUserSuccess = (userData) => ({
  type: GET_USER_SUCCESS,
  payload: userData
});

export const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    
    try {
      const response = await fetch(`${BASE_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result) {
        localStorage.setItem('authToken', result.data.token);
      }
      
      dispatch(loginSuccess(result));
      return result;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };
};

export const createUser = (userData) => {
  return async (dispatch) => {
    dispatch(createUserRequest());
    
    try {
      const response = await fetch(`${BASE_URL}/api/v1/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(createUserSuccess(data));
      return data;
    } catch (error) {
      dispatch(createUserFailure(error.message));
      throw error;
    }
  };
};

export const getUserById = (userId) => {
  return async (dispatch) => {
    dispatch(getUserRequest());
    
    try {
      const response = await fetch(`${BASE_URL}/api/v1/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(getUserSuccess(data));
      return data;
    } catch (error) {
      dispatch(getUserFailure(error.message));
      throw error;
    }
  };
};


export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('authToken');
    
    dispatch(logoutSuccess());
  };
};