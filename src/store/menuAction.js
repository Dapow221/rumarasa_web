// Import action types
export const MENU_ACTION_TYPES = {
    FETCH_MENU_REQUEST: 'FETCH_MENU_REQUEST',
    FETCH_MENU_SUCCESS: 'FETCH_MENU_SUCCESS',
    FETCH_MENU_FAILURE: 'FETCH_MENU_FAILURE',
    UPDATE_MENU_REQUEST: 'UPDATE_MENU_REQUEST',
    UPDATE_MENU_SUCCESS: 'UPDATE_MENU_SUCCESS',
    UPDATE_MENU_FAILURE: 'UPDATE_MENU_FAILURE',
};; // Adjust path as needed

// Action Creators
const fetchMenuRequest = () => ({
    type: MENU_ACTION_TYPES.FETCH_MENU_REQUEST,
});

const fetchMenuSuccess = (menus) => ({
    type: MENU_ACTION_TYPES.FETCH_MENU_SUCCESS,
    payload: menus,
});

const fetchMenuFailure = (error) => ({
    type: MENU_ACTION_TYPES.FETCH_MENU_FAILURE,
    payload: error,
});

const updateMenuRequest = () => ({
    type: MENU_ACTION_TYPES.UPDATE_MENU_REQUEST,
});

const updateMenuSuccess = (menu) => ({
    type: MENU_ACTION_TYPES.UPDATE_MENU_SUCCESS,
    payload: menu,
});

const updateMenuFailure = (error) => ({
    type: MENU_ACTION_TYPES.UPDATE_MENU_FAILURE,
    payload: error,
});

const API_BASE_URL = "https://koa-backend.vercel.app";

// Thunk Actions
export const fetchMenus = () => {
    return async (dispatch) => {
        dispatch(fetchMenuRequest());

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/menu`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Fetched menus:", data.data);

            if (response.ok) {
                dispatch(fetchMenuSuccess(data.data));
                return { success: true, data: data.data };
            } else {
                dispatch(fetchMenuFailure(data.message || "Failed to fetch menus"));
                return { success: false, error: data.message || "Failed to fetch menus" };
            }
        } catch (error) {
            dispatch(fetchMenuFailure(error.message));
            return { success: false, error: error.message };
        }
    };
};


export const updateMenu = (id, menuData) => {
    return async (dispatch) => {
        dispatch(updateMenuRequest());

        try {
            const isFormData = menuData instanceof FormData;
            
            const requestOptions = {
                method: 'PUT',
                body: isFormData ? menuData : JSON.stringify(menuData),
            };

            if (!isFormData) {
                requestOptions.headers = {
                    'Content-Type': 'application/json'
                };
            }

            const response = await fetch(`${API_BASE_URL}/api/v1/menu/${id}`, requestOptions);

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update menu');
            }
            
            if (data.success) {
                dispatch(updateMenuSuccess(data.data));
                console.log("Updated menu:", data.data);
                return { success: true, data: data.data };
            } else {
                throw new Error(data.message || 'Failed to update menu');
            }
        } catch (error) {
            dispatch(updateMenuFailure(error.message));
            return { success: false, error: error.message };
        }
    };
};