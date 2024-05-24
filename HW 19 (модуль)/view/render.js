export function renderCategories(categories) {
  const aside = document.getElementById(`sidebar`);
  aside.innerHTML = "";
  const rootCategoriesList = document.createElement("ul");
  rootCategoriesList._id = "root-categories";

  if (categories && categories.length > 0) {
    categories.forEach((category) => {
      const listItem = document.createElement(`li`);
      listItem.textContent = category.name;
      listItem.addEventListener(`click`, () => {
        window.location.hash = `#/category/${category._id}`;
      });

      rootCategoriesList.appendChild(listItem);
    });
  } else {
    console.log(`Корневі категорії не знайдено`);
  }
  aside.appendChild(rootCategoriesList);
}

export function renderProductCards(goods) {
  const mainContent = document.getElementById("main");
  mainContent.innerHTML = "";

  goods.forEach((good) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const name = document.createElement("h3");
    name.textContent = good.name;

    const price = document.createElement("p");
    price.classList.add("price");

    price.textContent = `Ціна: ${good.price}`;

    const image = document.createElement("img");
    image.src =
      good.images && good.images.length > 0
        ? `http://shop-roles.node.ed.asmer.org.ua/${good.images[0].url}`
        : "placeholder-image.jpg";

    const orderButton = document.createElement("button");
    orderButton.textContent = "Відкрити";

    card.addEventListener("click", () => {
      window.location.hash = `#/good/${good._id}`;
    });

    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(image);
    card.appendChild(orderButton);

    mainContent.appendChild(card);
  });
}

export function displayProductDetails(good, isAuth, dispatch, actionAddToCart) {
  const mainContent = document.getElementById("main");
  mainContent.innerHTML = "";

  const productContainer = document.createElement("div");
  productContainer.classList.add("product-details");

  const name = document.createElement("h2");
  name.textContent = good.name;

  const image = document.createElement("img");
  image.src =
    good.images && good.images.length > 0
      ? `http://shop-roles.node.ed.asmer.org.ua/${good.images[0].url}`
      : "placeholder-image.jpg";
  image.classList.add("product-image");

  const price = document.createElement("p");
  price.textContent = `Ціна: ${good.price}`;
  price.classList.add("product-price");

  const description = document.createElement("p");
  description.textContent = good.description;
  description.classList.add("product-description");

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.min = "1";
  quantityInput.value = "1";
  quantityInput.classList.add("quantity-input");

  const buyButton = document.createElement("button");
  buyButton.textContent = "Додати в кошик";
  buyButton.classList.add("buy-button");
  buyButton.addEventListener("click", () => {
    dispatch(actionAddToCart(good, quantityInput.value));
  });

  const buyContainer = document.createElement("div");
  buyContainer.classList.add("buy-container");
  buyContainer.appendChild(quantityInput);
  buyContainer.appendChild(buyButton);

  productContainer.appendChild(name);
  productContainer.appendChild(image);
  productContainer.appendChild(price);
  productContainer.appendChild(description);
  if (isAuth) productContainer.appendChild(buyContainer);

  mainContent.appendChild(productContainer);
}

export function renderLoginForm(dispatch, loginAction, registrationAction) {
  if (document.getElementById("login-form")) return;
  const form = document.createElement("form");
  form.setAttribute("action", "#");
  form.setAttribute("method", "post");
  form.setAttribute("id", "login-form");

  const loginInput = document.createElement("input");
  loginInput.setAttribute("type", "text");
  loginInput.setAttribute("name", "login");
  loginInput.setAttribute("placeholder", "Логін");
  loginInput.setAttribute("id", "login");

  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.setAttribute("placeholder", "Пароль");
  passwordInput.setAttribute("id", "password");

  const submitButton = document.createElement("input");
  submitButton.setAttribute("type", "button");
  submitButton.setAttribute("value", "Увійти");
  submitButton.setAttribute("id", "login-button");
  submitButton.addEventListener("click", () => {
    console.log("creds " + loginInput.value, passwordInput.value);
    dispatch(loginAction(loginInput.value, passwordInput.value));
  });

  const registrationButton = document.createElement("input");
  registrationButton.setAttribute("type", "button");
  registrationButton.setAttribute("value", "Registration");
  registrationButton.setAttribute("id", "registration-button");
  registrationButton.addEventListener("click", () => {
    dispatch(registrationAction(loginInput.value, passwordInput.value));
  });

  form.appendChild(loginInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);
  form.appendChild(registrationButton);

  const [profileHeader] = document.getElementsByClassName("profile-header");
  profileHeader.appendChild(form);
}

export function renderUserLoginedState(
  login,
  dispatch,
  actionLogout,
  actionCartClear,
  actionGetFullHistory,
  orderHistory
) {
  if (document.getElementById("login-form")) {
    document.getElementById("login-form").remove();
    const span = document.getElementById("username");
    span.textContent = span.textContent + " " + login;

    const logoutButton = document.createElement("button");
    logoutButton.innerText = "Logout";
    logoutButton.classList.add("logout-button");
    logoutButton.addEventListener("click", () => {
      dispatch(actionLogout());
      dispatch(actionCartClear());
      span.textContent = "Ім'я користувача";
    });

    const historyButton = document.createElement("button");
    historyButton.innerText = "Історія замовлень";
    historyButton.classList.add("history-button");
    historyButton.addEventListener("click", () => {
      window.location.hash = "#/order-history";
      dispatch(actionGetFullHistory(orderHistory));
    });

    const cartButton = document.createElement("button");
    cartButton.innerText = "Корзина";
    cartButton.classList.add("cart-button");
    cartButton.addEventListener("click", () => {
      window.location.hash = "#/cart";
    });

    span.appendChild(logoutButton);
    span.appendChild(historyButton);
    span.appendChild(cartButton);
  }
}

export function renderCart(
  cart,
  dispatch,
  actionCartAdd,
  actionCartSub,
  actionCartDel,
  actionOrder,
  token
) {
  const mainContent = document.getElementById("main");
  mainContent.innerHTML = "";

  const cartContainer = document.createElement("div");
  cartContainer.classList.add("cart-container");

  const displayCart = document.createElement("div");
  displayCart.classList.add("display-cart");

  Object.keys(cart).forEach((cartItemId) => {
    const cartItem = cart[cartItemId];
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    const itemName = document.createElement("h3");
    itemName.textContent = cartItem.good.name;
    itemElement.appendChild(itemName);

    const itemImage = document.createElement("img");
    itemImage.src = `http://shop-roles.node.ed.asmer.org.ua/${cartItem.good.images[0].url}`;
    itemImage.alt = cartItem.good.name;
    itemElement.appendChild(itemImage);

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");

    const quantityLabel = document.createElement("span");
    quantityLabel.classList.add("quantity-label");
    quantityLabel.textContent = "Кількість:";
    quantityContainer.appendChild(quantityLabel);

    const quantityControls = document.createElement("div");
    quantityControls.classList.add("quantity-controls");

    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.classList.add("quantity-button");
    addButton.addEventListener("click", () =>
      dispatch(actionCartAdd(cartItem.good))
    );

    const subButton = document.createElement("button");
    subButton.textContent = "-";
    subButton.classList.add("quantity-button");
    subButton.addEventListener("click", () =>
      dispatch(actionCartSub(cartItem.good))
    );

    const itemCount = document.createElement("span");
    itemCount.textContent = parseInt(cartItem.count);
    quantityControls.appendChild(subButton);
    quantityControls.appendChild(itemCount);
    quantityControls.appendChild(addButton);

    quantityContainer.appendChild(quantityControls);
    itemElement.appendChild(quantityContainer);

    const delButton = document.createElement("button");
    delButton.textContent = "Видалити";
    delButton.classList.add("order-button");
    delButton.addEventListener("click", () =>
      dispatch(actionCartDel(cartItem.good))
    );
    itemElement.appendChild(delButton);

    displayCart.appendChild(itemElement);
  });

  cartContainer.appendChild(displayCart);

  const orderButton = document.createElement("button");
  orderButton.textContent = "Замовити";
  orderButton.classList.add("order-button");
  orderButton.addEventListener("click", () => {
    dispatch(actionOrder(cart, token));
    window.location.hash = "#/order-history";
    mainContent.innerHTML = "";
  });

  cartContainer.appendChild(orderButton);
  mainContent.appendChild(cartContainer);
}

export function renderOrderHistory(orderHistory) {
  const mainContent = document.getElementById("main");
  mainContent.innerHTML = "";

  orderHistory.forEach((order) => {
    order.orderGoods.forEach((orderItem) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const image = document.createElement("img");
      image.src = `http://shop-roles.node.ed.asmer.org.ua/${orderItem.good.images[0].url}`;
      image.alt = orderItem.goodName;

      const title = document.createElement("h3");
      title.textContent = orderItem.goodName;

      const count = document.createElement("p");
      count.textContent = `Кількість: ${orderItem.count}`;

      const price = document.createElement("p");
      price.textContent = `Цена: ${orderItem.good.price}`;

      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(count);
      card.appendChild(price);

      mainContent.appendChild(card);
    });
  });
}
