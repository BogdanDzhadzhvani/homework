import { actionAuthLogin, actionAuthLogout } from "./auth-actions.js";
import {
  actionCartAdd,
  actionCartDel,
  actionCartSet,
  actionCartSub,
  actionCartClear,
} from "./cart-actions.js";

export const allActions = {
  auth: {
    login: actionAuthLogin,
    logout: actionAuthLogout,
  },
  cart: {
    add: actionCartAdd,
    sub: actionCartSub,
    del: actionCartDel,
    set: actionCartSet,
    clear: actionCartClear,
  },
};
