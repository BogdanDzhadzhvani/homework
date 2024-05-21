import { jwtDecode } from "../utils.js";

export function authReducer(state = {}, action) {
  const { type, token } = action;
  switch (type) {
    case "AUTH_LOGIN":
      return {
        ...state,
        token,
        payload: jwtDecode(token),
      };
    case "AUTH_LOGOUT":
      return {};
    default:
      return state;
  }
}
