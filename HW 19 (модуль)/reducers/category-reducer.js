import { findAllCategories } from "../actions/category-action.js";

export function categoryReducer(state = {}, action) {
  const { type, category, good } = action;
  switch (type) {
    case "GET_ALL_CATEGORIES":
      return {
        ...state,
        allCategories: findAllCategories(),
      };
    case "GET_CATEGORY_PRODUCTS":
      return {
        ...state,
        category,
      };
    case "GET_CATEGORY_PRODUCT":
      return {
        ...state,
        good,
      };
    default:
      return state;
  }
}
