// Action Types
export const ABOUT_ACTION_TYPES = {
    FETCH_ABOUT_REQUEST: 'FETCH_ABOUT_REQUEST',
    FETCH_ABOUT_SUCCESS: 'FETCH_ABOUT_SUCCESS',
    FETCH_ABOUT_FAILURE: 'FETCH_ABOUT_FAILURE',
    CREATE_ABOUT_REQUEST: 'CREATE_ABOUT_REQUEST',
    CREATE_ABOUT_SUCCESS: 'CREATE_ABOUT_SUCCESS',
    CREATE_ABOUT_FAILURE: 'CREATE_ABOUT_FAILURE',
    UPDATE_ABOUT_REQUEST: 'UPDATE_ABOUT_REQUEST',
    UPDATE_ABOUT_SUCCESS: 'UPDATE_ABOUT_SUCCESS',
    UPDATE_ABOUT_FAILURE: 'UPDATE_ABOUT_FAILURE',
};

// Action Creators
const fetchAboutRequest = () => ({
    type: ABOUT_ACTION_TYPES.FETCH_ABOUT_REQUEST
});

const fetchAboutSuccess = (about) => ({
    type: ABOUT_ACTION_TYPES.FETCH_ABOUT_SUCCESS,
    payload: about
});

const fetchAboutFailure = (error) => ({
    type: ABOUT_ACTION_TYPES.FETCH_ABOUT_FAILURE,
    payload: error
});

const createAboutRequest = () => ({
    type: ABOUT_ACTION_TYPES.CREATE_ABOUT_REQUEST
});

const createAboutSuccess = (about) => ({
    type: ABOUT_ACTION_TYPES.CREATE_ABOUT_SUCCESS,
    payload: about
});

const createAboutFailure = (error) => ({
    type: ABOUT_ACTION_TYPES.CREATE_ABOUT_FAILURE,
    payload: error
});

const updateAboutRequest = () => ({
    type: ABOUT_ACTION_TYPES.UPDATE_ABOUT_REQUEST
});

const updateAboutSuccess = (about) => ({
    type: ABOUT_ACTION_TYPES.UPDATE_ABOUT_SUCCESS,
    payload: about
});

const updateAboutFailure = (error) => ({
    type: ABOUT_ACTION_TYPES.UPDATE_ABOUT_FAILURE,
    payload: error
});

const API_BASE_URL = 'http://localhost:3030';

// Thunk Actions
export const fetchAbout = () => {
    return async (dispatch) => {
        dispatch(fetchAboutRequest());
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/about`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            console.log(data);
            
            if (response.ok) {
                dispatch(fetchAboutSuccess(data.data));
            } else {
                dispatch(fetchAboutFailure(data.message || 'Failed to fetch about'));
            }
        } catch (error) {
            dispatch(fetchAboutFailure(error.message));
        }
    };
};

export const createAbout = (aboutData) => {
    return async (dispatch) => {
        dispatch(createAboutRequest());
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/create-about`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aboutData)
            });

            const data = await response.json();
            console.log(data);
            
            if (response.ok) {
                dispatch(createAboutSuccess(data.data));
            } else {
                dispatch(createAboutFailure(data.message || 'Failed to create about'));
            }
        } catch (error) {
            dispatch(createAboutFailure(error.message));
        }
    };
};

export const updateAbout = (id, aboutData) => {
    return async (dispatch) => {
        dispatch(updateAboutRequest());
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/update-about/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aboutData)
            });

            const data = await response.json();
            console.log(data);
            
            if (response.ok) {
                dispatch(updateAboutSuccess(data.data));
            } else {
                dispatch(updateAboutFailure(data.message || 'Failed to update about'));
            }
        } catch (error) {
            dispatch(updateAboutFailure(error.message));
        }
    };
};