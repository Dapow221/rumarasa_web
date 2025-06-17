export const PROMOTION_ACTION_TYPES = {
    // Fetch Promotions
    FETCH_PROMOTIONS_REQUEST: 'FETCH_PROMOTIONS_REQUEST',
    FETCH_PROMOTIONS_SUCCESS: 'FETCH_PROMOTIONS_SUCCESS',
    FETCH_PROMOTIONS_FAILURE: 'FETCH_PROMOTIONS_FAILURE',
    
    // Create Promotion
    CREATE_PROMOTION_REQUEST: 'CREATE_PROMOTION_REQUEST',
    CREATE_PROMOTION_SUCCESS: 'CREATE_PROMOTION_SUCCESS',
    CREATE_PROMOTION_FAILURE: 'CREATE_PROMOTION_FAILURE',
    
    // Update Promotion
    UPDATE_PROMOTION_REQUEST: 'UPDATE_PROMOTION_REQUEST',
    UPDATE_PROMOTION_SUCCESS: 'UPDATE_PROMOTION_SUCCESS',
    UPDATE_PROMOTION_FAILURE: 'UPDATE_PROMOTION_FAILURE',
};

const initialState = {
    promotions: [],
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
};

const promotionReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch Promotions
        case PROMOTION_ACTION_TYPES.FETCH_PROMOTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        
        case PROMOTION_ACTION_TYPES.FETCH_PROMOTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                promotions: action.payload,
                error: null,
            };
        
        case PROMOTION_ACTION_TYPES.FETCH_PROMOTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        
        // Create Promotion
        case PROMOTION_ACTION_TYPES.CREATE_PROMOTION_REQUEST:
            return {
                ...state,
                createLoading: true,
                createError: null,
            };
        
        case PROMOTION_ACTION_TYPES.CREATE_PROMOTION_SUCCESS:
            return {
                ...state,
                createLoading: false,
                promotions: [...state.promotions, action.payload],
                createError: null,
            };
        
        case PROMOTION_ACTION_TYPES.CREATE_PROMOTION_FAILURE:
            return {
                ...state,
                createLoading: false,
                createError: action.payload,
            };
        
        // Update Promotion
        case PROMOTION_ACTION_TYPES.UPDATE_PROMOTION_REQUEST:
            return {
                ...state,
                updateLoading: true,
                updateError: null,
            };
        
        case PROMOTION_ACTION_TYPES.UPDATE_PROMOTION_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                promotions: state.promotions.map(promotion =>
                    promotion.id === action.payload.id
                        ? action.payload
                        : promotion
                ),
                updateError: null,
            };
        
        case PROMOTION_ACTION_TYPES.UPDATE_PROMOTION_FAILURE:
            return {
                ...state,
                updateLoading: false,
                updateError: action.payload,
            };
        
        default:
            return state;
    }
};

export default promotionReducer;