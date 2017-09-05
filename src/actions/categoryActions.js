import * as api from './../utils/api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';

export function getCategories() {
  return (dispatch) => {
    api.getCategories().then(({ categories }) => {
      dispatch(getCategoriesSuccess(categories));
    });
  };
}

export function getCategoriesSuccess(categories) {
  return {
    type: GET_CATEGORIES,
    categories: categories
  }
}
