export function promiseReducer(state = {}, action) {
  const { type, name, payload, error } = action;

  switch (type) {
    case "PROMISE_PENDING":
      return {
        ...state,
        [name]: { status: "PENDING", payload: null, error: null },
      };
    case "PROMISE_FULFILLED":
      return {
        ...state,
        [name]: { status: "FULFILLED", payload, error: null },
      };
    case "PROMISE_REJECTED":
      return {
        ...state,
        [name]: { status: "REJECTED", payload: null, error },
      };
    default:
      return state;
  }
}
