import {
  SAVE_USER_STORIES_START,
  SAVE_USER_STORIES_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  CLEAR_SUCCESS,
  LOGIN_ERROR,
} from "../actions/constant";

export default (state = null, action) => {
  switch (action.type) {
    // Any new Error actions needs to be added here
    case SAVE_USER_STORIES_SUCCESS:
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        successMsg: action.successMsg
      });
    // Any new Fetch or clear error actions needs to be added here
    case CLEAR_SUCCESS:
    case SAVE_USER_STORIES_START:
    case LOGIN_SUCCESS:
    case LOGIN_ERROR:
      return null;
    default:
      return state;
  }
};
