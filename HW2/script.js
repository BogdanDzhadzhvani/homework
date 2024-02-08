var a = 5;  
var b, c;

b = (a * 5);  
b = c = (b/2); 


//

let age = prompt ("Напишіть Ваш вік:");
let year = 2024 - age;
let userage = alert ("Ваш рік народження:" +year);
if (isNaN(age)) 
    alert("Будь-ласка,введіть число!");

//

let Celsius = prompt ("Вкажіть температуру в градусах Цельсію:")
let Fahrenheit = Celsius * 9/5 + 32;
let Result = alert ("Температура у Фарінгейтах:" +Fahrenheit);

//

let firstValue = prompt ("Введіть значення яке треба поділити:");
let secondValue = prompt ("Введіть значення на яке треба поділити:");
let formula = Math.round (firstValue/secondValue);
let Calc = alert ("Результат:" +formula);

//

const rate = 37.57;
let dollar = prompt ("Введіть суму в USD:");
let exchangeUAH = dollar * rate;
let UAH = alert ("Сума в UAH:" +exchangeUAH.toFixed(2));
let grivna = prompt ("Введіть суму в UAH:");
let exchangeUSD = grivna / rate;
let USD = alert ("Сума в USD:" +exchangeUSD.toFixed(2));

//

let red = prompt ("Введіть будь-ласка значення червоного колькору від 0 до 255");
let green = prompt ("Введіть будь-ласка значення зеленого колькору від 0 до 255");
let blue = prompt ("Введіть будь-ласка значення синього колькору від 0 до 255");

if (isNaN(red) || isNaN(green) || isNaN(blue) || red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
    alert("Будь-ласка, введіть коректні значення!");
} else {
    let colorHex = "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue);
 alert("Ваш колір CSS: " + colorHex);
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

//

let floors = prompt ("Введіть кількість поверхів:");
let apartmens = prompt ("Введіть кількість квартир на поверсі:");
let number = prompt ("Введіть номер квартири:");

let entrance = Math.ceil((number / apartmens) / floors);
let floor = number % apartmens;
let info = alert ("Номер під'їзду:" +entrance ); 
alert ("Поверх:" +floor);

