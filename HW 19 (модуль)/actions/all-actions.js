import { actionAuthLogin, actionAuthLogout } from "./auth-actions.js";
import { actionCartAdd, actionCartDel,actionCartSet,actionCartSub,actionCartClear} from "./cart-actions.js";

export const allActions = {
    auth: {
        login: actionAuthLogin,
        logout: actionAuthLogout,
        // Добавьте другие действия для авторизации по мере необходимости
    },
    cart: {
        add: actionCartAdd,
        sub: actionCartSub,
        del: actionCartDel,
        set: actionCartSet,
        clear: actionCartClear,
        // Добавьте другие действия для корзины по мере необходимости
    },
    // Добавьте другие объекты действий по мере необходимости
};