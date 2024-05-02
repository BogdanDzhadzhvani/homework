{
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

  function promiseReducer(state = {}, action) {
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

  const actionPromise = (name, promise) => {
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

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const store = createStore(promiseReducer);

  store.subscribe(() => console.log(store.getState())); //має запускатися 6 разів

  store.dispatch(actionPromise("delay", delay(1000)));
  store.dispatch(
    actionPromise(
      "luke",
      fetch("https://swapi.dev/api/people/1").then((res) => res.json())
    )
  );
  store.dispatch(
    actionPromise(
      "tatooine",
      fetch("https://swapi.dev/api/planets/1").then((res) => res.json())
    )
  );
}

{
  function jwtDecode(token) {
    if (!token || typeof token !== `string`) {
      return undefined;
    }
    const parts = token.split(`.`);
    if (parts.length !== 3) {
      return undefined;
    }
    const midlleParts = parts[1];

    try {
      const decodeMiddleParts = window.atob(midlleParts);

      const parse = JSON.parse(decodeMiddleParts);

      return parse;
    } catch (error) {
      return undefined;
    }
  }

  function authReducer(state = {}, action) {
    const { type, token } = action;
    switch (type) {
      case "AUTH_LOGIN":
        return {
          token,
          payload: jwtDecode(token),
        };
      case "AUTH_LOGOUT":
        return {};
      default:
        return state;
    }
  }

  //Для перевірки
  const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });
  const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2Mzc3ZTEzM2I3NGUxZjVmMmVjMWMxMjUiLCJsb2dpbiI6InRlc3Q1IiwiYWNsIjpbIjYzNzdlMTMzYjc0ZTFmNWYyZWMxYzEyNSIsInVzZXIiXX0sImlhdCI6MTY2ODgxMjQ1OH0.t1eQlRwkcP7v9JxUPMo3dcGKprH-uy8ujukNI7xE3A0";

  const store = createStore(authReducer);
  store.subscribe(() => console.log(store.getState()));

  store.dispatch(actionAuthLogin(token));

  store.dispatch(actionAuthLogout());

  
}

{
  function cartReducer(state = {}, action) {
    switch (action.type) {
      case "CART_ADD":
        return {
          ...state,
          [action.good._id]: {
            good: action.good,
            count:
              (state[action.good._id] ? state[action.good._id].count : 0) +
              action.count,
          },
        };
      case "CART_SUB": {
        const newStateSub = { ...state };
        const updatedCountSub =
          (state[action.good._id] ? state[action.good._id].count : 0) -
          action.count;
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

  const actionCartAdd = (good, count = 1) => ({
    type: "CART_ADD",
    count,
    good,
  });
  const actionCartSub = (good, count = 1) => ({
    type: "CART_SUB",
    count,
    good,
  });
  const actionCartDel = (good) => ({ type: "CART_DEL", good });
  const actionCartSet = (good, count = 1) => ({
    type: "CART_SET",
    count,
    good,
  });
  const actionCartClear = () => ({ type: "CART_CLEAR" });

  const store = createStore(cartReducer);

  store.subscribe(() => console.log(store.getState())); //

  console.log(store.getState()); //{}

  store.dispatch(actionCartAdd({ _id: "пиво", price: 50 }));
  // {пиво: {good: {_id: 'пиво', price: 50}, count: 1}}
  store.dispatch(actionCartAdd({ _id: "чіпси", price: 75 }));
  // {
  // пиво: {good: {_id: 'пиво', price: 50}, count: 1},
  // чіпси: {good: {_id: 'чіпси', price: 75}, count: 1},
  //}
  store.dispatch(actionCartAdd({ _id: "пиво", price: 50 }, 5));
  // {
  // пиво: {good: {_id: 'пиво', price: 50}, count: 6},
  // чіпси: {good: {_id: 'чіпси', price: 75}, count: 1},
  //}
  store.dispatch(actionCartSet({ _id: "чіпси", price: 75 }, 2));
  // {
  // пиво: {good: {_id: 'пиво', price: 50}, count: 6},
  // чіпси: {good: {_id: 'чіпси', price: 75}, count: 2},
  //}

  store.dispatch(actionCartSub({ _id: "пиво", price: 50 }, 4));
  // {
  // пиво: {good: {_id: 'пиво', price: 50}, count: 2},
  // чіпси: {good: {_id: 'чіпси', price: 75}, count: 2},
  //}

  store.dispatch(actionCartDel({ _id: "чіпси", price: 75 }));
  // {
  // пиво: {good: {_id: 'пиво', price: 50}, count: 2},
  //}

  store.dispatch(actionCartClear());

  
}

{
  const gqlCategoryFind = () => gql`
  query roots {
    categories {
      CategoryFind(query:"[{}]") {
        parent {
          _id
          createdAt
          name
        }
      }
    }
  }
`;
const categoryFind = () =>
     actionPromise('categoryFind', gqlCategoryFind())

}

{
  const gqlCategoryFindOne = () => gql`
  query categories{
    CategoryFindOne(query:"[{}]"){
        _id goods {
          _id
          createdAt
          name
          description
          price
          orderGoods {
            _id
            createdAt
            price
            count
            goodName
            total
          }
          categories {
            _id
            createdAt
            name
          }
          images {
            _id
            createdAt
            text
            url
            originalFileName
          }
        }
    }
}`;

const categoryFindOne = () =>
     actionPromise('categoryFindOne', gqlCategoryFindOne())
}

{
  const gqlGoodFind = () => `
  query categories{
    GoodFindOne(query:"[{}]"){
        _id description name images {
          _id
          createdAt
          text
          url
          originalFileName
        } 
  }}`;
  const goodFind = () =>
     actionPromise('goodFind', gqlGoodFind())
}

{
  const mutationRegister = (login, password) => gql(`
  mutation register($login:String, $password: String){
    UserUpsert(user: {login:$login, password: $password}){
         login createdAt
    }
}
`);
const registerMutation = mutationRegister("example_login", "example_password");
}

{
  const autLogin = (login, password) => gql(`
  query login($login: String, $password: String) {
    login(login: $login, password: $password)
  }
`);
}

{
  const gqlOrderHistory = () => gql(`
  query OrderHistory {
    OrderFind(query: "[{}]") {
      _id
      total
      orderGoods {
        _id
        goodName 
      }
    }
  }
`);

const actionOrderHistory = () => actionPromise('orderHistory', gqlOrderHistory());

}

{
  
  const actionFullOrder = (cart) => async (dispatch, getState) => {
    if (!cart) {
        return [];
    }
    const order = cart.map(item => ({
        goodId: item._id, 
        count: item.count
    }));

    try {
        const response = await fetch('http://shop-roles.node.ed.asmer.org.ua/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation OrderUpsert($order: OrderInput) {
                        OrderUpsert(order: $order) {
                            _id
                            orderGoods {
                                _id
                                count
                                good {
                                    _id
                                    createdAt
                                    name
                                    description
                                    price
                                }
                                order {
                                    _id
                                    createdAt
                                    total
                                }   
                            }
                        }
                    }
                `,
                variables: {
                    order: order
                }
            })
        });

        const responseData = await response.json();

        if (response.ok) {
            dispatch(actionCartClear());
        } else {
            console.log(`Помилка`) 
        }
    } catch (error) {
        console.log(error)
    }
}


const currentCart = store.getState().cart;


store.dispatch(actionFullOrder(currentCart));

}

{
  async function gql(query, variables = {}) {
    return fetch("http://shop-roles.node.ed.asmer.org.ua/graphql", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;',
            'Accept': 'application/json',
            'Authorization': `Bearer ${store.getState().authReducer.token}` 
        },
        body: JSON.stringify({ query, variables })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }
        
        return data.data[Object.keys(data.data)[0]];
    })
    .catch(error => {
        throw error; 
    });
}

function getGql(url) {
    return async (query, variables) => {
        return gql(query, variables);
    };
}


const customGql = getGql("http://shop-roles.node.ed.asmer.org.ua/graphql");

(async () => {
    try {
        const catQuery = `query cats($q: String){
            CategoryFind(query: $q){
                _id name
            }
        }`;
        const cats = await customGql(catQuery, { q: "[{}]" });
        console.log(cats);

        const loginQuery = `query login($login:String, $password:String){
            login(login:$login, password:$password)
        }`;
        const token = await customGql(loginQuery, { login: "test457", password: "123123" });
        console.log(token);
    } catch (error) {
        console.error(error);
    }
})();

}

{
  
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

// з перевіркою чомусь не виходить, пише нема доступу до localStored

// Перевірка
const store = createStore(localStoredReducer(cartReducer, 'cart'));

store.subscribe(() => console.log(store.getState())); //

store.dispatch(actionCartAdd({_id: 'пиво', price: 50}));
store.dispatch(actionCartAdd({_id: 'чіпси', price: 75}));

}