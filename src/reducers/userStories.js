import _ from "lodash";
import {
  SAVE_USER_STORIES_START,
  SAVE_USER_STORIES_SUCCESS,
  SAVE_USER_STORIES_ERROR,
  GET_USER_STORIES_START,
  GET_USER_STORIES_SUCCESS,
  GET_USER_STORIES_ERROR,
  APPROVED_USER_STORY,
  REJECT_USER_STORY,
} from "../actions/constant";

const userStories = (
  state = {
    isFetching: false,
    userStoriesList: [],
  },
  action,
) => {
  switch (action.type) {
    case SAVE_USER_STORIES_START:
      return Object.assign({}, state, {
        isSavingUserStories: true,
      });
    case SAVE_USER_STORIES_SUCCESS:
      return Object.assign({}, state, {
        isSavingUserStories: false,
        userStoriesSavedData: state.userStoriesSavedData.concat(action.saveResponse),
      });
    case SAVE_USER_STORIES_ERROR:
      return Object.assign({}, state, {
        isSavingUserStories: false,
      });
    case GET_USER_STORIES_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_USER_STORIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        userStoriesList: action.userStoriesListResponse,
      });
    case GET_USER_STORIES_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case APPROVED_USER_STORY:
      return Object.assign({}, state, {
        userStoriesList: _.map(state.userStoriesList,
          (item) => ((item.id === action.val.id) ? action.val : item)),
      });
    case REJECT_USER_STORY:
      return Object.assign({}, state, {
        userStoriesList: _.map(state.userStoriesList,
          (item) => ((item.id === action.val.id) ? action.val : item)),
      });
    default:
      return state;
  }
};

export default userStories;
