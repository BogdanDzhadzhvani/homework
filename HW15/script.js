{
    function creatTable(container, data) {
        const table = document.createElement('table');
    
        for (const key in data) {
            const tr = document.createElement('tr');
            const tdKey = document.createElement('td');
            const tdValue = document.createElement('td');
    
            tdKey.textContent = key;
            if (typeof data[key] === 'string' && data[key].includes('https://swapi.dev/api/')) {
                const button = document.createElement('button');
                button.textContent = 'КНОПКА';
                button.onclick = () => {
                    fetch(data[key])
                        .then(res => res.json())
                        .then(newData => {
                            createTable(tdValue, newData);
                        });
                };
                tdValue.appendChild(button);
            } else if (Array.isArray(data[key])) {
                const arrContainer = document.createElement('div');
                data[key].forEach(element => {
                    if (typeof element === 'string' && element.includes('https://swapi.dev/api/')) {
                        const newButton = document.createElement('button');
                        newButton.textContent = 'КНОПКА';
                        newButton.onclick = () => {
                            fetch(element)
                                .then(res => res.json())
                                .then(newData => {
                                    createTable(tdValue, newData);
                                });
                        };
                        arrContainer.appendChild(newButton);
                    }
                });
                tdValue.appendChild(arrContainer);
            } else {
                tdValue.textContent = data[key];
            }
            tr.appendChild(tdKey);
            tr.appendChild(tdValue);
            table.appendChild(tr);
        }
        container.appendChild(table);
        return table;
    }
    
    fetch('https://swapi.dev/api/people/1/')
        .then(res => res.json())
        .then(luke => {
            const container = document.createElement('div');
            document.body.appendChild(container);
            creatTable(container, luke);
        });
    
}

{
    fetch('https://swapi.dev/api/people/1/')
  .then(res => res.json())
  .then(luke => console.log(`fetch`));

  const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

  delay(200)
  .then(result => console.log(`delay`))

  Promise.race([fetch('https://swapi.dev/api/people/1/'),delay(200)])
   .then(function (value) {
    if (typeof value === `object` && value !== null) {
        console.log(`Переміг fetch`)
    } else {
        console.log(`Переміг delay`)
    }
    })
}

{
    function confirmPromise(text){
        return new Promise((fulfill,reject) => {
        if (confirm(text)) {
            fulfill()
        } else {
            reject()
        }
    })
   }
   
   confirmPromise('Проміси це складно?').then(() => console.log('не так вже й складно'),
                                               () => console.log('respect за посидючість і уважність'))
}

{
    function promptPromise(text){
        return new Promise((fulfill,reject) => {
            const name = prompt(text)
            if (name !== null || name !== undefined) {
                fulfill(name)
            } else {
                reject()
            }
        })
   }
   promptPromise("Як тебе звуть?").then(name => console.log(`Тебе звуть ${name}`),
                                          () => console.log('Ну навіщо морозитися, нормально ж спілкувалися'))
}

{
    function Password(parent, open) {
        const container = document.createElement('div');
        parent.appendChild(container);
    
        const userValue = document.createElement('input');
        userValue.placeholder = 'Enter password';
        userValue.type = 'password';
        container.appendChild(userValue);
    
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        container.appendChild(checkbox);
    
        checkbox.addEventListener('change', () => {
            open = checkbox.checked;
            setOpen(open);
            if (this.onOpenChange) {
                this.onOpenChange(open);
            }
        });
    
        userValue.addEventListener('input', () => {
            const text = userValue.value;
            if (this.onChange) {
                this.onChange(text);
            }
        });
    
        function setOpen(newOpen) {
            if (newOpen) {
                userValue.type = 'text';
            } else {
                userValue.type = 'password';
            }
        }
    
        this.getOpen = () => open;
        this.setOpen = setOpen;
        this.setValue = (newValue) => {
            userValue.value = newValue;
            if (this.onChange) {
                this.onChange(newValue);
            }
        };
    
        this.getValue = () => userValue.value;
    
        setOpen(open);
    
        this.setStyle = (style) => {
            Object.assign(userValue.style, style);
        };
    
        this.userValue = userValue;
    
        this.loginInput = userValue;
    
        this.setLogin = (login) => {
            userValue.value = login;
        };
    
        this.getLogin = () => userValue.value;
    
        this.setPassword = (password) => {
            userValue.value = password;
        };
    
        this.getPassword = () => userValue.value;
    }
    
    let p = new Password(document.body, true);
    
    p.onChange = (data) => console.log(data);
    p.onOpenChange = (open) => console.log(open);
    
    p.setValue('qwerty');
    console.log(p.getValue());
    
    p.setOpen(false);
    console.log(p.getOpen());
    
    const password = new Password(document.body, true);
    
    const form = document.createElement(`form`);
    document.body.appendChild(form);
    
    const loginInput = document.createElement('input');
    loginInput.type = 'text';
    loginInput.placeholder = 'Login';
    form.appendChild(loginInput);
    
    loginInput.addEventListener(
        `input`,
        () => {
            loginInputCorrect();
        }
    );
    
    const loginButton = document.createElement(`button`);
    loginButton.innerText = `Login`;
    form.appendChild(loginButton);
    
    function loginInputCorrect() {
        const login = loginInput.value;
        const passwordValue = password.userValue.value;
        loginButton.disabled = login === '' || passwordValue === '';
    }
    
    loginButton.disabled = true;
    
    function loginPromise(parent){
        function executor(resolve, reject){
            const password = p.getPassword()
            const login = p.getLogin()
            if (password !== `` || login !== ``) {
                resolve({password,login})
            } else {
                reject(new Error('Неправильний логін або пароль'))
            }
        }
        
        return new Promise(executor)
    }
    
    
    loginPromise(document.body).then(({login, password}) => console.log(`Ви ввели ${login} та ${password}`))
}