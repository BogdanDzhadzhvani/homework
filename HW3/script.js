{
    let name = prompt (`Як вас зовуть?`);
    alert (`Вітаю,` +name + `!!!`);
}

{
    let str = prompt (`Введіть будь-ласка декілька слів через кому:`);
    let strComma = str.split (`,`);
    let strAfter = strComma.join (`,блін,`);
    alert (strAfter);
    console.log(strAfter);
}

{
    let str = "cANBerRa";
    let result = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    alert (result);
    console.log(result) //Canberra
}

{
    let str = prompt(`Введіть рядок:`);
    let wordsArray = str.split(` `);
    let wordsCount = wordsArray.length;
    alert (str, wordsCount);
    console.log(str, wordsCount);
}

{
    let lastName = prompt (`Введіть Ваше прізвище:`);
    let firstName = prompt (`Введіть Ваше ім'я:`);
    let surName = prompt (`Введіть Ваше По-батькові:`);
    let lastNameCapit = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    let firsNameCapit = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let surNameCapit = surName.charAt(0).toUpperCase() + surName.slice(1);
    let fullName = alert (`ПІБ:` + lastNameCapit + ` ` + firsNameCapit + ` ` + surNameCapit);
}

{
    let str = "Було жарко. Василь пив пиво вприкуску з креветками"
    let beer = "пиво";
    let index = str.indexOf(beer);
    if (index !== -1) {
    let newStr = str.slice(0, index) + str.slice(index + beer.length); // вирізаємо слово за допомогою slice()
    let tea = `чай`;
    let position = 23;
    let result = newStr.slice(0, position) + tea + newStr.slice(position);
    alert (result);
    console.log(result);
    }
}

{
    let str = "якийсь текст у якому є один тег <br /> і всяке інше";
    let index = str.indexOf(`<br />`);
    if (index !== -1) {
        let result = str.slice(0,index) + `<BR />` + str.slice(index + 6);
        alert (result);
        console.log(result);
    }
}

{
    let user = prompt (`Введіть багаторядковий рядок використовуючи "\\n" як маркер нового рядка:`);
    let str = user.split(`\\n`);
    let result = str.join(`\n`);
    alert (result)
}

{
    function embedYouTubeVideo() {
        let userInput = document.getElementById("textInput").value;
        let regex = /(?:\?|&)v=([a-zA-Z0-9_-]+)/;
        let match = userInput.match(regex);
        if (match) {
          let videoId = match[1];
          let video = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
          document.getElementById("videoContainer").innerHTML = video;
        } else {
          alert("Посилання на відео YouTube не знайдено!");
        }
      }
}