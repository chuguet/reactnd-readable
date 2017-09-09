import {
  GET_COMMENTS_BY_POST_ID,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} from './../actions/commentActions';

const initialState = {
  comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COMMENT:
    case ADD_COMMENT:
    case UPDATE_COMMENT:
    case GET_COMMENTS_BY_POST_ID:
    case LIKE_COMMENT:
    case UNLIKE_COMMENT:
      return Object.assign({}, state, {
        comments: action.comments
      });
    default:
      return state;
  }
};
