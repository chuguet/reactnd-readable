export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';

export function getCategories() {
  return {
    type: GET_CATEGORIES
  }
}

export function getPostsByCategory({ idPost }) {
  return {
    type: GET_POSTS_BY_CATEGORY,
    id: idPost,
  }
}
