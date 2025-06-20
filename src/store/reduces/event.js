export const EVENT_ACTION_TYPES = {
    // Fetch Events
    FETCH_EVENTS_REQUEST: 'FETCH_EVENTS_REQUEST',
    FETCH_EVENTS_SUCCESS: 'FETCH_EVENTS_SUCCESS',
    FETCH_EVENTS_FAILURE: 'FETCH_EVENTS_FAILURE',
    
    // Create Event
    CREATE_EVENT_REQUEST: 'CREATE_EVENT_REQUEST',
    CREATE_EVENT_SUCCESS: 'CREATE_EVENT_SUCCESS',
    CREATE_EVENT_FAILURE: 'CREATE_EVENT_FAILURE',
    
    // Update Event
    UPDATE_EVENT_REQUEST: 'UPDATE_EVENT_REQUEST',
    UPDATE_EVENT_SUCCESS: 'UPDATE_EVENT_SUCCESS',
    UPDATE_EVENT_FAILURE: 'UPDATE_EVENT_FAILURE',
};

const initialState = {
    events: [],
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch Events
        case EVENT_ACTION_TYPES.FETCH_EVENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        
        case EVENT_ACTION_TYPES.FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload,
                error: null,
            };
        
        case EVENT_ACTION_TYPES.FETCH_EVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        
        // Create Event
        case EVENT_ACTION_TYPES.CREATE_EVENT_REQUEST:
            return {
                ...state,
                createLoading: true,
                createError: null,
            };
        
        case EVENT_ACTION_TYPES.CREATE_EVENT_SUCCESS:
            return {
                ...state,
                createLoading: false,
                events: [...state.events, action.payload],
                createError: null,
            };
        
        case EVENT_ACTION_TYPES.CREATE_EVENT_FAILURE:
            return {
                ...state,
                createLoading: false,
                createError: action.payload,
            };
        
        // Update Event
        case EVENT_ACTION_TYPES.UPDATE_EVENT_REQUEST:
            return {
                ...state,
                updateLoading: true,
                updateError: null,
            };
        
        case EVENT_ACTION_TYPES.UPDATE_EVENT_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                events: state.events.map(event =>
                    event.id === action.payload.id
                        ? action.payload
                        : event
                ),
                updateError: null,
            };
        
        case EVENT_ACTION_TYPES.UPDATE_EVENT_FAILURE:
            return {
                ...state,
                updateLoading: false,
                updateError: action.payload,
            };
        
        default:
            return state;
    }
};

export default eventReducer;