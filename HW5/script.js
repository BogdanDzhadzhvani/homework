// {
//     const arr = [
//         confirm(`Вам є 18?`),
//         confirm(`Бажаєте продовжити?`),
//         confirm(`Не треба`),
//     ];
//     console.log(arr);
// }

// {
//     let question = [];
//     question[0] = prompt(`Скількі Вам років?`);
//     question[1] = prompt(`Складіть 2+2`);
//     question[2] = prompt(`Чому не державною?`);
//     console.log(question);
// }

// {
//     const array = [];
//     array[0] = `перший`;
//     array[1] = 'другий';
//     array[2] = `третій`;
//     array[3] = `четвертий`;
//     const num = prompt(`Введіть індекс масиву ві 0 до 3:`);
//     if (+num>3) {
//         alert (`Введіть коректне значення!`)
//     }
//     alert(array[+num]);
// }

// {
//     const array = [];
//     const index = prompt(`Введіть індекс масиву:`);
//     const value = prompt(`Введіть значення для цього індексу масиву:`);
//     array[index] = value;
//     console.log(array);
// }

// {
//     let table = [
//         [0, 0, 0, 0, 0],
//         [0, 1, 2, 3, 4],
//         [0, 2, 4, 6, 8],
//         [0, 3, 6, 9, 12],
//         [0, 4, 8, 12, 16]
//       ]
//     console.log(table[3][4]);
// }

// {
//     let table = [
//         [0, 0, 0, 0, 0],
//         [0, 1, 2, 3, 4],
//         [0, 2, 4, 6, 8],
//         [0, 3, 6, 9, 12],
//         [0, 4, 8, 12, 16]
//       ]
//     table = table.slice(1,5).map(row => row.slice(1,5));
// }

// {
//     const question = prompt (`Введіть рядок:`);
//     const array = question.split(` `);
//     const target = prompt (`Введіть слово`);
//     const index = array.indexOf(target);
//     if (index===-1) {
//         alert (`Нема такого`)
//     }
//     else {
//         alert (`Номер слова:${index}`);
//     }
// }

// {
//     let arr = [];
//     arr.push (prompt(`Введіть елмент:`));
//     arr.push (prompt(`Введіть елмент:`));
//     arr.push (prompt(`Введіть елмент:`));
//     arr.push (prompt(`Введіть елмент:`));
//     arr.push (prompt(`Введіть елмент:`));
//     alert (arr);
//     let arr2 = [];
//     let five = arr.pop();
//     arr2.push(five);
//     let four = arr.pop();
//     arr2.push(four);
//     let three = arr.pop();
//     arr2.push(three);
//     let second = arr.pop();
//     arr2.push(second);
//     let first = arr.pop();
//     arr2.push(first);
//     alert (arr2)
// }

// {
//     let table = [
//         [0, 0, 0, 0, 0],
//         [0, 1, 2, 3, 4],
//         [0, 2, 4, 6, 8],
//         [0, 3, 6, 9, 12],
//         [0, 4, 8, 12, 16]
//       ]
//     let tableCopy = table.slice();
//     console.log(tableCopy); 
//     let tableCopyDeep = tableCopy.slice(0,1);
//     let tableCopyDeep2 = tableCopy.slice(1,2);
//     let tableCopyDeep3 = tableCopy.slice(2,3);
//     let tableCopyDeep4 = tableCopy.slice(3,4);
//     let tableCopyDeep5 = tableCopy.slice(4,5);
//     console.log(tableCopyDeep);
// }

// {
//     let arr = [5]
//     let arr2 = arr;
//     console.log(arr===arr2);
// }

// {
//     let table = [
//         [0, 0, 0, 0, 0],
//         [0, 1, 2, 3, 4],
//         [0, 2, 4, 6, 8],
//         [0, 3, 6, 9, 12],
//         [0, 4, 8, 12, 16]
//     ];
    
//     let tableFlat = [...table[0], ...table[1], ...table[2], ...table[3], ...table[4]];
// }

// {
//     let input = prompt("Введіть рядок:");

//     let [first = `!`, , , , fifth = `!`, , , , ninth = `!`] = input;
//     alert(`${first} ${fifth} ${ninth}`);

// }

// {
//     let table = [
//         [0, 0, 0, 0, 0],
//         [0, 1, 2, 3, 4],
//         [0, 2, 4, 6, 8],
//         [0, 3, 6, 9, 12],
//         [0, 4, 8, 12, 16]
//     ];
//     const [a, ...somethingElse] = table;
//     let result = somethingElse.map(row => row.slice(1,5));
//     console.log(result);
// }

// {
//     const names = ["John", "Paul", "George", "Ringo"];
//     for (const name of names) {
//      alert(`Hello, ${name}`)
//     }
// }

{
    const currencies = ["USD", "EUR", "GBP", "UAH"]
    let   str = "<select>"
    for (const currency of currencies){
        str += `<option value="${currency}">${currency}</option>`;
    }
    str+= "</select>"
    document.write(str) //document.write відобразить ваш HTML на сторінці
}

// {
//     const names = ["John", "Paul", "George", "Ringo"];
//     let str = "<table>";
//     for (const name of names){
//     str+= `<td>${name}</td>`;
//     }
//     str+= "</table>";
//     document.write(str);
// }

// {
//     const names = ["John", "Paul", "George", "Ringo"];
//     let str = "<table>";
//     for (const name of names){
//     str+= `<tr><td>${name}</td></tr>`;
//     }
//     str+= "</table>";
//     document.write(str);
// }
// {
//     const div = document.getElementById(`table`)
//     const currencies = ["USD", "EUR", "GBP", "UAH"]
//     let   str = "<table>"
//     for (const currency of currencies){
//         str+=`<tr>`
//         console.log(currency)
//         for (const letter of currency){ 
//             console.log(letter)
//             str+=`<td>${letter}</td>`
//     }
//         str+=`</tr>`
//     }   
//     str+= "</table>"
//     div.innerHTML = str; 
//     console.log(div)
// }

{
    const div = document.getElementById(`table`);
    const table = [
    [0, 0, 0, 0, 0],
    [0, 1, 2, 3, 4],
    [0, 2, 4, 6, 8],
    [0, 3, 6, 9, 12],
    [0, 4, 8, 12, 16]
    ];
    let str = `<table>`;
    for (const row of table) {
    str += `<tr>`;
    for (const value of row) {
        str += `<td>${value}</td>`;
    }
    str += `</tr>`;
    }
    str += `</table>`;
    div.innerHTML = str; 
    console.log(div);

}

{
    const capitalize = str => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    } 
    console.log(capitalize("cANBerRa")); // Canberra
}

{
    const capitalize = str => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    const input = prompt('Введіть рядок:');
    const array = input.split(` `);
    const capitalizeArr = array.map(word=>capitalize(word));
    const result = capitalizeArr.join(` `);
    alert (result)
    console.log(result)
}

{
    const bad = ['жопа', 'срака', 'какашка']
    const input = prompt(`Не вводіть слова 'жопа', 'срака', 'какашка':`)
    const array = input.split(` `)
    const filter = array.filter(word=>!bad.includes(word))
    const result = filter.join(` `)
    console.log(result)
}

{
    const bad = ['жопа', 'срака', 'какашка']
    const input = prompt(`Не вводіть слова 'жопа', 'срака', 'какашка':`)
    const array = input.split(` `)
    const filter = array.map(word => bad.includes(word) ? 'BEEP' : word);
    const result = filter.join(` `)
    console.log(result)
}

{
    const currencies = ["USD", "EUR", "GBP", "UAH"];
    let str = "<select>";
    str += currencies.reduce((a, currency) => a + `<option value="${currency}">${currency}</option>`, "");
    str += "</select>";
    document.write(str);

}