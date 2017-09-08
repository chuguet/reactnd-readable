import * as api from './../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';

export function getPosts() {
  return (dispatch) => {
    api.getPosts().then((posts) => {
      dispatch(getPostsSuccess(posts));
    });
  };
}

export function getPostsSuccess(posts) {
  return {
    type: GET_POSTS,
    posts: posts
  }
}

export function likePost(postId) {
  return (dispatch) => {
    api.votePost(postId, 'upVote').then(() => {
      api.getPosts().then(posts => {
        dispatch(likePostSuccess(posts));
      })
    });
  };
}

export function likePostSuccess(posts) {
  return {
    type: LIKE_POST,
    posts: posts
  }
}

export function unlikePost(postId) {
  return (dispatch) => {
    api.votePost(postId, 'downVote').then((posts) => {
      api.getPosts().then(posts => {
        dispatch(likePostSuccess(posts));
      })
    });
  };
}

export function unlikePostSuccess(postId) {
  return {
    type: UNLIKE_POST
  }
}
