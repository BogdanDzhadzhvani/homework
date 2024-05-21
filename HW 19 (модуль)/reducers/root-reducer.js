import { cartReducer } from "./card-reducer.js"
import { authReducer } from "./auth-reducer.js"
import { promiseReducer } from "./promise-reducer.js"
import { categoryReducer } from "./category-reducer.js"

export function rootReducer(state = {}, action) {
    console.log(`rootreducer`,action.type)
    return {
        auth: authReducer(state.auth, action),
        cart: cartReducer(state.cart, action),
        promises: promiseReducer(state.promises, action),
        categories: categoryReducer(state.categories, action),
    }
}