export const BOOKING_ACTION_TYPES = {
    FETCH_BOOKING_REQUEST: "FETCH_BOOKING_REQUEST",
    FETCH_BOOKING_SUCCESS: "FETCH_BOOKING_SUCCESS",
    FETCH_BOOKING_FAILURE: "FETCH_BOOKING_FAILURE",
    UPDATE_BOOKING_REQUEST: "UPDATE_BOOKING_REQUEST",
    UPDATE_BOOKING_SUCCESS: "UPDATE_BOOKING_SUCCESS",
    UPDATE_BOOKING_FAILURE: "UPDATE_BOOKING_FAILURE",
  };
  
  const fetchBookingRequest = () => ({
    type: BOOKING_ACTION_TYPES.FETCH_BOOKING_REQUEST,
  });
  
  const fetchBookingSuccess = (booking) => ({
    type: BOOKING_ACTION_TYPES.FETCH_BOOKING_SUCCESS,
    payload: booking,
  });
  
  const fetchBookingFailure = (error) => ({
    type: BOOKING_ACTION_TYPES.FETCH_BOOKING_FAILURE,
    payload: error,
  });
  
  const updateBookingRequest = () => ({
    type: BOOKING_ACTION_TYPES.UPDATE_BOOKING_REQUEST,
  });
  
  const updateBookingSuccess = (booking) => ({
    type: BOOKING_ACTION_TYPES.UPDATE_BOOKING_SUCCESS,
    payload: booking,
  });
  
  const updateBookingFailure = (error) => ({
    type: BOOKING_ACTION_TYPES.UPDATE_BOOKING_FAILURE,
    payload: error,
  });
  
  const API_BASE_URL = "https://koa-backend.vercel.app";
  
  export const fetchBooking = () => {
    return async (dispatch) => {
      dispatch(fetchBookingRequest());
  
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/booking`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          dispatch(fetchBookingSuccess(data.data));
        } else {
          dispatch(fetchBookingFailure(data.message || "Failed to fetch booking"));
        }
      } catch (error) {
        dispatch(fetchBookingFailure(error.message));
      }
    };
  };
  
  export const updateBooking = (id, bookingData) => {
    return async (dispatch) => {
      dispatch(updateBookingRequest());
  
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/update-booking/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
          }
        );
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "Failed to update booking");
        }
  
        if (data.success) {
          dispatch(updateBookingSuccess(data.data));
          return { success: true, data: data.data };
        } else {
          throw new Error(data.message || "Failed to update booking");
        }
      } catch (error) {
        dispatch(updateBookingFailure(error.message));
        return { success: false, error: error.message };
      }
    };
  };