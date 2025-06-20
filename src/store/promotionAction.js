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

// Action Creators
const fetchPromotionsRequest = () => ({
    type: PROMOTION_ACTION_TYPES.FETCH_PROMOTIONS_REQUEST
});

const fetchPromotionsSuccess = (promotions) => ({
    type: PROMOTION_ACTION_TYPES.FETCH_PROMOTIONS_SUCCESS,
    payload: promotions
});

const fetchPromotionsFailure = (error) => ({
    type: PROMOTION_ACTION_TYPES.FETCH_PROMOTIONS_FAILURE,
    payload: error
});

const createPromotionRequest = () => ({
    type: PROMOTION_ACTION_TYPES.CREATE_PROMOTION_REQUEST
});

const createPromotionSuccess = (promotion) => ({
    type: PROMOTION_ACTION_TYPES.CREATE_PROMOTION_SUCCESS,
    payload: promotion
});

const createPromotionFailure = (error) => ({
    type: PROMOTION_ACTION_TYPES.CREATE_PROMOTION_FAILURE,
    payload: error
});

const updatePromotionRequest = () => ({
    type: PROMOTION_ACTION_TYPES.UPDATE_PROMOTION_REQUEST
});

const updatePromotionSuccess = (promotion) => ({
    type: PROMOTION_ACTION_TYPES.UPDATE_PROMOTION_SUCCESS,
    payload: promotion
});

const updatePromotionFailure = (error) => ({
    type: PROMOTION_ACTION_TYPES.UPDATE_PROMOTION_FAILURE,
    payload: error
});

const API_BASE_URL = 'http://localhost:3030';

// Thunk Actions
export const fetchPromotions = () => {
    return async (dispatch) => {
        dispatch(fetchPromotionsRequest());
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/promotions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            console.log(data)

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch promotions');
            }

            if (data.success) {
                dispatch(fetchPromotionsSuccess(data.data));
            } else {
                throw new Error(data.message || 'Failed to fetch promotions');
            }
        } catch (error) {
            dispatch(fetchPromotionsFailure(error.message));
        }
    };
};

export const createPromotion = (promotionData) => {
    return async (dispatch) => {
        dispatch(createPromotionRequest());
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/promotions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(promotionData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create promotion');
            }

            if (data.success) {
                dispatch(createPromotionSuccess(data.data));
                console.log(data.data);
                return { success: true, data: data.data };
            } else {
                throw new Error(data.message || 'Failed to create promotion');
            }
        } catch (error) {
            dispatch(createPromotionFailure(error.message));
            return { success: false, error: error.message };
        }
    };
};

export const updatePromotion = (promotionId, promotionData) => {
    return async (dispatch) => {
        dispatch(updatePromotionRequest());

        try {
            const isFormData = promotionData instanceof FormData;
            
            const requestOptions = {
                method: 'PUT',
                body: isFormData ? promotionData : JSON.stringify(promotionData),
            };

            if (!isFormData) {
                requestOptions.headers = {
                    'Content-Type': 'application/json'
                };
            }

            const response = await fetch(`${API_BASE_URL}/api/v1/promotions/${promotionId}`, requestOptions);

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update promotion');
            }

            if (data.success) {
                dispatch(updatePromotionSuccess(data.data));
                console.log(data.data);
                return { success: true, data: data.data };
            } else {
                throw new Error(data.message || 'Failed to update promotion');
            }
        } catch (error) {
            dispatch(updatePromotionFailure(error.message));
            return { success: false, error: error.message };
        }
    };
};