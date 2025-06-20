export const BOOKING_ACTION_TYPES = {
    FETCH_BOOKING_REQUEST: 'FETCH_BOOKING_REQUEST',
    FETCH_BOOKING_SUCCESS: 'FETCH_BOOKING_SUCCESS',
    FETCH_BOOKING_FAILURE: 'FETCH_BOOKING_FAILURE',
    UPDATE_BOOKING_REQUEST: 'UPDATE_BOOKING_REQUEST',
    UPDATE_BOOKING_SUCCESS: 'UPDATE_BOOKING_SUCCESS',
    UPDATE_BOOKING_FAILURE: 'UPDATE_BOOKING_FAILURE',
};

const initialState = {
    booking: null,
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch Booking
        case BOOKING_ACTION_TYPES.FETCH_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case BOOKING_ACTION_TYPES.FETCH_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                booking: action.payload,
                error: null
            };
        case BOOKING_ACTION_TYPES.FETCH_BOOKING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Update Booking
        case BOOKING_ACTION_TYPES.UPDATE_BOOKING_REQUEST:
            return {
                ...state,
                updateLoading: true,
                updateError: null
            };
        case BOOKING_ACTION_TYPES.UPDATE_BOOKING_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                booking: action.payload,
                updateError: null
            };
        case BOOKING_ACTION_TYPES.UPDATE_BOOKING_FAILURE:
            return {
                ...state,
                updateLoading: false,
                updateError: action.payload
            };

        default:
            return state;
    }
};

export default bookingReducer;