import {
  GET_CATEGORIES,
  GET_POSTS_BY_CATEGORY
} from './../actions/categoryActions';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      }
    case GET_POSTS_BY_CATEGORY:
      const { id } = action;
      return {
        id,
        ...state,
      }
    default:
      return state;
  }
};
