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

// Action Creators
const fetchEventsRequest = () => ({
    type: EVENT_ACTION_TYPES.FETCH_EVENTS_REQUEST
});

const fetchEventsSuccess = (events) => ({
    type: EVENT_ACTION_TYPES.FETCH_EVENTS_SUCCESS,
    payload: events
});

const fetchEventsFailure = (error) => ({
    type: EVENT_ACTION_TYPES.FETCH_EVENTS_FAILURE,
    payload: error
});

const createEventRequest = () => ({
    type: EVENT_ACTION_TYPES.CREATE_EVENT_REQUEST
});

const createEventSuccess = (event) => ({
    type: EVENT_ACTION_TYPES.CREATE_EVENT_SUCCESS,
    payload: event
});

const createEventFailure = (error) => ({
    type: EVENT_ACTION_TYPES.CREATE_EVENT_FAILURE,
    payload: error
});

const updateEventRequest = () => ({
    type: EVENT_ACTION_TYPES.UPDATE_EVENT_REQUEST
});

const updateEventSuccess = (event) => ({
    type: EVENT_ACTION_TYPES.UPDATE_EVENT_SUCCESS,
    payload: event
});

const updateEventFailure = (error) => ({
    type: EVENT_ACTION_TYPES.UPDATE_EVENT_FAILURE,
    payload: error
});

const API_BASE_URL = 'http://localhost:3030';

// Thunk Actions
export const fetchEvents = () => {
    return async (dispatch) => {
        dispatch(fetchEventsRequest());
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/events`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            console.log(data)

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch events');
            }

            if (data.success) {
                dispatch(fetchEventsSuccess(data.data));
            } else {
                throw new Error(data.message || 'Failed to fetch events');
            }
        } catch (error) {
            dispatch(fetchEventsFailure(error.message));
        }
    };
};

export const createEvent = (eventData) => {
    return async (dispatch) => {
        dispatch(createEventRequest());
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create event');
            }

            if (data.success) {
                dispatch(createEventSuccess(data.data));
                console.log(data.data);
                return { success: true, data: data.data };
            } else {
                throw new Error(data.message || 'Failed to create event');
            }
        } catch (error) {
            dispatch(createEventFailure(error.message));
            return { success: false, error: error.message };
        }
    };
};

export const updateEvent = (eventId, eventData) => {
    return async (dispatch) => {
        dispatch(updateEventRequest());

        try {
            const isFormData = eventData instanceof FormData;
            
            const requestOptions = {
                method: 'PUT',
                body: isFormData ? eventData : JSON.stringify(eventData),
            };

            if (!isFormData) {
                requestOptions.headers = {
                    'Content-Type': 'application/json'
                };
            }

            const response = await fetch(`${API_BASE_URL}/api/v1/events/${eventId}`, requestOptions);

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update event');
            }

            if (data.success) {
                dispatch(updateEventSuccess(data.data));
                console.log(data.data);
                return { success: true, data: data.data };
            } else {
                throw new Error(data.message || 'Failed to update event');
            }
        } catch (error) {
            dispatch(updateEventFailure(error.message));
            return { success: false, error: error.message };
        }
    };
};