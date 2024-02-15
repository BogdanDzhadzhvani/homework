{
    let number = prompt(`Введіть число:`);
    if (!isNaN (+number)) { if (+number%2 === 0) {
        alert (`Ви ввели парне число!`);
    }
    else {
        alert (`Ви ввели непарне число!`);
    }
    }
    else {
        alert (`Введіть чило, не дічь!`);
    }
}

{
    let str = prompt(`Введіть рядок:`);
    if (!(str.indexOf(`жопа`))) {
        alert (`Ви ввели слово "жопа" , не матюкайтесь`);
    }
    else {
        alert (`Ви не ввели слово "жопа", молодець!`)
    }
}

{
    let question = confirm (`Вам є 18 років?`);
    let question2 = confirm (`Вам більше 18 років?`);
    let question3 = confirm (`Вам набагато більше 18 років?(`);
}

{
    let question = confirm (`Вам є 18 років?`);
    if(question) {
        alert ('Це добре, ви дорослий')
    }
    else {
        alert (`Вам ще рано`)
    }

    let question2 = confirm (`Вам більше 18 років?`);
    if(question) {
        alert ('Це ще не багато!')
    }
    else {
        alert (`Вам ще рано`);}

    let question3 = confirm (`Вам набагато більше 18 років?(`);
    if(question) {
        alert ('Проте ви досвідчений')
    }
    else {
        alert (`Це ще не багато!`);}
}

{
    let sizeUK = prompt (`Введіть розмір одягу (парне,від 8 до 22) в Англійській системі розмірів:`);
        if (+sizeUK === 8) {
        alert (`Ваш розмір в Американській системі розмірів: 6`);
    }
    if (+sizeUK === 10) {
        alert (`Ваш розмір в Американській системі розмірів: 8`);
    }
    if (+sizeUK === 12) {
        alert (`Ваш розмір в Американській системі розмірів: 10`);
    }
    if (+sizeUK === 14) {
        alert (`Ваш розмір в Американській системі розмірів: 12`);
    }
    if (+sizeUK === 16) {
        alert (`Ваш розмір в Американській системі розмірів: 14`);
    }
    if (+sizeUK === 18) {
        alert (`Ваш розмір в Американській системі розмірів: 16`);
    }
    if (+sizeUK === 20) {
        alert (`Ваш розмір в Американській системі розмірів: 18`);
    }
    if (+sizeUK === 22) {
        alert (`Ваш розмір в Американській системі розмірів: 20`);
    }
    if (!isNaN(+sizeUK)) {

    }
    else {
        alert ('Введіть число!')
    }
    if (+sizeUK%2 === 0) {

    }
    else {
        alert (`Введіть парне число!`)
    }
    if (+sizeUK>22 || +sizeUK<8) {
        alert (`Введіть парне значенння від 8 до 22!`)
    }

}

{
    let yorsex = confirm (`Ви чоловік?`) ? 'Ви чоловік' : 'Ви жінка';
    alert (yorsex);
}

{
    let age = prompt("Напишіть Ваш вік:");
    if (isNaN(+age)) {
        alert("Будь-ласка, введіть число!");
    } else {
        let year = 2024 - (+age);
        alert("Ваш рік народження: " + year);
    }
}

{
    let shoping = confirm("шопінг?") || alert("Ти - бяка");
}

{
    let shoping = confirm(`шопінг?`)
    if (shoping) {
    }
    else {
        alert(`Ти - бяка`);
    }
}

{
    let login = prompt(`Введіть логін:`);
    if (login===`admin`) {
        let password = prompt(`Введіть пароль:`);
        if (password === `qwerty`) {
            alert (`Вітаю!`)}
            else {
                alert (`Ви ввели невірний пароль!`)
            }
    }
    else {
        alert (`Ви ввели невірний логін або пароль!`);
    }
}

{
    let options = [`камінь`, `ножиці`, `папір`];
    let user = prompt(`Виберіть: камінь, ножиці або папір?`).toLowerCase();
    let computer = options[Math.floor(Math.random() * options.length)];
    alert(`Комп'ютер вибрав:`  + computer);
    let result;
    if (user === computer) {
        result = `Нічия!`;
    } else if (
        (user === `камінь` && computer === `ножиці`) ||
        (user === `ножиці` && computer === `папір`) ||
        (user === `папір` && computer === `камінь`)
    ) {
        result = `Ви перемогли!`;
    } else {
        result = `Комп'ютер переміг!`;
    }
    alert(result);
}