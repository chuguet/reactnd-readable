import {
  GET_CATEGORIES,
  GET_POSTS_BY_CATEGORY
} from './../actions/categoryActions';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.categories
      });
    case GET_POSTS_BY_CATEGORY:
      return Object.assign({}, state, {
        posts: action.posts,
      });
    default:
      return state;
  }
};
