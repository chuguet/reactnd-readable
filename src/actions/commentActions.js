import * as api from './../utils/api';

export const GET_COMMENTS_BY_POST_ID = 'GET_COMMENTS_BY_POST_ID';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const UNLIKE_COMMENT = 'UNLIKE_COMMENT';

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

export function likeComment(postId, commentId) {
  return (dispatch) => {
    api.voteComment(commentId, 'upVote').then(() => {
      api.getCommentsByPost(postId).then((comments) => {
        dispatch(likeCommentSuccess(comments));
      });
    });
  };
}

export function likeCommentSuccess(comments) {
  return {
    type: LIKE_COMMENT,
    comments: comments
  }
}

export function unlikeComment(postId, commentId) {
  return (dispatch) => {
    api.voteComment(commentId, 'downVote').then(() => {
      api.getCommentsByPost(postId).then((comments) => {
        dispatch(unlikeCommentSuccess(comments));
      });
    });
  };
}

export function unlikeCommentSuccess(comments) {
  return {
    type: UNLIKE_COMMENT,
    comments: comments
  }
}
