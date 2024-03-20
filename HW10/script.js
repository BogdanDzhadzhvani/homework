{
    {
        function temperature (temp,degrees) {
            if (degrees === `C`) {
            return (temp * 9 / 5) + 32;
            }
            else if (degrees === `F`) {
            return ((temp - 32) * 5 / 9);
            }
        else {
            return (`Введіть значення в градусах C або F`)
        }
    }
    }

    {
        function convertColor (r,g,b) {
            const color = value => (value < 16 ? `0` : ``) + value.toString(16);
            return (`#${color(r)}${color(g)}${color(b)}`)
        }
    }

    {
        function flats(floors, apartmentsOnFloors, apNumber) {
            const entrance = Math.ceil(apNumber / apartmentsOnFloors / floors);
            const floor = apNumber % apartmentsOnFloors;

            return { entrance, floor };
        }
    }

    {   
        function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
        }

        function credentials () {
            let lastName = prompt (`Введіть Ваше прізвище:`);
            let name = prompt (`Введіть Ваше ім'я:`);
            let surName = prompt (`Введіть Ваше По-батькові:`); 

            let fullName = capitalize(name) + ` ` + capitalize(lastName) + ` ` + capitalize(surName);
            return {name,lastName,surName,fullName}
        }
    }

    {
        let inputUser = prompt (`Введіть багаторядковий рядок використовуючи "\\n" як маркер нового рядка:`);
        let str = inputUser.split(`\\n`);
        let result = str.join(`\n`);
        alert(result);

        function replaceNewline(str) {
        return str.replace(/\\n/g, '\n');
        }

    }
}

{
    function createPerson(name,surname) {
        return {
        name: name,
        surname: surname,
        fatherName: ``,
        getFullName: function () {
            return `${this.name} ${this.fatherName} ${this.surname}`
        }
        };
    }

    const a = createPerson("Вася", "Пупкін")
    const b = createPerson("Ганна", "Іванова")
    const c = createPerson("Єлизавета", "Петрова")

    console.log(a.getFullName()) //Вася Пупкін
    a.fatherName = 'Іванович'    
    console.log(a.getFullName()) //Вася Іванович Пупкін

    console.log(b.getFullName()) //Ганна Іванова
}

{
    function createPersonClosure(name, surname) {
        let age = "";
        let fatherName = "";
    
        return {
            getName: () => `${name}`,
            getSurname: () => `${surname}`,
            getFatherName: () => `${fatherName}`,
            getAge: () => `${age}`,
            getFullName: () => `${name} ${surname} ${fatherName}`,
            setName: (newName) => {
                if (typeof newName === 'string' && newName[0] === newName[0].toUpperCase()) {
                    name = newName;
                }
                return `${name}`;
            },
            setSurname: (newSurname) => {
                if (typeof newSurname === 'string' && newSurname[0] === newSurname[0].toUpperCase()) {
                    surname = newSurname;
                }
                return `${surname}`;
            },
            setFatherName: (newFatherName) => {
                if (typeof newFatherName === 'string' && newFatherName[0] === newFatherName[0].toUpperCase()) {
                    fatherName = newFatherName;
                }
                return `${fatherName}`;
            },
            setAge: (newAge) => {
                if (newAge >= 0 && newAge <= 100) {
                    age = newAge;
                }
                return `${age}`;
            },
            setFullName: (fullName) => {
                const newFullName = fullName.split(' ');
                if (newFullName.length === 3) {
                    name = newFullName[0];
                    surname = newFullName[1];
                    fatherName = newFullName[2];
                }
            }
        };
    }
    
    const a = createPersonClosure("Вася", "Пупкін")
    const b = createPersonClosure("Ганна", "Іванова")
    console.log(a.getName())
    a.setAge(15)
    a.setAge(150) //не працює

    b.setFullName("Петрова Ганна Миколаївна")
    console.log(b.getFatherName()) //Миколаївна

    function createPerson(name,surname,fatherName,age) {
        return {name,surname,fatherName,age};
    }

    function createPersonClosureDestruct({name=`Анон`, surname = `Анонов`, fatherName = `Анонович`, age = `не понятно`} = {} ) {
        return `${name} ${surname} ${fatherName} ${age}`
    }
}

{
    const arr = new Array(4).fill(1);
    let i = 0;

    function isSort(arr) {
        for (let i = 1; i < arr.length; i++) {
        if (typeof arr[i] !== 'number' || arr[i] < arr[i - 1]) {
            return false;
            }
        }
        return true;
    }

    let userText = prompt(`Введіть число`);
    while (userText !== null && i < arr.length) {
        arr[i] = Number(userText);
        i++;
        userText = prompt(`Введіть ще число`);
    }

    const parent = document.createElement(`form`);
    document.body.appendChild(parent);
    
    const b = createPersonClosure("Ганна", "Іванова")
    b.setAge(15)
    b.setFullName("Петрова Ганна Миколаївна")

    function personForm(parent, person){
        const userInputName = document.createElement(`input`);
        userInputName.type = `text`;
        userInputName.value = person.getName();
        parent.appendChild(userInputName);

        const userInputSurname = document.createElement(`input`);
        userInputSurname.type = `text`;
        userInputSurname.value = person.getSurname();
        parent.appendChild(userInputSurname);

        const userInputFatherName = document.createElement(`input`);
        userInputFatherName.type = `text`;
        userInputFatherName.value = person.getFatherName();
        parent.appendChild(userInputFatherName);

        const userInputAge = document.createElement(`input`);
        userInputAge.type = `number`;
        userInputAge.value = person.getAge();
        parent.appendChild(userInputAge);

        const userInputFullName = document.createElement(`input`);
        userInputFullName.type = `text`;
        userInputFullName.value = person.getFullName();
        parent.appendChild(userInputFullName);

        userInputName.oninput = () => {
        person.setName(userInputName.value);
        };

        userInputSurname.oninput = () => {
            person.setSurname(userInputSurname.value);
            };

        userInputFatherName.oninput = () => {
        person.setFatherName(userInputFatherName.value);
        };

        userInputAge.oninput = () => {
            person.setAge(userInputAge.value);
            };

            userInputFullName.oninput = () => {
                person.setFullName(userInputFullName.value);
                };
    }

    personForm(parent, b);

//

function getSetForm(parent, getSet){
    const inputs = {} 
    
    const updateInputs = () => { 
        for (const key in inputs) {
            const getSlice = `get${key.charAt(0).toUpperCase() + key.slice(1)}`;
            if (getSlice in getSet) {
                inputs[key].value = getSet[getSlice] ();
            }
        }
    }
    
    for (const getSetName in getSet){

        const isGet = getSetName.startsWith('get');
        const fieldName = getSetName.slice(3);
        const setKey    = `set` + fieldName;
        const getKey    = `get` + fieldName;
        
        if (!Object.keys(inputs).includes(fieldName)) {
            const input = document.createElement(`input`)
            inputs[fieldName] = input;
            
            if (!Object.keys(getSet).includes(setKey)) {
                inputs[fieldName].disabled = true;
            }

            const inputType = typeof getSet[getKey]()
            inputs[fieldName].type = inputType;

            inputs[fieldName].placeholder = fieldName;

            inputs[fieldName].value = getSet[getKey]();

            inputs[fieldName].oninput = () => {
                getSet[setKey](inputs[fieldName].value)
            }
        }
    }
    updateInputs()

    for (const input of Object.values(inputs)) {
        parent.appendChild(input)
    }
}

getSetForm(parent, b)
}