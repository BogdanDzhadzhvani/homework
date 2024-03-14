{
    let userInput = false;
    while (confirm('Натисни шось') === userInput) {
        alert(`Ще раз`)
    }
}

{
    const arr = [];
    let userText = prompt (`Введіть шось`)
    while (userText !== null ) {
        arr.push(userText)
        userText = prompt (`Введіть ще шось`)
    }
    console.log(arr)
}

{
    const arr =[];
    let userText = prompt (`Введіть шось2`)
    let i = 0;
    
    while (userText !== null) {
        arr[i] = userText;
        i++
        userText = prompt (`Введіть ще шось`)
    }
    console.log(arr)
}

{
    let i = 0;
    while (Math.random() < 0.9 ) {
        i++
        if (Math.random() > 0.9) {
            break
        }
    }
    alert (`Ви пройшли ${i} ітерацій`)
}

{
    let userInput 
    do {
        userInput  = prompt(`Введіть шось (або не вводьте)`)
    } while (userInput === null)
}

{
    let i;
    let result = 0;
    for (i=0; i<300; i +=3) {
        result += i;
    }
    console.log(result)
}

{
    let length = prompt(`Введіть довжину рядка`);
    let str = '';

    for (let i = 0; i < length; i++) {
        if (i > 0) {
            str += '.';
        }
        str += '#';
    }

    alert(str);

}

{
    let str = ``;
    for (let i = 0; i<10; i++) {
        for (let j=0; j<10; j++) {
            str += j;
        }
        str += `\n`;
    }
    console.log(str)
}

{
    let width = 10;
    let length = 10;
    let str = ``;

    for (let i=0; i < width; i++) {
        for (let j=0; j < length; j++) {
            if ((i+j)%2) {
                str += `.`
            }
            else {
                str += `#`
            }
        }
        str += `\n`;
    }
    console.log(str)
}

{
    let userInput = prompt(`Введіть значення`)
    const arr = [];
    for (let i=0; i < userInput; i++) {
        arr[i] = i **3;
    }
    console.log(arr)
}

{
    const arr = [];
    for (let i = 0; i < 10; i++) {
        arr[i] = [];
        for (let j = 0; j < 10; j++) {
            arr[i][j] = i * j;
        }
    }
    console.log(arr); // чомусь не працює з фігурними дужками області видимості, якщо їх прибрати буде працювати
}

{
    let arr = [];

    do {
    let userInputKey = prompt(`Введіть ключ`);
    let userInputValue = prompt(`Введіть значення ключа`);

    arr.push({ [userInputKey]: userInputValue });

    } while (confirm(`Продовжити?`));

    console.log(arr);
}

{
    const arr = [];
    const table = document.createElement(`table`);

    for ( let i = 0; i<10; i++) {
        arr[i] = [];
        const row = document.createElement(`tr`);
        for (let j = 0; j<10; j++) {
            arr[i][j] = i * j;
            const str = document.createElement(`td`);
            str.textContent = arr[i][j];
            str.style.border = `1 px solid`
            str.style.padding = `5px`
            str.style.backgroundColor = `#FFF0F5`
            str.onmouseover = () => str.style.backgroundColor = `red`;
            str.onmouseout = () => str.style.backgroundColor = `#FFF0F5`
            row.appendChild(str);
        }
        table.appendChild(row);
    }
    document.body.appendChild(table)
}