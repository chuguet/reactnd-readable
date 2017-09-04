import * as api from './../utils/api';

export const GET_POSTS = 'GET_POSTS';


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
