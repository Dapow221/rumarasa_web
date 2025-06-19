// Action Types
export const MENU_ACTION_TYPES = {
    FETCH_MENU_REQUEST: 'FETCH_MENU_REQUEST',
    FETCH_MENU_SUCCESS: 'FETCH_MENU_SUCCESS',
    FETCH_MENU_FAILURE: 'FETCH_MENU_FAILURE',

    CREATE_MENU_REQUEST: 'CREATE_MENU_REQUEST',
    CREATE_MENU_SUCCESS: 'CREATE_MENU_SUCCESS',
    CREATE_MENU_FAILURE: 'CREATE_MENU_FAILURE',
    
    UPDATE_MENU_REQUEST: 'UPDATE_MENU_REQUEST',
    UPDATE_MENU_SUCCESS: 'UPDATE_MENU_SUCCESS',
    UPDATE_MENU_FAILURE: 'UPDATE_MENU_FAILURE',
};

// Initial State
const initialState = {
    menus: [], // Array to store all menu items
    menu: null, // Single menu item for details
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
};

// Reducer
const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch Menu
        case MENU_ACTION_TYPES.FETCH_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case MENU_ACTION_TYPES.FETCH_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                menus: action.payload, // Assuming API returns array of menus
                error: null
            };
        case MENU_ACTION_TYPES.FETCH_MENU_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Create Menu
        case MENU_ACTION_TYPES.CREATE_MENU_REQUEST:
            return {
                ...state,
                createLoading: true,
                createError: null
            };
        case MENU_ACTION_TYPES.CREATE_MENU_SUCCESS:
            return {
                ...state,
                createLoading: false,
                menus: [...state.menus, action.payload], // Add new menu to existing array
                createError: null
            };
        case MENU_ACTION_TYPES.CREATE_MENU_FAILURE:
            return {
                ...state,
                createLoading: false,
                createError: action.payload
            };

        // Update Menu
        case MENU_ACTION_TYPES.UPDATE_MENU_REQUEST:
            return {
                ...state,
                updateLoading: true,
                updateError: null
            };
        case MENU_ACTION_TYPES.UPDATE_MENU_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                menus: state.menus.map(menu => 
                    menu.id === action.payload.id ? action.payload : menu
                ), // Update specific menu in array
                menu: action.payload, // Update single menu if it matches
                updateError: null
            };
        case MENU_ACTION_TYPES.UPDATE_MENU_FAILURE:
            return {
                ...state,
                updateLoading: false,
                updateError: action.payload
            };

        default:
            return state;
    }
};

export default menuReducer;