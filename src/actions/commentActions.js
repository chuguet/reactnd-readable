import * as api from './../utils/api';

export const GET_COMMENTS_BY_POST_ID = 'GET_COMMENTS_BY_POST_ID';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const UNLIKE_COMMENT = 'UNLIKE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export function addComment(comment) {
  return (dispatch) => {
    api.addCommentToPost(comment).then(() => {
      api.getCommentsByPost(comment.parentId).then((comments) => {
        dispatch(addCommentSuccess(comments));
      });
    });
  };
}

export function addCommentSuccess(comments) {
  return {
    type: ADD_COMMENT,
    comments: comments
  }
}

export function updateComment(comment) {
  return (dispatch) => {
    api.editComment(comment).then(() => {
      api.getCommentsByPost(comment.parentId).then((comments) => {
        dispatch(updateCommentSuccess(comments));
      });
    });
  };
}

export function updateCommentSuccess(comments) {
  return {
    type: UPDATE_COMMENT,
    comments: comments
  }
}

export function deleteComment(commentUuid, postUuid) {
  return (dispatch) => {
    api.deleteComment(commentUuid).then(() => {
      api.getCommentsByPost(postUuid).then((comments) => {
        dispatch(deleteCommentSuccess(comments));
      });
    });
  };
}

export function deleteCommentSuccess(comments) {
  return {
    type: DELETE_COMMENT,
    comments: comments
  }
}

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
