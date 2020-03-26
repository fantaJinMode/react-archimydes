import {
  GET_BID_PROJECT_SPRINTS,
  GET_BID_PROJECT_SPRINTS_SUCCESS,
  GET_BID_PROJECT_SPRINTS_ERROR,
  GET_BID_PROJECT_SPRINTS_USER_STORIES,
  GET_BID_PROJECT_SPRINTS_USER_STORIES_SUCCESS,
  GET_BID_PROJECT_SPRINTS_USER_STORIES_ERROR,
  GET_STORY_DETAILS_SUCCESS,
  GET_STORY_DETAILS
} from "./constant";
import {
  getMyBidSprintListAPI,
  getMyBidUserStoriesAPI,
  getStoryAPI,
  updateExistingBidApi
} from "../api/bidProjectApi";


export const getUserStoryDetails = (projectId, sprintId, storyId) => {
  return async dispatch => {
    dispatch({
      type: GET_STORY_DETAILS
    })

    try {
      const response = await getStoryAPI(projectId, sprintId, storyId);
      dispatch({
        type: GET_STORY_DETAILS_SUCCESS,
        storyId,
        data: response.data
      })
    } catch (e) {

    }
  }
}

export const updateExistingBid = (projectId, sprintId, bidId, payload, { id, spirntId, storyId }) => {
  return async dispatch => {
    try {
      const response = await updateExistingBidApi(projectId, sprintId, bidId, payload);
      dispatch(getUserStoryDetails(id, spirntId, storyId))
    } catch (e) {
      dispatch(getUserStoryDetails(id, spirntId, storyId))
    }
  }
}


const getMyBidSprintListStart = () => ({
  type: GET_BID_PROJECT_SPRINTS,
});

const getMyBidSprintListSuccess = json => ({
  type: GET_BID_PROJECT_SPRINTS_SUCCESS,
  payload: json.data
});

const getMyBidSprintListError = (error) => ({
  type: GET_BID_PROJECT_SPRINTS_ERROR,
  errorMsg: error && error.response && error.response.data && error.response.data.message
});

export const getMyBidSprintList = (projectId) => {
  return async dispatch => {
    dispatch(getMyBidSprintListStart());
    try {
      const response = await getMyBidSprintListAPI(projectId);
      dispatch(getMyBidSprintListSuccess(response));
      console.log('succ')
      return response;
    } catch (error) {
      console.log(error, 'err')
      dispatch(getMyBidSprintListError(error));
      return error;
    }
  };
};

const getMyBidSprintUserStoriesStart = () => ({
  type: GET_BID_PROJECT_SPRINTS_USER_STORIES,
});

const getMyBidSprintUserStoriesSuccess = json => ({
  type: GET_BID_PROJECT_SPRINTS_USER_STORIES_SUCCESS,
  userStories: json.data
});

const getMyBidSprintUserStoriesError = (error) => ({
  type: GET_BID_PROJECT_SPRINTS_USER_STORIES_ERROR,
  errorMsg: error && error.response && error.response.data && error.response.data.message
});

export const getMyBidSprintUserStoreisList = (projectId, sprintId) => {
  return async dispatch => {
    dispatch(getMyBidSprintUserStoriesStart());
    try {
      const response = await getMyBidUserStoriesAPI(projectId, sprintId);
      dispatch(getMyBidSprintUserStoriesSuccess(response));
      return response;
    } catch (error) {
      dispatch(getMyBidSprintUserStoriesError(error));
      return error;
    }
  };
};
