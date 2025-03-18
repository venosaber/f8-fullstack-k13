const customers = [
    {id: 1, name: "John Doe", email: "john@example.com"},
    {id: 2, name: "Jane Smith", email: "jane@example.com"},
    {id: 3, name: "Alice Johnson", email: "alice@example.com"},
    {id: 4, name: "Bob Brown", email: "bob@example.com"},
    {id: 5, name: "Charlie Green", email: "charlie@example.com"},
];

const products = [
    {id: 101, name: "Laptop", price: 1200},
    {id: 102, name: "Phone", price: 800},
    {id: 103, name: "Tablet", price: 500},
    {id: 104, name: "Smartwatch", price: 300},
    {id: 105, name: "Headphones", price: 150},
];

const orders = [
    {id: 1001, customerId: 1, items: [{productId: 101, quantity: 2}, {productId: 102, quantity: 1}]},
    {id: 1002, customerId: 2, items: [{productId: 102, quantity: 1}, {productId: 103, quantity: 3}]},
    {id: 1003, customerId: 3, items: [{productId: 104, quantity: 5}, {productId: 105, quantity: 2}]},
    {id: 1004, customerId: 4, items: [{productId: 101, quantity: 1}, {productId: 103, quantity: 2}]},
    {id: 1005, customerId: 5, items: [{productId: 105, quantity: 10}]},
    {id: 1006, customerId: 1, items: [{productId: 101, quantity: 1}, {productId: 105, quantity: 3}]},
    {id: 1007, customerId: 2, items: [{productId: 104, quantity: 2}, {productId: 103, quantity: 1}]},
    {id: 1008, customerId: 3, items: [{productId: 102, quantity: 2}]},
    {id: 1009, customerId: 4, items: [{productId: 101, quantity: 1}, {productId: 102, quantity: 1}]},
    {id: 1010, customerId: 5, items: [{productId: 103, quantity: 4}, {productId: 104, quantity: 3}]},
];

/*

         ┌──────────────┐              ┌────────────────────────────────┐
         │ customers    │              │      customerObj               │
         │  [           │              │                                │
         │    {         │ for each     │                {               │                                                  ┌───────────────────────────┐
         │     id       │───────────►  │                 id:            │                          map (to array) & sort   │                           │
         │     name     │  customer    │ customer.id:    name:          ├─────────────────────────────────────────────────►│  sortedCustomers (Array)  │
         │     email    │              │                 products: {}   │          ▲                                       │                           │
         │    }         │              │                 totalSpent: 0  │          │                                       └───────────────────────────┘
         │   ...        │              │                }               │          │
         │  ]           │              │                                │          │
         └──────────────┘              │                                │          │  UPDATE
                                       └────────────────────────────────┘          │
                                                                                   │
                                                                                   │
      ┌────────────────────────┐                                                   │
      │  orders                │                                                   │
      │                        │                                                   │
      │ {                      │                                                   │
      │   id                   │                                            ┌──────┴────────────────────────────────────────────────────┐
      │   customerId  ─────────┼─►  customerRecord = customerObj[customerId]│  customerRecord                                           │
      │                        │                                            │                                                           │
      │   items[ ┌───────────┐ │                                            │ id:                                                       │
      │          │{          │ │                                            │ name:                                                     │
      │          │  productId│ │    for each  order      for each item      │          {                                                │
      │          │           │ │    ──────────────►      ────────────────►  │                      ┌───────────────────────────────────┐│
      │          │  quantity─┼─┼──────────────────┐                         │ products:            │ {                                 ││
      │          │}          │ │                  ▼                         │                      │   name: productObj[productId].name││
      │          └───────────┘ │   payAmount = quantity * price             │            productId:│                                   ││
      │          ...           │                                            │                      │   quantity: + item.quantity       ││
      │        ]               │                           ▲                │                      │                                   ││
      │                        │                           │                │                      │   totalSpent: +payAmount          ││
      │  }                     │                           │                │                      │                                   ││
      └────────────────────────┘                           │                │                      │ }                                 ││
                                                           │                │                      └───────────────────────────────────┘│
                                                           │                │             ...                                           │
                                                           │                │           }                                               │
                                                           │                │                                                           │
                                                           │                │ totalSpent: +payAmount                                    │
                                                           │                └───────────────────────────────────────────────────────────┘
               ┌───────────────────────┐                   │
               │   productObj          │                   │
               │                       │                   │
               │   {                   │                   │
               │     id: ┌─────────┐   │                   │
               │         │ {       │   │                   │
               │         │   name: │   │                   │
               │         │   price:┼───┼───────────────────┘
               │         │ }       │   │
               │         └─────────┘   │
               │                       │
               │   }                   │
               │                       │
               └───────────────────────┘

 */
const customersObj = {}
for (let customer of customers) {
    customersObj[customer.id] = {
        id: customer.id,
        name: customer.name,
        products: {},
        totalSpent: 0
    }
}

const productsObj = {}
for (let product of products) {
    productsObj[product.id] = {
        name: product.name,
        price: product.price
    }
}

for (let order of orders) {
    const customerRecord = customersObj[order.customerId];
    for (let item of order.items) {
        let productId = item.productId;
        let payAmount = item.quantity * productsObj[productId].price;

        // if the key (productId) is not existed in object products yet, initialize the value as an object
        if (customerRecord.products[productId] === undefined) {
            customerRecord.products[productId] = {
                name: productsObj[productId].name,
                quantity: 0,
                totalSpent: 0
            };
        }

        customerRecord.products[productId].quantity += item.quantity;
        customerRecord.products[productId].totalSpent += payAmount;
        customerRecord.totalSpent += payAmount;
    }
}

// Convert the customersObj to array
const sortedCustomers = Object.values(customersObj).map(customer => {

    // Convert the products to array
    const productsArray = Object.values(customer.products);

    // Sort the products by totalSpent value in decreasing order
    productsArray.sort((product1, product2) => product2.totalSpent - product1.totalSpent);

    return {
        id: customer.id,
        name: customer.name,
        products: productsArray,
        totalSpent: customer.totalSpent
    };
})

// Sort the customers by totalSpent value in decreasing order
sortedCustomers.sort((customer1, customer2) => customer2.totalSpent - customer1.totalSpent);
console.log(sortedCustomers);