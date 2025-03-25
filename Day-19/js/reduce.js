const orders = [
    { item: "Bút", price: 5000, quantity: 3 },
    { item: "Vở", price: 12000, quantity: 2 },
    { item: "Thước", price: 8000, quantity: 1 }
];
calculateTotal(orders); // 46000

/*
                                   ┌─────────────────────────────────────┐
                                   │                                     │
                                   │                                     │
                       ┌───────────┴────────┐        sum = 0             │
                       │ {price, quantity}  │                            │
                       └────────────────────┘           │                │
                                ▲                       │                │
                                │ destructure           │                │
 orders = [                     │                       ▼                ▼
                       ─────────┴─────────
             { item: , price: , quantity: }  ────────► sum = sum + price * quantity

                                                        │
                                                        │
                                                        │
                                                        ▼

             { item: , price: , quantity: }  ────────► sum = sum + price * quantity

                                                        │
                                                        │
                                                        │
                   ...                                  ▼
                                                       ...
          ]
                                                        │
                                                        │
                                                        │
                                                        ▼

                                                     total ──────────► print the total

 */

function calculateTotal(orders){
    return orders.reduce((sum, order) => {
        const {price, quantity} = order;
        return sum + price*quantity;
    }, 0);
}

console.log(calculateTotal(orders));