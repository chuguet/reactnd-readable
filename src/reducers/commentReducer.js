import {
  GET_COMMENTS,
} from './../actions/commentActions';

const initialState = {
  comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return Object.assign({}, state, {
        comments: action.comments
      });
    default:
      return state;
  }
};
