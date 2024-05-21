import { findAllCategories } from "../actions/category-action.js";

export function categoryReducer(state = {}, action) {
  const { type, category, good } = action;
  switch (type) {
    case "GET_ALL_CATEGORIES": // Добавляем обработку действия для получения всех категорий
      return {
        ...state,
        allCategories: findAllCategories(), // Запускаем действие для получения всех категорий
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
