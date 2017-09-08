import {
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  ADD_POST,
} from './../actions/postActions';

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
    case GET_POSTS:
    case UNLIKE_POST:
    case LIKE_POST:
      return Object.assign({}, state, {
        posts: action.posts
      });
    default:
      return state;
  }
};
