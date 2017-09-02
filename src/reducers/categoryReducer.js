import {
  GET_CATEGORIES,
  GET_POSTS_BY_CATEGORY
} from './../actions/categoryActions';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, action.categories)
    case GET_POSTS_BY_CATEGORY:
      const { id } = action;
      return Object.assign({}, state, {
        id,
      })
    default:
      return state;
  }
};
