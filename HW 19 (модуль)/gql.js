function getGql(url) {
  return async (query, variables) => {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const token = localStorage.getItem("token");

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data[Object.keys(data.data)[0]];
  };
}

const customGql = getGql("http://shop-roles.node.ed.asmer.org.ua/graphql");

export async function getOneCategory(id) {
  try {
    const query = `
        query oneCat($q: String) {
          CategoryFindOne(query: $q) { 
            _id 
            name 
            image {
              url
            } 
            goods {
              _id 
              name 
              price 
              images {
                url
              }
            }
          }
        }
      `;

    const variables = {
      q: `[{"_id": "${id}"}]`,
    };

    const resCategoryFind = await customGql(query, variables);

    return resCategoryFind;
  } catch (error) {
    console.error("getOneCategory", error);
  }
}

export const getAllCategories = async () => {
  try {
    const query = `
      query roots ($q: String){
        CategoryFind(query: $q) {
          _id
          name
          parent {
            _id
            createdAt
            name
          }
          goods {
            _id
            name
          }
        }
      }
    `;

    const variables = {
      q: `[{"parent": null}]`,
    };

    const categories = await customGql(query, variables);
    return categories;
  } catch (error) {
    console.log("Error in gqlCategoryFind:", error);
    throw error;
  }
};

export const gqlGoodFind = async (id) => {
  try {
    const query = `
  query categories($q: String){
    GoodFindOne(query: $q){
        _id description name price images {
          _id
          createdAt
          text
          url
          originalFileName
        } 
  }}`;

    const variables = {
      q: `[{"_id": "${id}"}]`,
    };

    const good = await customGql(query, variables);
    return good;
  } catch (error) {
    console.log(`goodFineErorr`, error);
  }
};

export const mutationRegister = async (login, password) => {
  try {
    const mutation = `
  mutation register($login:String, $password: String){
    UserUpsert(user: {login:$login, password: $password}){
         login createdAt
    }
}
`;

    const variables = {
      login,
      password,
    };

    const registration = await customGql(mutation, variables);
    return registration;
  } catch (error) {
    console.error("mutationRegistr", error);
  }
};

export const autLogin = async (login, password) => {
  try {
    const query = `
    query login($login: String, $password: String) {
      login(login: $login, password: $password)
    }
  `;
    const variables = {
      login,
      password,
    };

    const token = await customGql(query, variables);
    return token;
  } catch (error) {
    console.error("authLogin", error);
  }
};

export const gqlOrderHistory = () =>
  customGql(
    `
    query OrderHistory {
      OrderFind(query: "[{}]") {
        _id
        total
        orderGoods {
          _id
          count
          price
          goodName 
          good {
            _id
            name
            price
            images {
              url
            }
          }
         
            }
          }
        }
`,
    {}
  );
