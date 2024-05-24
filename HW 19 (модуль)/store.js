import { rootReducer } from "./reducers/root-reducer.js";

function createStore(reducer) {
  let state = reducer(undefined, {});
  let cbs = [];

  const getState = () => state;
  const subscribe = (cb) => (
    cbs.push(cb), () => (cbs = cbs.filter((c) => c !== cb))
  );

  const dispatch = (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    const newState = reducer(state, action);
    if (newState !== state) {
      state = newState;
      for (let cb of cbs) cb();
    }
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export const store = createStore(rootReducer);
