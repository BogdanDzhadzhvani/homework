function reducer(state, { type, ЩО, СКОКА, кошти }) {
    if (!state) {
        return {
            пиво: { quantity: 100, price: 30  },
            чіпси: { quantity: 100, price: 20 },
            сіги: { quantity: 100, price: 100 },
            каса: 300 
        };
    }
    if (type === 'КУПИТИ') {
        const product = state[ЩО];
        if (!product) {
            console.error(`Товар ${ЩО} не знайдено.`);
            return state;
        }
        const totalCost = product.price * СКОКА;
        if (product.quantity >= СКОКА && state.каса >= totalCost && кошти >= totalCost) {
            return {
                ...state,
                [ЩО]: { ...product, quantity: product.quantity - СКОКА },
                каса: state.каса + totalCost
            };
        } else {
            console.error(`Недостатньо товару або коштів для покупки.`);
            return state;
        }
    }
    return state; 
}

function createStore(reducer) {
    let state = reducer(undefined, {}); 
    let cbs = []; 

    const getState = () => state;
    const subscribe = cb => (cbs.push(cb),
        () => cbs = cbs.filter(c => c !== cb));

    const dispatch = action => {
        const newState = reducer(state, action); 
        if (newState !== state) { 
            state = newState; 
            for (let cb of cbs) cb(); 
        }
    };

    return {
        getState, 
        dispatch,
        subscribe 
    };
}

const pivas = document.getElementById('pivo');
const chipsi = document.getElementById('chipsi');
const sigi = document.getElementById('sigi');

const updateProducts = () => {
    pivas.innerText = `пиво: ${store.getState().пиво.quantity} (ціна: ${store.getState().пиво.price})`;
    chipsi.innerText = `чипсы: ${store.getState().чіпси.quantity} (ціна: ${store.getState().чіпси.price})`;
    sigi.innerText = `сиги: ${store.getState().сіги.quantity} (ціна: ${store.getState().сіги.price})`;
    document.title = `Каса: ${store.getState().каса}`;
};

const store = createStore(reducer);
const unsubscribe = store.subscribe(() => {
    updateProducts();
});
updateProducts();

const select = document.createElement('select');

const pivoOption = document.createElement('option');
pivoOption.text = 'Пиво';
pivoOption.value = 'пиво';
select.add(pivoOption);

const chipsiOption = document.createElement('option');
chipsiOption.text = 'Чіпсы';
chipsiOption.value = 'чіпси';
select.add(chipsiOption);

const sigiOption = document.createElement('option');
sigiOption.text = 'Сиги';
sigiOption.value = 'сіги';
select.add(sigiOption);

document.body.appendChild(select);

const inputQuantity = document.createElement('input');
inputQuantity.type = 'number';
inputQuantity.placeholder = 'Кількість';
document.body.appendChild(inputQuantity);

const inputMoney = document.createElement('input');
inputMoney.type = 'number';
inputMoney.placeholder = 'Кошти';
document.body.appendChild(inputMoney);

const buyButton = document.createElement('button');
buyButton.innerText = 'Купити';
document.body.appendChild(buyButton);

buyButton.addEventListener('click', () => {
    const ЩО = select.value;
    const СКОКА = parseInt(inputQuantity.value);
    const кошти = parseInt(inputMoney.value);
    store.dispatch({ type: 'КУПИТИ', ЩО, СКОКА, кошти });
    updateProducts(pivas, chipsi, sigi);
});


