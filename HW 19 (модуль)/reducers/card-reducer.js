function localStoredReducer(originalReducer, localStorageKey) {
  let isFirstRun = true;

  const storedState = localStorage.getItem(localStorageKey);

  let initialState = storedState ? JSON.parse(storedState) : undefined;

  return function wrappedReducer(state = initialState, action) {
    if (isFirstRun && initialState) {
      isFirstRun = false;
      return initialState;
    }

    const newState = originalReducer(state, action);

    localStorage.setItem(localStorageKey, JSON.stringify(newState));

    return newState;
  };
}

function initialCartReducer(state = {}, action) {
  switch (action.type) {
    case "CART_ADD":
      return {
        ...state,
        [action.good._id]: {
          good: action.good,
          count:
            (state[action.good._id]
              ? parseInt(state[action.good._id].count)
              : 0) + parseInt(action.count),
        },
      };
    case "CART_SUB": {
      const newStateSub = { ...state };
      const updatedCountSub =
        (state[action.good._id] ? parseInt(state[action.good._id].count) : 0) -
        parseInt(action.count);
      if (updatedCountSub <= 0) {
        delete newStateSub[action.good._id];
      } else {
        newStateSub[action.good._id] = {
          ...state[action.good._id],
          count: updatedCountSub,
        };
      }
      return newStateSub;
    }
    case "CART_DEL": {
      const newStateDel = { ...state };
      delete newStateDel[action.good._id];
      return newStateDel;
    }
    case "CART_SET":
      if (action.count <= 0) {
        const newStateSet = { ...state };
        delete newStateSet[action.good._id];
        return newStateSet;
      }
      return {
        ...state,
        [action.good._id]: {
          good: action.good,
          count: action.count,
        },
      };
    case "CART_CLEAR":
      return {};

    default:
      return state;
  }
}

export const cartReducer = localStoredReducer(initialCartReducer, "cart");
