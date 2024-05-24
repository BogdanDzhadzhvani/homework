import { autLogin, mutationRegister } from "../gql.js";

const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });

const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });

const actionRegistration = (login, password) => {
  return async (dispatch) => {
    await mutationRegister(login, password);
    const token = await autLogin(login, password);
    return dispatch(actionAuthLogin(token));
  };
};

const actionLogin = (login, password) => {
  return async (dispatch) => {
    const token = await autLogin(login, password);
    return dispatch(actionAuthLogin(token));
  };
};

export { actionAuthLogout, actionRegistration, actionLogin };
