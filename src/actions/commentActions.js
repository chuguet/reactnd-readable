import * as api from './../utils/api';

export const GET_COMMENTS_BY_POST_ID = 'GET_COMMENTS_BY_POST_ID';

export function getCommentsByPost(postId) {
  return (dispatch) => {
    api.getCommentsByPost(postId).then((comments) => {
      dispatch(getCommentsSuccess(comments));
    });
  };
}

export function getCommentsSuccess(comments) {
  return {
    type: GET_COMMENTS_BY_POST_ID,
    comments: comments
  }
}
