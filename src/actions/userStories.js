import {
  SAVE_USER_STORIES_START,
  SAVE_USER_STORIES_SUCCESS,
  SAVE_USER_STORIES_ERROR,
  GET_USER_STORIES_START,
  GET_USER_STORIES_SUCCESS,
  GET_USER_STORIES_ERROR,
  CLEAR_USER_STORIES_DATA,
} from "./constant";
import { saveUserStoriesAPI, getUserStoriesAPI } from "../api/userStoriesApi";
import {
  USER_STORIES_SAVE_SUCCESS_MSG,
} from "../common/constants";


const saveUserStoriesStart = () => ({
  type: SAVE_USER_STORIES_START,
});

const saveUserStoriesSuccess = json => ({
  type: SAVE_USER_STORIES_SUCCESS,
  saveResponse: json.data,
  successMsg: USER_STORIES_SAVE_SUCCESS_MSG
});

const saveUserStoriesError = error => ({
  type: SAVE_USER_STORIES_ERROR,
  errorMsg: error.response && error.response.data && error.response.data.errorMessage
});

export const saveUserStories = (data) => {
  return async (dispatch) => {
    dispatch(saveUserStoriesStart());
    try {
      const response = await saveUserStoriesAPI(data);
      dispatch(saveUserStoriesSuccess(response));
      return response;
    } catch (error) {
      dispatch(saveUserStoriesError(error));
      return error;
    }
  }
};

const getUserStoriesStart = () => ({
  type: GET_USER_STORIES_START,
});

const getUserStoriesSucces = json => ({
  type: GET_USER_STORIES_SUCCESS,
  userStoriesListResponse: json.data,
});

const getUserStoriesError = error => ({
  type: GET_USER_STORIES_ERROR,
  errorMsg: error.message
});

export const getUserStories = () => {
  return async (dispatch) => {
    dispatch(getUserStoriesStart());
    try {
      const response = await getUserStoriesAPI();
      dispatch(getUserStoriesSucces(response));
      return response;
    } catch (error) {
      dispatch(getUserStoriesError(error));
      return error;
    }
  }
};

export const clearUserStoriesData = () => ({
  type: CLEAR_USER_STORIES_DATA,
});
