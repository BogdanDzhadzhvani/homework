import { gqlOrderHistory } from "../gql.js";
import { actionPromise } from "./promise-actions.js";

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

const actionFullOrder = (cart,token) => async (dispatch) => {
  if (!cart) {
    return [];
  }

  const order = {
    orderGoods: [],
  };

  for (const id of Object.keys(cart)) {
    const orderItem = {
      good: {_id: id},
      count: cart[id].count,
    }

    order.orderGoods.push(orderItem)
  }

  try {
    const response = await fetch(
      "http://shop-roles.node.ed.asmer.org.ua/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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
            order: order,
          },
        }),
      }
    );

    await response.json();

    if (response.ok) {
      dispatch(actionCartClear());
    } else {
      console.log(`Сталась помилка при замовленні`);
    }
  } catch (error) {
    console.log(error);
  }
};

const actionOrderHistory = () => actionPromise('orderHistory', gqlOrderHistory());

export {
  actionCartAdd,
  actionCartSub,
  actionCartDel,
  actionCartSet,
  actionCartClear,
  actionFullOrder,
  actionOrderHistory,
};
