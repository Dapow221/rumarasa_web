export const ABOUT_ACTION_TYPES = {
    FETCH_ABOUT_REQUEST: 'FETCH_ABOUT_REQUEST',
    FETCH_ABOUT_SUCCESS: 'FETCH_ABOUT_SUCCESS',
    FETCH_ABOUT_FAILURE: 'FETCH_ABOUT_FAILURE',
    UPDATE_ABOUT_REQUEST: 'UPDATE_ABOUT_REQUEST',
    UPDATE_ABOUT_SUCCESS: 'UPDATE_ABOUT_SUCCESS',
    UPDATE_ABOUT_FAILURE: 'UPDATE_ABOUT_FAILURE',
};

const initialState = {
    about: null,
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
};

const aboutReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch About
        case ABOUT_ACTION_TYPES.FETCH_ABOUT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ABOUT_ACTION_TYPES.FETCH_ABOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                about: action.payload,
                error: null
            };
        case ABOUT_ACTION_TYPES.FETCH_ABOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Update About
        case ABOUT_ACTION_TYPES.UPDATE_ABOUT_REQUEST:
            return {
                ...state,
                updateLoading: true,
                updateError: null
            };
        case ABOUT_ACTION_TYPES.UPDATE_ABOUT_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                about: action.payload,
                updateError: null
            };
        case ABOUT_ACTION_TYPES.UPDATE_ABOUT_FAILURE:
            return {
                ...state,
                updateLoading: false,
                updateError: action.payload
            };

        default:
            return state;
    }
};

export default aboutReducer;