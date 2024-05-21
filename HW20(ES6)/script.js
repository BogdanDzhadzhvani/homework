{
  class Store {
    #reducer;
    #state;
    #cbs = [];

    constructor(reducer) {
      this.#reducer = reducer;
      this.#state = this.#reducer(undefined, {});
    }

    getState() {
      return this.#state;
    }

    subscribe(cb) {
      this.#cbs.push(cb);
      return () => {
        this.#cbs = this.#cbs.filter((c) => c !== cb);
      };
    }

    dispatch(action) {
      if (typeof action === "function") {
        return action(this.dispatch.bind(this), this.getState.bind(this));
      }
      const newState = this.#reducer(this.#state, action);
      if (newState !== this.#state) {
        this.#state = newState;
        this.#cbs.forEach((cb) => cb());
      }
    }

    get state() {
      return this.#state;
    }
  }
}

{
  class Password {
    #container;
    #userValue;
    #checkbox;
    #open;

    constructor(parent, open) {
      this.#container = document.createElement("div");
      parent.appendChild(this.#container);

      this.#userValue = document.createElement("input");
      this.#userValue.placeholder = "Enter password";
      this.#userValue.type = "password";
      this.#container.appendChild(this.#userValue);

      this.#checkbox = document.createElement("input");
      this.#checkbox.type = "checkbox";
      this.#container.appendChild(this.#checkbox);

      this.#checkbox.addEventListener("change", () => {
        this.#open = this.#checkbox.checked;
        this.setOpen(this.#open);
        if (this.onOpenChange) {
          this.onOpenChange(this.#open);
        }
      });

      this.#userValue.addEventListener("input", () => {
        const text = this.#userValue.value;
        if (this.onChange) {
          this.onChange(text);
        }
      });

      this.#open = open;
      this.setOpen(this.#open);

      this.setStyle = (style) => {
        Object.assign(this.#userValue.style, style);
      };

      this.#container.userValue = this.#userValue;
      this.#container.loginInput = this.#userValue;

      this.#container.setLogin = (login) => {
        this.#userValue.value = login;
      };

      this.#container.getLogin = () => this.#userValue.value;

      this.#container.setPassword = (password) => {
        this.#userValue.value = password;
      };

      this.#container.getPassword = () => this.#userValue.value;
    }

    setOpen(newOpen) {
      if (newOpen) {
        this.#userValue.type = "text";
      } else {
        this.#userValue.type = "password";
      }
    }

    getOpen() {
      return this.#open;
    }

    setValue(newValue) {
      this.#userValue.value = newValue;
      if (this.onChange) {
        this.onChange(newValue);
      }
    }

    getValue() {
      return this.#userValue.value;
    }
  }
}

{
  class StoreThunk extends Store {
    constructor(reducer) {
      super(reducer);
    }

    dispatch(action) {
      if (typeof action === "function") {
        return action(this.dispatch.bind(this), this.getState.bind(this));
      }
      super.dispatch(action);
    }
  }
}

{
  class RGB {
    #r;
    #g;
    #b;

    constructor(r = 0, g = 0, b = 0) {
      this.#validateChannel(r);
      this.#validateChannel(g);
      this.#validateChannel(b);
      this.#r = r;
      this.#g = g;
      this.#b = b;
    }

    get r() {
      return this.#r;
    }

    set r(value) {
      this.#validateChannel(value);
      this.#r = value;
    }

    get g() {
      return this.#g;
    }

    set g(value) {
      this.#validateChannel(value);
      this.#g = value;
    }

    get b() {
      return this.#b;
    }

    set b(value) {
      this.#validateChannel(value);
      this.#b = value;
    }

    get rgb() {
      return `rgb(${this.#r},${this.#g},${this.#b})`;
    }

    set rgb(value) {
      const match = value.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/);
      if (match === null) {
        throw new SyntaxError("Invalid RGB syntax");
      }
      const [, r, g, b] = match.map(Number);
      this.#r = r;
      this.#g = g;
      this.#b = b;
    }

    get hex() {
      return `#${this.#r.toString(16).padStart(2, "0")}${this.#g
        .toString(16)
        .padStart(2, "0")}${this.#b.toString(16).padStart(2, "0")}`;
    }

    set hex(value) {
      const match = value.match(
        /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/
      );
      if (match === null) {
        throw new SyntaxError("Invalid hex syntax");
      }
      const [, r, g, b] = match.map((channel) => parseInt(channel, 16));
      this.#r = r;
      this.#g = g;
      this.#b = b;
    }

    #validateChannel(channel) {
      if (
        typeof channel !== "number" ||
        isNaN(channel) ||
        channel < 0 ||
        channel > 255
      ) {
        throw new RangeError("Channel must be a number between 0 and 255");
      }
    }
  }

  const rgb = new RGB();
  rgb.r = 15;
  rgb.g = 128;
  rgb.b = 192;
  console.log(rgb.hex); //#0F80C0
  console.log(rgb.rgb); //rgb(15,128,192)
  rgb.hex = "#2030FF";
  console.log(rgb.rgb); //rgb(32, 48, 255)
  rgb.rgb = "rgb(100, 90, 50)";
  console.log(rgb.r, rgb.g, rgb.b); //100, 90, 50

  try {
    rgb.hex = "діч";
  } catch (error) {
    console.error(error.message);
  }

  try {
    rgb.r = 1000;
  } catch (error) {
    console.error(error.message);
  }
}
