import { getAllCategories, getOneCategory, gqlGoodFind } from "../gql.js";
import { actionPromise } from "./promise-actions.js";

export const findAllCategories = () =>
  actionPromise("categories", getAllCategories());

export const findCategoryById = (id) =>
  actionPromise("category", getOneCategory(id));

export const findGoodById = (id) => actionPromise("good", gqlGoodFind(id));
