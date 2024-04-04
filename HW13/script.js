{
    function Person(name,surname,fatherName) {
        this.name = function () {
            return name
        }
        this.surname = function () {
            return surname
        }
        this.fatherName = function () {
            if (!fatherName == undefined)
            return fatherName
        else {
            return ` `
        }
        }
        this.getFullName = function () {
            return this.name() + ` ` + this.surname() + ` ` + this.fatherName()
        }
    }

    const a = new Person("Вася", "Пупкін")
    const b = new Person("Ганна", "Іванова")
    const c = new Person("Єлизавета", "Петрова")

    console.log(a.getFullName()) // Василь Пупкін
    a.fatherName = 'Іванович' // Василь Іванович Пупкін

    console.log(b.getFullName()) // Ганна Іванова
}

{
    function Person(fullName) {
        this.fullName = fullName
    }
    Person.prototype.getName = function(){
        return this.fullName.split(` `)[0]
    }
    Person.prototype.getFatherName = function(){
        return this.fullName.split(` `)[1]
    }
    Person.prototype.getSurname = function(){
        return this.fullName.split(` `)[2]
    }
    Person.prototype.getFullName = function(){
        return this.getName() + ` ` + this.getSurname() + ` ` + this.getFatherName()
    }

    const a = new Person("Вася", "Пупкін")
    const b = new Person("Ганна", "Іванова")
    const c = new Person("Єлизавета", "Петрова")

    console.log(a.getFullName()) // Василь Пупкін
    a.fatherName = 'Іванович' // Василь Іванович Пупкін

    console.log(b.getFullName()) // Ганна Іванова

}

{
    function Store(reducer) {
        let state = reducer(undefined, {}); 
        let cbs = []; 
    
        this.getState = () => state;
        this.subscribe = cb => (cbs.push(cb),
            () => cbs = cbs.filter(c => c !== cb));
    
        this.dispatch = action => {
            const newState = reducer(state, action); 
            if (newState !== state) { 
                state = newState; 
                for (let cb of cbs) cb(); 
            }
        };
    }

    const store = new Store(reducer)
}

{
    function Password(parent, open){
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
    }
    
    let p = new Password(document.body, true)
    
    p.onChange = data => console.log(data) 
    p.onOpenChange = open => console.log(open)
    
    p.setValue('qwerty')
    console.log(p.getValue())
    
    p.setOpen(false)
    console.log(p.getOpen())
    
    const password = new Password(document.body, true);
    
    const form = document.createElement(`form`)
    document.body.appendChild(form)
    
    const loginInput = document.createElement('input');
    loginInput.type = 'text';
    loginInput.placeholder = 'Login';
    form.appendChild(loginInput);
    
    loginInput.addEventListener(
        `input`, () => {
            loginInputCorrect()
        }
    )
    
    const loginButton = document.createElement(`button`)
    loginButton.innerText = `Login`
    form.appendChild(loginButton)
    
    function loginInputCorrect() {
        const login = loginInput.value;
        const passwordValue = password.userValue.value;
        loginButton.disabled = login === '' || passwordValue === '';
    }
    
    loginButton.disabled = true;
    
    const correctPassword = new Password(document.body,true)
    
    const checkForm = document.createElement(`form`)
    document.body.appendChild(checkForm)
    
    const checkPassword = document.createElement(`input`)
    checkPassword.type = 'password'
    checkPassword.placeholder = `Repeat password`
    checkForm.appendChild(checkPassword)
    
    function passwordInCorrect() {
        const secondPassword = checkPassword.value
        const passwordValue = correctPassword.userValue.value
        if (secondPassword != passwordValue) {
            correctPassword.setStyle({ borderColor: 'red', color: 'white', fontSize: '13.5px' });
        }
    }

    function checkboxHiden() {
        if (password.getOpen()) {
            checkPassword.style.display = 'none';
        }
    }

    
    
    checkPassword.addEventListener('input', passwordInCorrect)
    

    






    
    
}