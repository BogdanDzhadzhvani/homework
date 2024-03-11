{
    let a = 10
{
    let b = 20
    {
        let c = 30
        //які тут будуть значення змінних a, b, c, d (a=100;b=21;c=30;d не буде)
        
        b++
        a *= 10
    }
    {
        let c = 50
        //які тут будуть значення змінних a, b, c, d (а=100;b=521;c=50)
        b += 500
    }
    {
        const a = 100500
        const d = "value"
        //які тут будуть значення змінних a, b, c, d (a=100500;b=521;c=50;d=`value`)
        {
            let a = -50
            b     = 1000
            //які тут будуть значення змінних a, b, c, d (a=-50;b=1000;c=50;d=`value`)
        }
        //які тут будуть значення змінних a, b, c, d (a=100500;b=521;c=50;d=`value`)
    }
    //які тут будуть значення змінних (a=100;b=521;c=50;d=`value`)
}
//які тут будуть значення змінних a, b, c, d (a=100;b=521;c=50;d=`value`)
}

{
    var age = +prompt(`Скільки вам років?`, ``);

    if (age<0) {
        alert (`Вас не існує`)
    } else {
        if (age<18) {
            alert (`Школяр`)
        }
        else {
            if(age>18 && age <30) {
                alert(`молодь`)
            }
            else {
                if (age>30 && age<45) {
                    alert(`зрілість`)
                }
                else {
                    if (age > 45 && age < 60) {
                        alert("захід сонця")
                    }
                    else {
                        if (age > 60) {
                            alert("як пенсія?")
                        }
                    }
                }
            }
        }
    }
}

{
    const sizeUK = prompt (`Введіть розмір одягу (парне,від 8 до 22) в Англійській системі розмірів:`);
    switch(sizeUK) {
        case `8`:
            alert (`Ваш розмір в Американській системі розмірів: 6`);
            break;
        case `10`:
            alert (`Ваш розмір в Американській системі розмірів: 8`);
            break;
        case `12`:
            alert (`Ваш розмір в Американській системі розмірів: 10`);
            break;
        case `14`:
            alert (`Ваш розмір в Американській системі розмірів: 12`);
            break;
        case `16`:
            alert (`Ваш розмір в Американській системі розмірів: 14`);
            break;
        case `18`:
            alert (`Ваш розмір в Американській системі розмірів: 16`);
            break;
        case `20`:
            alert (`Ваш розмір в Американській системі розмірів: 18`);
            break;
        case `22`:
            alert (`Ваш розмір в Американській системі розмірів: 20`);
            break;
        default:
         console.log('шото я не зрозумів')
    }
}

{
    let color = prompt("Введіть колір","");
        if (color===`red` || color=== `black`) {
      document.write("<div style='background-color: red;'>червоний</div>");
      document.write("<div style='background-color: black; color: white;'>чорний</div>");
    }
    else if (color===`blue` || color=== `green`) {
        document.write("<div style='background-color: blue;'>синій</div>");
        document.write("<div style='background-color: green;'>зелений</div>");
    }
    else {
        document.write("<div style='background-color: gray;'>Я не зрозумів</div>");
    }
}

{
    const noSwitch = (key, cases, defaultKey='default') => {
        if (key in cases) {
            cases[key]()
        }
    else {
            cases[defaultKey]()
        }
    }
    
    const drink = prompt("Що ви любите пити")
    noSwitch(drink, {
        воду: () => console.log('Найздоровіший вибір!'),
        чай(){
            console.log('Смачна та корисна штука. Не перестарайтеся з цукром')
        },
        "пиво": () => console.log('Добре влітку, та в міру'),
        віскі: function(){
            console.log('Та ви, батечку, естет! Не забудьте лід і сигару')
        },
        default(){
            console.log('шото я не зрозумів')
        }
    })
}

{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
     .then(data => {
            const container = document.createElement(`div`)
            const rates = data.rates
            for (const rate in rates) {
                const newButton = document.createElement(`button`);
                newButton.innerText = rate;
                newButton.onclick = () => {
                    const sum = prompt(`Введіть суму яку хочете поміняти в ${rate}`)
                    const result = sum * rates[rate]
                    alert (result)
                }
                container.appendChild(newButton)
            }
            document.body.appendChild(container)
            console.log(data) 
        })
}
{
fetch('https://open.er-api.com/v6/latest/USD')
    .then(res => res.json())
    .then(data => {
        const rates = data.rates;
        const rateText = `Кроскурс між валютами`;
        const resultText = `сума у валюті, в яку хочемо поміняти`;
        let crossRate;
        let rateValueFrom;
        let rateValueTo;
        let myCash;

        for (const rate in rates) {
            const newOption = document.createElement(`option`);
            const firstOption = document.createElement(`option`);
            newOption.innerText = rate;
            firstOption.innerText = rate;
            to.appendChild(firstOption);
            from.appendChild(newOption); 
        }

        rateValueFrom = rates[from.value];
        rateValueTo = rates[to.value];
        crossRate =  rateValueTo / rateValueFrom;
        rate.innerText = rateText + ` ` + crossRate;
        

        from.onchange = () => {
            rateValueFrom = rates[from.value];
            crossRate =  rateValueTo / rateValueFrom;
            rate.innerText = rateText + ` ` + crossRate;
        }

        to.onchange = () => {
            rateValueTo = rates[to.value];
            crossRate =  rateValueTo / rateValueFrom;
            rate.innerText = rateText + ` ` + crossRate;
        }

        amount.oninput = () => {
            myCash = crossRate * amount.value;
            result.innerText = resultText + ` ` + myCash;
        }
    });
}

fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.min.json')
    .then(res => res.json())
    .then(data => {
        const countries = data;
        for (const country in countries) {
            const countrySelectOption = document.createElement('option');
            countrySelectOption.innerText = country;
            allcountries.appendChild(countrySelectOption);
        }
        allcountries.onchange = () => {
            allcities.innerHTML = '';
            const selectedCountry = allcountries.value;
            countries[selectedCountry].forEach(city => {
                const citySelectOption = document.createElement('option');
                citySelectOption.innerText = city;
                allcities.appendChild(citySelectOption);
            });
        };
    });