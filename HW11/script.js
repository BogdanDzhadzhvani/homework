{
    function makeProfileTimer() {
        let start = performance.now();
    
        return function() {
            let finish = performance.now();
            let result = finish - start;
            start = finish;
            return result
        };
    }

    const timer = makeProfileTimer();
    alert('Вимiрюємо час роботи цього alert');
    alert(`Час виконання у мілісекундах: ${timer()}`); 
    const timer2 = makeProfileTimer()
    prompt('')
    alert(`Час роботи двух аlert та одного prompt ${timer()}`)
    alert(`Час роботи prompt та попереднього alert ${timer2()}`)
}

{
    function makeSaver(f,defaultValue) {
        let result = defaultValue;
        return function(...params) {
            if (result === defaultValue) {
                result = f(...params)
            }
            return result
        }
    }

    let saver = makeSaver(Math.random) 
                                      
    let value1 = saver()              
    let value2 = saver()              
                                      
    alert(`Random: ${value1} === ${value2}`)

    let saver2 = makeSaver(() => {
        console.log('saved function called');
        return [null, undefined, false, '', 0, Math.random()][Math.floor(Math.random()*6)]
    })
    let value3 = saver2()
    let value4 = saver2()

    value3 === value4 // теж має бути true
    
    
    
    let namePrompt = prompt.bind(window, 'Як тебе звуть?')
    let nameSaver = makeSaver(namePrompt)
    alert(`Привіт! Prompt ще не було!`)
    alert(`Привіт ${nameSaver()}. Щойно запустився prompt, перший та останній раз`)
    alert(`Слухай, ${nameSaver()}, го пити пиво. Адже prompt був лише один раз`)
}

{
    function myBind(f, thisArg, defaults) {
        return function(...args) {
            const mergedArgs = args.map((arg, index) => (arg !== undefined ? arg : defaults[index]));
            return f.call(thisArg, ...mergedArgs);
        };
    }
    

    let pow5 = myBind(Math.pow, Math, [, 5]) 
                                                
                                                
                                                
let cube = myBind(Math.pow, Math, [, 3]) 

pow5(2) 
pow5(4) 
cube(3) 


let chessMin = myBind(Math.min, Math, [, 4, , 5,, 8,, 9])
chessMin(-1,-5,3,15) 



let zeroPrompt = myBind(prompt, window, [undefined, "0"]) 
                                                           
let someNumber = zeroPrompt("Введіть число") 

const bindedJoiner = myBind((...params) => params.join(''), null, [, 'b', , , 'e', 'f'])
bindedJoiner('a','c','d') === 'abcdef'
bindedJoiner('1','2','3') === '1b23ef'
}

{
    function checkResult(original, validator) {
        function wrapper(...params) {
            while (validator(...params)) {
                return original();
            }
        }
        
        return wrapper;
    }
//numberPrompt - це функція, яка буде запускати prompt до тих пір, поки користувач не введе число
const numberPrompt = checkResult(prompt, x => !isNaN(+x)) 
let   number       = +numberPrompt("Введіть число", "0")  //параметри передаються наскрізь до оригіналу. Не забудьте передати this, використовуючи call або apply

//gamePrompt - це функція, яка буде запускати prompt доти, доки користувач не введе одне зі слів 'камінь', 'ножиці', 'папір'
const gamePrompt   = checkResult(prompt, x => ['камень', 'ножиці', 'папір'].includes(x.toLowerCase())) 
const turn         = gamePrompt("Введіть щось зі списку: 'камень', 'ножиці', 'папір'")    

const RandomHigh = checkResult(() => Math.random(), x => x >= 0.5);
const AlwaysSayYes = checkResult(() => confirm (`Так чи ні?`), x => x);
const respectMe = checkResult(() => prompt(`Введіть шось`), x => x == !null && x == !` `);
}