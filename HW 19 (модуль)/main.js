import {
  actionAuthLogout,
  actionLogin,
  actionRegistration,
} from "./actions/auth-actions.js";
import {
  actionCartAdd,
  actionCartClear,
  actionCartDel,
  actionCartSet,
  actionCartSub,
  actionFullOrder,
  actionOrderHistory,
} from "./actions/cart-actions.js";
import {
  findAllCategories,
  findCategoryById,
  findGoodById,
} from "./actions/category-action.js";
import { store } from "./store.js";
import {
  renderCart,
  renderCategories,
  renderLoginForm,
  renderOrderHistory,
  renderUserLoginedState,
} from "./view/render.js";
import { renderProductCards } from "./view/render.js";
import { displayProductDetails } from "./view/render.js";

function main() {
  store.dispatch(findAllCategories());
  const hash = window.location.hash;
  if (hash.startsWith("#/category/")) {
    const categoryId = hash.split("/")[2];
    store.dispatch(findCategoryById(categoryId));
  } else if (hash.startsWith("#/good/")) {
    const goodId = hash.split("/")[2];
    store.dispatch(findGoodById(goodId));
  }
}

window.onload = main;
window.onhashchange = main;

store.subscribe(() => {
  const isAuth = store.getState()?.auth?.token;

  if (!isAuth) {
    renderLoginForm(store.dispatch, actionLogin, actionRegistration);
  } else {
    renderUserLoginedState(
      store.getState().auth.payload.sub.login,
      store.dispatch,
      actionAuthLogout,
      actionCartClear,
      actionOrderHistory,
      store.getState().promises?.orderHistory?.payload
    );
  }

  console.log(store.getState());
  const hash = window.location.hash;
  if (store.getState().promises?.categories?.status === "FULFILLED") {
    renderCategories(store.getState().promises.categories.payload);
  }

  if (
    store.getState().promises?.category?.status === "FULFILLED" &&
    hash.startsWith("#/category/")
  ) {
    renderProductCards(store.getState().promises.category.payload.goods);
  }

  if (
    store.getState().promises?.good?.status === "FULFILLED" &&
    hash.startsWith("#/good/")
  ) {
    displayProductDetails(
      store.getState().promises.good.payload,
      isAuth,
      store.dispatch,
      actionCartAdd
    );
  }

  if (hash.startsWith("#/cart")) {
    renderCart(
      store.getState().cart,
      store.dispatch,
      actionCartAdd,
      actionCartSub,
      actionCartDel,
      actionFullOrder,
      store.getState().auth.token
    );
  }

  if (
    store.getState().promises?.orderHistory?.status === "FULFILLED" &&
    hash.startsWith("#/order-history")
  ) {
    renderOrderHistory(store.getState().promises.orderHistory.payload);
  }
});
