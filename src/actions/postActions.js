import * as api from './../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export function deletePost(postUuid) {
  return (dispatch) => {
    api.deletePost(postUuid).then(() => {
      api.getPosts().then(posts => {
        dispatch(deletePostSuccess(posts));
      })
    });
  };
}

export function deletePostSuccess(posts) {
  return {
    type: DELETE_POST,
    posts: posts.filter(post => post.deleted===false)
  }
}

export function updatePost(post) {
  return (dispatch) => {
    api.editPost(post.id, {
      title: post.title,
      body: post.body
    }).then(() => {
      api.getPosts().then(posts => {
        dispatch(updatePostSuccess(posts));
      })
    });
  };
}

export function updatePostSuccess(posts) {
  return {
    type: UPDATE_POST,
    posts: posts.filter(post => post.deleted===false)
  }
}

export function addPost(post) {
  return (dispatch) => {
    api.addPost(post).then(() => {
      api.getPosts().then(posts => {
        dispatch(addPostSuccess(posts));
      })
    });
  };
}

export function addPostSuccess(posts) {
  return {
    type: ADD_POST,
    posts: posts.filter(post => post.deleted===false)
  }
}

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
    posts: posts.filter(post => post.deleted===false)
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
    posts: posts.filter(post => post.deleted===false)
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
