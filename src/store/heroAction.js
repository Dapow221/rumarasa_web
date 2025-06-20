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

const fetchHeroRequest = () => ({
    type: HERO_ACTION_TYPES.FETCH_HERO_REQUEST
});

const fetchHeroSuccess = (hero) => ({
    type: HERO_ACTION_TYPES.FETCH_HERO_SUCCESS,
    payload: hero
});

const fetchHeroFailure = (error) => ({
    type: HERO_ACTION_TYPES.FETCH_HERO_FAILURE,
    payload: error
});

const updateHeroRequest = () => ({
    type: HERO_ACTION_TYPES.UPDATE_HERO_REQUEST
});

const updateHeroSuccess = (hero) => ({
    type: HERO_ACTION_TYPES.UPDATE_HERO_SUCCESS,
    payload: hero
});

const updateHeroFailure = (error) => ({
    type: HERO_ACTION_TYPES.UPDATE_HERO_FAILURE,
    payload: error
});

const API_BASE_URL = 'https://koa-backend.vercel.app'

export const fetchHero = () => {
    return async (dispatch) => {
        dispatch(fetchHeroRequest());
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/hero`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch hero data');
            }

            if (data.success) {
                dispatch(fetchHeroSuccess(data.data));
            } else {
                throw new Error(data.message || 'Failed to fetch hero data');
            }
        } catch (error) {
            dispatch(fetchHeroFailure(error.message));
        }
    };
};



export const updateHero = (heroId, heroData) => {
    return async (dispatch) => {
        dispatch(updateHeroRequest());
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/edit-hero/${heroId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(heroData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update hero');
            }

            if (data.success) {
                dispatch(updateHeroSuccess(data.data));
                console.log(data.data)
                return { success: true, data: data.data };
            } else {
                throw new Error(data.message || 'Failed to update hero');
            }
        } catch (error) {
            dispatch(updateHeroFailure(error.message));
            return { success: false, error: error.message };
        }
    };
};
