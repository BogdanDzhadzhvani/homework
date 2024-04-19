{
    function jsonPost(url, data) {
        return new Promise((resolve, reject) => {
            var x = new XMLHttpRequest();
            x.onerror = () => reject(new Error('jsonPost failed'))
            //x.setRequestHeader('Content-Type', 'application/json');
            x.open("POST", url, true);
            x.send(JSON.stringify(data))
    
            x.onreadystatechange = () => {
                if (x.readyState == XMLHttpRequest.DONE && x.status == 200) {
                    resolve(JSON.parse(x.responseText))
                } else if (x.status != 200) {
                    reject(new Error('status is not 200'))
                }
            }
        })
    }
    
    const messageInput = document.createElement(`input`);
    messageInput.placeholder = `Введіть повідомлення`;
    messageInput.type = `text`;
    
    const nikInput = document.createElement(`input`);
    nikInput.placeholder = `Введіть нік`;
    nikInput.type = `text`;
    
    const button = document.createElement(`button`);
    button.textContent = `Відправити`;
    
    button.addEventListener(`click`, async () => {
        const message = messageInput.value;
        const nick = nikInput.value;
    
        try {
            const res = await jsonPost("http://students.a-level.com.ua:10012", {
                func: "addMessage",
                nick: nick,
                message: message,
                messageId: nextMessageId,
            });
    
            if (nextMessageId !== undefined) {
                nextMessageId = res.nextMessageId
            }
    
            messageInput.value = ``;
            nikInput.value = ``;
    
            await listContainer();
        } catch (error) {
            console.log(error)
        }
    })
    
    const messageContainer = document.createElement('div');
    messageContainer.append(messageInput, nikInput, button);
    document.body.appendChild(messageContainer);
    
    const messageListContainer = document.createElement('div');
    document.body.appendChild(messageListContainer);
    
    let nextMessageId = 0;
    
    async function listContainer() {
        try {
            const res = await jsonPost("http://students.a-level.com.ua:10012", { func: "getMessages", messageId: nextMessageId });
    
            res.data.forEach((message) => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
    
                const nickElement = document.createElement('div');
                nickElement.classList.add('nick');
                nickElement.textContent = message.nick;
    
                const textElement = document.createElement('div');
                textElement.classList.add('text');
                textElement.textContent = message.message;
    
                const timestampElement = document.createElement('div');
                timestampElement.classList.add('timestamp');
                timestampElement.textContent = new Date(message.timestamp).toLocaleString();
    
                messageElement.append(nickElement, textElement, timestampElement);
                messageListContainer.prepend(messageElement);
    
                nextMessageId = res.nextMessageId
            });
            console.log(`new message`)
        } catch (error) {
            console.log(error);
        }
    }
    
    setInterval(listContainer, 3000);

}

{
    async function fetchSwapiData(url) {
        try {
            let results = {};
            let response = await fetch(url);
            let data = await response.json();
            results = { ...data };
    
            Object.keys(data).forEach(async key => {
                if (typeof data[key] === 'string' && data[key].startsWith('http')) {
                    let subResponse = await fetch(data[key]);
                    let subData = await subResponse.json();
                    results[key] = subData;
    
                    Object.keys(subData).forEach(async subKey => {
                        if (Array.isArray(subData[subKey])) {
                            results[subKey] = [];
    
                            await Promise.all(subData[subKey].map(async subItemUrl => {
                                let subItemResponse = await fetch(subItemUrl);
                                let subItemData = await subItemResponse.json();
                                results[subKey].push(subItemData);
                            }));
                        }
                    });
                }
            });
    
            return results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    fetchSwapiData('https://swapi.dev/api/people/1/')
        .then(data => console.log(data))
        .catch(error => console.error(error));
    
}

{
    function domEventPromise(element, eventName){
        return new Promise((resolve) => {
            function eventPromise(event) {
                resolve(event)
                element.removeEventListener(eventName, eventPromise);
            }
            element.addEventListener(eventName,eventPromise)
        })
    }

    const knopka = document.createElement(`button`)
    knopka.textContent = `КНОПКА`
    document.body.appendChild(knopka)
    domEventPromise(knopka, 'click').then((event) => {
        console.log('event click happens', event);
    });
}