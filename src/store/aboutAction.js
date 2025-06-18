// Action Types
export const ABOUT_ACTION_TYPES = {
  FETCH_ABOUT_REQUEST: "FETCH_ABOUT_REQUEST",
  FETCH_ABOUT_SUCCESS: "FETCH_ABOUT_SUCCESS",
  FETCH_ABOUT_FAILURE: "FETCH_ABOUT_FAILURE",
  UPDATE_ABOUT_REQUEST: "UPDATE_ABOUT_REQUEST",
  UPDATE_ABOUT_SUCCESS: "UPDATE_ABOUT_SUCCESS",
  UPDATE_ABOUT_FAILURE: "UPDATE_ABOUT_FAILURE",
};

// Action Creators
const fetchAboutRequest = () => ({
  type: ABOUT_ACTION_TYPES.FETCH_ABOUT_REQUEST,
});

const fetchAboutSuccess = (about) => ({
  type: ABOUT_ACTION_TYPES.FETCH_ABOUT_SUCCESS,
  payload: about,
});

const fetchAboutFailure = (error) => ({
  type: ABOUT_ACTION_TYPES.FETCH_ABOUT_FAILURE,
  payload: error,
});

const updateAboutRequest = () => ({
  type: ABOUT_ACTION_TYPES.UPDATE_ABOUT_REQUEST,
});

const updateAboutSuccess = (about) => ({
  type: ABOUT_ACTION_TYPES.UPDATE_ABOUT_SUCCESS,
  payload: about,
});

const updateAboutFailure = (error) => ({
  type: ABOUT_ACTION_TYPES.UPDATE_ABOUT_FAILURE,
  payload: error,
});

const API_BASE_URL = "http://localhost:3030";

// Thunk Actions
export const fetchAbout = () => {
  return async (dispatch) => {
    dispatch(fetchAboutRequest());

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/about`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data.data);

      if (response.ok) {
        dispatch(fetchAboutSuccess(data.data));
      } else {
        dispatch(fetchAboutFailure(data.message || "Failed to fetch about"));
      }
    } catch (error) {
      dispatch(fetchAboutFailure(error.message));
    }
  };
};

export const updateAbout = (id, aboutData) => {
  return async (dispatch) => {
    dispatch(updateAboutRequest());

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/update-about/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(aboutData),
        }
      );

      const data = await response.json();
      // console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update about");
      }

      if (data.success) {
        dispatch(updateAboutSuccess(data.data));
        console.log(data.data);
        return { success: true, data: data.data };
      } else {
        throw new Error(data.message || "Failed to update about");
      }
    } catch (error) {
      dispatch(updateAboutFailure(error.message));
      return { success: false, error: error.message };
    }
  };
};
