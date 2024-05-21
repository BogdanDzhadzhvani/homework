const actionPending = (name) => ({ type: "PROMISE_PENDING", name });
  const actionFulfilled = (name, payload) => ({
    type: "PROMISE_FULFILLED",
    name,
    payload,
  });
  const actionRejected = (name, error) => ({
    type: "PROMISE_REJECTED",
    name,
    error,
  });

export const actionPromise = (name, promise) => {
    return (dispatch) => {
      dispatch(actionPending(name));
      promise
        .then((payload) => {
          dispatch(actionFulfilled(name, payload));
        })
        .catch((error) => {
          dispatch(actionRejected(name, error));
        });
    };
  };