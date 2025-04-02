// Exercise 1
function isEven(number) {
    if (typeof number === 'number') {
        return number % 2 === 0;
    }
    console.error("Not a number");
}

// Exercise 2
function reverseString(str) {
    if (typeof str === 'string') {
        return str.split("").reverse().join("");
    }
    console.error("Not a string");
}

// Exercise 3
function total() {
    let sum = 0;
    for (let i = 1; i <= 100; i++) {
        sum += i;
    }
    return sum;
}

// Exercise 4
function isPrime(num) {
    if (typeof num !== 'number'){
        console.error("Not a number");
        return;
    }
    if (num <= 1 || num % 1 !== 0) return false;

    for (let i = 2; i <= num ** 0.5; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Exercise 5
function findMaxNum(arr) {
    if (!Array.isArray(arr)){
        console.error("Not an array");
        return;
    }
    if (arr.length === 0){
        console.error("Empty array");
        return;
    }

    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number' || arr[i] % 1 !== 0){
            console.error("Not an array of integers");
            return;
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Exercise 6
function countVowels(str) {
    if (typeof str !== 'string'){
        console.error("Not a string");
        return;
    }
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) count++;
    }
    return count;
}

// Exercise 7
function removeDuplicates(arr) {
    if (!Array.isArray(arr)){
        console.error("Not an array");
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number' || arr[i] % 1 !== 0){
            console.error("Not an array of integers");
            return;
        }
    }

    return arr.filter((number, index, array) => {
        return array.indexOf(number) === index;
    })
}

// Exercise 8
function isSquare(n) {
    if (typeof n !== 'number'){
        console.error('Not a number');
        return;
    }
    if (n < 0) return false;
    return (n ** 0.5) % 1 === 0;
}

// Exercise 9
function deepClone(obj) {
    if (typeof obj === 'object'){
        return structuredClone(obj);
    }
    console.error("Not an object");
}

// Exercise 10
const customers = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];
const orders = [
    {id: 101, customerId: 1, total: 200},
    {id: 102, customerId: 2, total: 150},
    {id: 103, customerId: 1, total: 300},
    {id: 105, customerId: 2, total: 100}
];

customers.forEach(customer => {
    const filteredOrders = orders.filter(order => order.customerId === customer.id);
    filteredOrders.sort((o1, o2) => o2.total - o1.total);
    customer.orders = filteredOrders;
});

console.log(customers);




