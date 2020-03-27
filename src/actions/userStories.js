import {
  SAVE_USER_STORIES_START,
  SAVE_USER_STORIES_SUCCESS,
  SAVE_USER_STORIES_ERROR,
  GET_USER_STORIES_START,
  GET_USER_STORIES_SUCCESS,
  GET_USER_STORIES_ERROR,
  CLEAR_USER_STORIES_DATA,
  APPROVED_USER_STORY,
  REJECT_USER_STORY,
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

export const createUserStories = (data) => {
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
  userStoriesListResponse: json,
});

const getUserStoriesError = error => ({
  type: GET_USER_STORIES_ERROR,
  errorMsg: error.message
});

export const getUserStories = () => {
  return async (dispatch) => {
    dispatch(getUserStoriesStart());
    try {
      // const response = await getUserStoriesAPI();
      const response = [{
        id: 1,
        createdBy: 2,
        summary: '1st story created by 2',
        description: 'dummy desc',
        type: 'enhancement',
        complexity: 'high',
        estimatedHrs: 1,
        cost: 100,
      },
      {
        id: 2,
        createdBy: 1,
        summary: '2nd story created by 1',
        description: 'Beautiful Story',
        type: 'bug',
        complexity: 'low',
        estimatedHrs: 4,
        cost: 120,
    }];
      dispatch(getUserStoriesSucces(response));
      return response;
    } catch (error) {
      dispatch(getUserStoriesError(error));
      return error;
    }
  }
};

export const approveUserStory = (userStory) => ({
  type: APPROVED_USER_STORY,
  val: userStory,
});

export const rejectUserStory = (userStory) => ({
  type: REJECT_USER_STORY,
  val: userStory,
});

