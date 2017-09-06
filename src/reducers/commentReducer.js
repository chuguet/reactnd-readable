import {
  GET_COMMENTS_BY_POST_ID,
} from './../actions/commentActions';

const initialState = {
  comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_BY_POST_ID:
      return Object.assign({}, state, {
        comments: action.comments
      });
    default:
      return state;
  }
};
