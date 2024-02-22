{
    const userKey = prompt("Введіть властивість кота");
    const userValue = prompt('Введіть будь-яке значення цієї властивості')
    const cat = {
        paws: 4,
        mustache: true,
        color: "black"
   }
   cat[userKey] = [userValue];

   const name = prompt("Введіть ім'я собаки:")
   const dog = {
    name: name,
    ...cat
   }
   console.log(dog)
}

{
    const body = {
        tagName: `body`,
        children : [
            {
                tagName: `div`,
                children: [
                    {
                        tagName: `span`,
                        children: [`Enter a data please:`],
                    },
                    {
                        tagName: `/br`,
                    },
                    {
                        tagName: `input`,
                        attrs: {
                            type: `text`,
                            id: `name`,
                        },
                    },
                    {
                        tagName: `input`,
                        attrs: {
                            type: `text`,
                            id: `surname`,
                        },
                    }
                ],
            },
            {
                tagName: `div`,
                children: [
                    {
                        tagName: `button`,
                        children: [`OK`],
                        attrs: {
                            id: `OK`
                        },
                    },
                    {
                        children: [`cancel`],
                        tagName: `button`,
                        attrs: {
                            id: `cancel`
                        },
                    }
                ]
            }

        ]
    }

    body.children[0].parent = body;
    body.children[0].children[0].parent = body.children[0];
    body.children[0].children[1].parent = body.children[0];
    body.children[0].children[2].parent = body.children[0];
    body.children[0].children[3].parent = body.children[0];
    body.children[1].parent = body;
    body.children[1].children[0].parent = body.children[1];
    body.children[1].children[1].parent = body.children[1];
   

    const button = prompt(`Введіть нове значення тега "button":`);
    body.children[1].children[0].attrs.id = button;

    const { children: [{ children: [spanText] }] } = body.children[0];
    console.log(spanText);

    const { children: [{ children: [cancelButtonText] }] } = body.children[1];
    console.log(cancelButtonText);


    const { attrs: { id: surnameId } } = body.children[0].children[3];
    console.log(surnameId);
    
}

{
    let arr = [1,2,3,4,5, "a", "b", "c"]
    let {1: even1} = arr;
    let {3: even2} = arr;
    let {0: odd1} = arr;
    let {2: odd2} = arr;
    let {4: odd3} = arr;
    let [,,,,,...letters] = arr;
    console.log(even1,even2,odd1,odd2,odd3,letters);
}

{
    let arr = [1, "abc"]
    let {0:number} = arr;
    let [s1,s2,s3] = arr[1];
    console.log(number)
    console.log(s1,s2,s3)
}

{
    let obj = {name: 'Ivan',
           surname: 'Petrov',
           children: [{name: 'Maria'}, {name: 'Nikolay'}]}

    let { children: [child1, child2] } = obj;
    let { name: name1 } = child1;
    let { name: name2 } = child2;
    console.log(name1, name2);
}

{
    let arr = [1,2,3,4, 5,6,7,10]
    let {0:a,1:b,length} = arr;
    console.log(a,b,length)
}

{
    const userKey = prompt("Введіть властивість кота");
    const userValue = prompt('Введіть будь-яке значення цієї властивості');
    const cat = {
    paws: 4,
    mustache: true,
    color: "black"
        };
    cat[userKey] = userValue;
    console.log(cat);
    const { [userKey]: nonkey, ...restOfFields } = cat;
    console.log(restOfFields);
}

{
    {
        fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
         .then(data => {
                //ця функція запускається коли дані завантажуються.
                //Інший код працює РАНIШЕ.
                //тільки тут є змінна data з завантаженими даними
                console.log(data) // Вивчіть структуру, що отримується з сервера в консолі
                const rate = data.rates[userInCurens];
                const result = rate * totalMoney;
                console.log(`${userCurrens}${totalMoney} = ${result}${userInCurens}`)
                
        let str = "<select>";
        for (const currency in data.rates) {
            str += `<option value="${currency}">${currency}</option>`;
        }
        str += "</select>";
        document.write(str)
             })
        const userCurrens = prompt(`Введіть валюту з якої треба конвертувати:`);
        const userInCurens = prompt(`Введіть валюту в яку треба конвертувати:`)
        const totalMoney = parseFloat(prompt(`Введіть суму в ${userCurrens}`))
    }
}

{
    const car = {
        "Name":"chevrolet chevelle malibu",
        "Cylinders":8,
        "Displacement":307,
        "Horsepower":130,
        "Weight_in_lbs":3504,
        "Origin":"USA",
        "in_production": false
  }
  let form = `<form>` 
  for (const key in car) {
    let type = " "
    if (typeof car[key]===`string`) {
      type = "text"
    }
    if (typeof car[key]===`number`) {
      type = "number"
    }
    if (typeof car[key]===`boolean`) {
      type = "checkbox"
    }
    const label =`<label>${key}<input type="${type}" value="${car[key]}"/></label>`
    console.log(label)
    form+=label;
  }
  form += `</form>`
  document.write(form)
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
}    