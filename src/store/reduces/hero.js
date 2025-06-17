export const HERO_ACTION_TYPES = {
    // Fetch Hero
    FETCH_HERO_REQUEST: 'FETCH_HERO_REQUEST',
    FETCH_HERO_SUCCESS: 'FETCH_HERO_SUCCESS',
    FETCH_HERO_FAILURE: 'FETCH_HERO_FAILURE',
    
    // Update Hero
    UPDATE_HERO_REQUEST: 'UPDATE_HERO_REQUEST',
    UPDATE_HERO_SUCCESS: 'UPDATE_HERO_SUCCESS',
    UPDATE_HERO_FAILURE: 'UPDATE_HERO_FAILURE',
};

const initialState = {
    hero: null,
    isLoading: false,
    error: null,
    isCreating: false,
    isUpdating: false,
    createError: null,
    updateError: null,
    lastUpdated: null
};

const heroReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch Hero Cases
        case HERO_ACTION_TYPES.FETCH_HERO_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        
        case HERO_ACTION_TYPES.FETCH_HERO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hero: action.payload,
                error: null,
                lastUpdated: new Date().toISOString()
            };
        
        case HERO_ACTION_TYPES.FETCH_HERO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                hero: null
            };

        // Update Hero Cases
        case HERO_ACTION_TYPES.UPDATE_HERO_REQUEST:
            return {
                ...state,
                isUpdating: true,
                updateError: null
            };
        
        case HERO_ACTION_TYPES.UPDATE_HERO_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                hero: action.payload,
                updateError: null,
                lastUpdated: new Date().toISOString()
            };
        
        case HERO_ACTION_TYPES.UPDATE_HERO_FAILURE:
            return {
                ...state,
                isUpdating: false,
                updateError: action.payload
            };

        // Clear Errors
        case HERO_ACTION_TYPES.CLEAR_HERO_ERRORS:
            return {
                ...state,
                error: null,
                createError: null,
                updateError: null
            };

        default:
            return state;
    }
};

export default heroReducer