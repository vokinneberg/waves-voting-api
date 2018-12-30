/* eslint-disable no-underscore-dangle */
import {
  CREATE_PROJECT,
  PROJECT_PAGE_LOADED,
  PROJECT_PAGE_UNLOADED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        redirectTo: action.error ? null : `/projects/${action.payload.project._id}`,
        token: action.error ? null : action.payload.currentUser.token,
        currentUser: action.error ? null : action.payload.currentUser,
      };
    case PROJECT_PAGE_LOADED:
      return {
        ...state,
        article: action.payload.project,
      };
    case PROJECT_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
