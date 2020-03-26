import { combineReducers } from "redux";

import userStories from './userStories';
import error from './error';
import success from './success';
import login from './login';

export default combineReducers({
  userStories,
  error,
  success,
  login,
});