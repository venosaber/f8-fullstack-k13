const cart = [
    { id: 1, name: "Laptop", price: 1500 },
    { id: 2, name: "Phone", price: 800 },
    { id: 3, name: "Tablet", price: 500 }
];

/*
 ┌──────────────┐
 │  cart        │
 │              │
 │  [           │
 │    {         │                         ┌───────────────┐
 │     id:      │      findIndex()        │               │  false
 │              │ ─────────────────────►  │  index !==-1 ?│────────────► print "not exist"
 │     name:    │                         └───────────────┘
 │     price:   │ productId === product.id       │
 │    }         │                                │
 │   ...        │                                │
 │              │                                │ true
 │  ]           │                                │
 └──────────────┘                                │
                                                 ▼

                                       setTimeout(function, delay)
                                                     │
                                                     │
                                                     │
                                                     │
                                                     ▼
                                             splice(index,1) (remove)

                                             print the cart

 */

function removeItemAfterDelay(productId, delay){
    if(typeof productId !== 'number' || typeof delay !== 'number'){
        console.log('invalid');
        return;
    }
    const index = getIndex(productId);
    if(index!==-1){
        setTimeout(()=>{
            cart.splice(index,1);
            console.log(`The cart after removing the product (which id is ${productId}):`);
            console.log(cart);
        }, delay);
    }else{
        console.log("No such product exists");
    }
}

function getIndex(productId){
    return cart.findIndex(product=>product.id === productId);
}

// for example
removeItemAfterDelay(2, 2000);