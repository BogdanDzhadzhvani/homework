{
    const green = document.getElementById(`green`)
    const yellow = document.getElementById(`yellow`)
    const red = document.getElementById(`red`)

    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

    async function trafficLight(){
        while (true){
            green.style.backgroundColor = 'green';
            for (let i = 7; i > 0; i--) {
                timer.textContent = i;
                await delay(1000);
            }
            green.style.backgroundColor = 'grey';
            yellow.style.backgroundColor = 'yellow';
            for (let i = 3; i > 0; i--) {
                timer.textContent = i;
                await delay(1000);
            }
            yellow.style.backgroundColor = 'grey';
            red.style.backgroundColor = 'red';
            for (let i = 5; i > 0; i--) {
                timer.textContent = i;
                await delay(1000);
            }
            red.style.backgroundColor = 'grey';
        }
    }

    trafficLight()
}

{
    const greenHuman = document.getElementById('green-human');
    const redHuman = document.getElementById('red-human');
    const button = document.getElementById('button');

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function trafficLight() {
        while (true) {
            await Promise.race([
                delay(5000), new Promise(resolve => {
                    button.addEventListener('click', async () => {
                        button.disabled = true;
                        await delay(1000);
                        button.disabled = false;
                        resolve();
                    }, { once: true });
            }   )
            ]);

        greenHuman.style.backgroundColor = 'green';
        redHuman.style.backgroundColor = 'grey';
        await delay(5000);

        greenHuman.style.backgroundColor = 'grey';
        redHuman.style.backgroundColor = 'red';
        }
    }

trafficLight();

}

{
    async function speedtest(getPromise, count, parallel = 1) {
        try {
            const start = Date.now();
            let durationNew = 0;
            let totalParallelDuration = 0;
    
            for (let i = 0; i < count; i++) {
                const promises = Array.from({ length: parallel }, () => getPromise());
                const startTime = Date.now();
                await Promise.all(promises);
                const endTime = Date.now();
    
                const resultDuration = endTime - startTime;
                durationNew += resultDuration;
                totalParallelDuration += resultDuration / parallel;
            }
    
            const end = Date.now();
            const duration = end - start;
            const querySpeed = count / (durationNew / 1000);
            const queryDuration = durationNew / count;
            const parallelSpeed = (count * parallel) / (durationNew / 1000);
            const parallelDuration = totalParallelDuration / count;
    
            return {
                duration,
                querySpeed,
                queryDuration,
                parallelSpeed,
                parallelDuration
            };
        } catch (error) {
            console.log(error);
        }
    }
    
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    speedtest(() => delay(1000), 10, 10 ).then(result => console.log(result))
// {duration: 10000, 
// querySpeed: 0.001, //1 тисячна запита за мілісекунду
// queryDuration: 1000, //1000 мілісекунд на один реальний запит у середньому
// parallelSpeed: 0.01  // 100 запитів за 10000 мілісекунд
// parallelDuration: 100 // 100 запитів за 10000 мілісекунд
speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5)
    
}

{
    async function gql(endpoit,query,variables) {
        return fetch(endpoit, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;',
              'Accept' : 'application/json',
            },
            body: JSON.stringify({query,variables})
          });
    }

    ;(async () => {
        const catQuery = `query cats($q: String){
                                            CategoryFind(query: $q){
                                                _id name
                                            }
                                        }`
        const cats = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql",  catQuery,  {q: "[{}]"})
        console.log(cats) //список категорій з _id name та всім таким іншим
        
        
        const loginQuery = `query login($login:String, $password:String){
                                    login(login:$login, password:$password)
                            }`
        
        const token = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", loginQuery ,{login: "test457", password: "123123"})
        console.log(token)
    })()
}

{
    function jwtDecode(token) {
        if (!token || typeof token !== `string`){
            return undefined
        }
        const parts = token.split(`.`)
        if (parts.length !== 3) {
            return undefined;
        };
        const midlleParts = parts[1];

        try {
        const decodeMiddleParts = window.atob(midlleParts)

        const parse = JSON.parse(decodeMiddleParts)

        return parse} catch (error) {
            return undefined
        }

    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzIyMDVhZWI3NGUxZjVmMmVjMWEzMjAiLCJsb2dpbiI6InRlc3Q0NTciLCJhY2wiOlsiNjMyMjA1YWViNzRlMWY1ZjJlYzFhMzIwIiwidXNlciJdfSwiaWF0IjoxNjY4MjcyMTYzfQ.rxV1ki9G6LjT2IPWcqkMeTi_1K9sb3Si8vLB6UDAGdw"
console.log(jwtDecode(token)) 
//{
//  "sub": {
//    "id": "632205aeb74e1f5f2ec1a320",
//    "login": "test457",
//    "acl": [
//      "632205aeb74e1f5f2ec1a320",
//      "user"
//    ]
//  },
//  "iat": 1668272163
//}

try {
    console.log(jwtDecode())         //undefined
    console.log(jwtDecode("дічь"))   //undefined
    console.log(jwtDecode("ey.ey.ey"))   //undefined
    
    console.log('до сюди допрацювало, а значить jwtDecode не матюкався в консоль червоним кольором')
}
finally{
    console.log('ДЗ, мабуть, закінчено')
}
}