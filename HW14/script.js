{
    function htmlTree(parent) {
        let str = `<${parent.tagName}`;
    
        if (parent.attrs) {
            for (let key in parent.attrs) {
                str += ` ${key}='${parent.attrs[key]}'`;
            }
        }
    
        str += `>`;
    
        if (parent.children) {
            for (let child of parent.children) {
                if (typeof child === 'string') {
                    str += child;
                } else {
                    str += htmlTree(child);
                }
            }
        }
    
        str += `</${parent.tagName}>`;
        return str;
    }
    
    const table = {
        tagName: 'table',
        attrs: {
            border: '1',
        },
        children: [
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: 'td',
                        children: ['1x1'],
                    },
                    {
                        tagName: 'td',
                        children: ['1x2'],
                    },
                ],
            },
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: 'td',
                        children: ['2x1'],
                    },
                    {
                        tagName: 'td',
                        children: ['2x2'],
                    },
                ],
            },
        ],
    };
    
    document.write(htmlTree(table));
    
}

{
    function domTree(parent,obj) {
        const element = document.createElement(obj.tagName)

        if (obj.attrs) {
            for (let key in obj.attrs) {
                element[key] = obj.attrs[key]
            }
        }

        if (obj.children) {
            for (let child of obj.children) {
                if (typeof child === `string`) {
                    element.textContent = child
                } else {
                    domTree(element,child)
                }
            }
        }
        parent.appendChild(element);
        
    }

    const table = {
        tagName: 'table',
        attrs: {
            border: "1",
        },
        children: [
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: "td",
                        children: ["1x1"],
                    },
                    {
                        tagName: "td",
                        children: ["1x2"],
                    },
                ]
            },
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: "td",
                        children: ["2x1"],
                    },
                    {
                        tagName: "td",
                        children: ["2x2"],
                    },
                ]
            }
        ]
    }

    domTree(document.body, table)





    const arr  = [1,"string", null, undefined, {a: 15, b: 10, c: [1,2,3,4],d: undefined, e: true }, true, false]
    const arr2 = deepCopy(arr) //arr2 та всі його вкладені масиви та об'єкти - інші об'єкти, які можна змінювати без ризику поміняти щось у arr
    const table2 = deepCopy(table)

    function deepCopy(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        const copy = [obj]
        
        for (let i=0; i < obj.length ; i++) {
            copy[i] = deepCopy(obj[i])
        }
    return copy
    }

    console.log(arr2)
    console.log(table2)
}

{
    // function stringify(value) {
    //     if (typeof value === 'undefined') {
    //         return 'undefined';
    //     }
    //     if (typeof value === 'function') {
    //         return 'function';
    //     }
    //     if (value === null) {
    //         return 'null';
    //     }
    //     if (typeof value === 'string') {
    //         return '"' + value + '"';
    //     }
    //     if (typeof value === 'number' || typeof value === 'boolean') {
    //         return value.toString();
    //     }
    
    //     if (Array.isArray(value)) {
    //         let result = '[';
    //         for (let i = 0; i < value.length; i++) {
    //             if (i > 0) {
    //                 result += ',';
    //             }
    //             result += stringify(value[i]);
    //         }
    //         result += ']';
    //         return result;
    //     }
    
    //     if (typeof value === 'object') {
    //         let result = '{';
    //         let keys = Object.keys(value);
    //         for (let i = 0; i < keys.length; i++) {
    //             if (i > 0) {
    //                 result += ',';
    //             }
    //             let key = keys[i];
    //             result += '"' + key + '":' + stringify(value[key]);
    //         }
    //         result += '}';
    //         return result;
    //     }
    
    //     return null;
    // }

// не вийшло доробити, завжди видає false, не знаю які ще умови треба написати
    
}

{
    function getElementById(idToFind){
        function walker(parent){
            for (let i = 0; i < parent.children.length; i++) {
                const child = parent.children[i]
                if (child.id === idToFind) {
                    throw child
                }
                if (child.children.length > 0) {
                    walker(child)
                }
            }
        }
        try {
            walker(document.body)
        } catch (element) {
            return element
        }
        return null
    }
}