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

{ 
    let userAge = prompt (`Скільки вам років?`);
    function age (userAge) {
        return userAge || alert (`Введіть норм число`)
    }
}

{
    let login = prompt(`Введіть логін:`);
    let password = prompt (`Введіть пароль:`)
    let correctLogin = `admin`;
    let correctPassword = `qwerty`;

    function loginAndPassword (correctLogin,correctPassword) {
        return correctLogin === login && password === correctPassword;
    }
}

{
    const bad = ['бляха', 'муха', "пляшка", "шабля"];
    const input = prompt(`Введіть некоректне слово:`);

    function filter() {
        const array = input.split(` `);
        const filteredArray = array.filter(word => !bad.includes(word));
        const result = filteredArray.join(` `);
        return result;
        }

    const filteredResult = filter();
    console.log(filteredResult);
}

{
    function CurrencyTable() {
        return fetch('https://open.er-api.com/v6/latest/USD')
            .then(res => res.json())
            .then(data => {
                const rates = data.rates;
                let tableData = [];
                for (const currency in rates) {
                    tableData.push([currency, rates[currency]]);
                }
                return tableData;
            });
    }    
}

{
    function newForm(obj) {
        let form = `<form>`;
        for (const key in obj) {
            let type = "text";
            if (typeof obj[key] === `number`) {
                type = "number";
            } else if (typeof obj[key] === `boolean`) {
                type = "checkbox";
            }
            const label = `<label>${key}<input type="${type}" value="${obj[key]}"/></label>`;
            form += label;
        }
        form += `</form>`;
        document.write(form);
    }
    
    const car = {
        "Name": "chevrolet chevelle malibu",
        "Cylinders": 8,
        "Displacement": 307,
        "Horsepower": 130,
        "Weight_in_lbs": 3504,
        "Origin": "USA",
        "in_production": false
    };
    
    newForm(car);
}

{
    var persons = [
        {name: "Іван", age: 17},
        {name: "Марія", age: 35},
        {name: "Олексій", age: 73},
        {name: "Яків", age: 12},
    ]

    function sortAge (array,key) {
        return array.sort(function (a,b) {
            var x = a[key];
            var y = b[key];
            return x-y;
        })
    }

    function sortName(array, key) {
        return array.sort(function(a, b) {
            var nameA = a[key].toLowerCase();
            var nameB = b[key].toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })
    }

    console.log(sortAge(persons, `age`));
    console.log(sortName(persons, `name`));
}

{
    const persons = [
        {
            name: 'Марія',
            fatherName: 'Іванівна',
            surname: 'Іванова',
            sex: 'female'
        },
        {
            name: 'Миколай',
            fatherName: 'Іванович',
            surname: 'Іванов',
            age: 15
        },
        {
            name: 'Петро',
            fatherName: 'Іванович',
            surname: 'Іванов',
            married: true
        },
    ];
    
    let columns = [];
    for (const person of persons) {
        for (const key of Object.keys(person)) {
            if (!columns.includes(key)) {
                columns.push(key);
            }
        }
    }
    
    document.write('<table>');
    document.write('<tr>');
    for (const column of columns) {
        document.write(`<th>${column}</th>`);
    }
    document.write('</tr>');
    
    for (const person of persons) {
        document.write('<tr>');
        for (const column of columns) {
            document.write(`<td>${person[column] || ''}</td>`);
        }
        document.write('</tr>');
    }  
        document.write('</table>'); 

        function Table(array, sortField, sortOrder) {
            // Копіюємо вихідний масив, щоб не змінювати оригінал
            const sortedArray = array.slice();
        
            // Сортуємо масив за допомогою функції з попереднього завдання
            sortedArray.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a[sortField] > b[sortField] ? 1 : -1;
                } else {
                    return a[sortField] < b[sortField] ? 1 : -1;
                }
            });
        
            let columns = [];
            for (const item of sortedArray) {
                for (const key of Object.keys(item)) {
                    if (!columns.includes(key)) {
                        columns.push(key);
                    }
                }
            }
        
            document.write('<table>');
            document.write('<tr>');
            for (const column of columns) {
                document.write(`<th>${column}</th>`);
            }
            document.write('</tr>');
        
            for (const item of sortedArray) {
                document.write('<tr>');
                for (const column of columns) {
                    document.write(`<td>${item[column] || ''}</td>`);
                }
                document.write('</tr>');
            }
            document.write('</table>');
        }
        
        const personsTable = [
            {name: 'Марія', fatherName: 'Іванівна', surname: 'Іванова', sex: 'female'},
            {name: 'Миколай', fatherName: 'Іванович', surname: 'Іванов', age: 15},
            {name: 'Петро', fatherName: 'Іванович', surname: 'Іванов', married: true},
        ];
        
        Table(personsTable, 'age', 'asc'); // сортування за віком за зростанням
        Table(personsTable, 'name', 'desc'); // сортування за іменем за спаданням
        
}

{
    let liters = 10;
    let fuelPrice = 50;
    const fuelCosts = () => liters * fuelPrice;
}