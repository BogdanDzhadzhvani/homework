import { jwtDecode } from "../utils.js";

export function authReducer(state = {}, action) {
  const { type, token } = action;
  switch (type) {
    case "AUTH_LOGIN":
      localStorage.setItem("token",token)
      return {
        ...state,
        token,
        payload: jwtDecode(token),
      };
    case "AUTH_LOGOUT":
      localStorage.removeItem("token")
      return {};
    default:
      return state;
  }
}
