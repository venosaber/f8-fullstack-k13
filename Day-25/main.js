/*

                                                      ┌───────────────────────────────────────────────────────┐
  fetch API                                           │                                   .product            │
                                                      │  ┌─────────────────────────────────────────────────┐  │
       │                                              │  │                                                 │  │
       │                                              │  │         .product__image                         │  │
       │                                              │  │                                                 │  │
       │                                              │  │                                                 │  │
       │                                              │  └─────────────────────────────────────────────────┘  │
       ▼                                              │                                                       │
                                                      │  ┌─────────────────────────────────────────────────┐  │
 Array of products                                    │  │                                                 │  │
                                                      │  │         .product__title                         │  │
       │                                              │  │                                                 │  │
       │                                              │  └─────────────────────────────────────────────────┘  │
       │                                              │                                                       │
       │                                              │  ┌─────────────────────────────────────────────────┐  │
       │                                              │  │                                                 │  │
       │ for each product                             │  │         .product__price                         │  │
       └──────────────────►  newProductElement        │  └─────────────────────────────────────────────────┘  │
                                                      │  ┌─────────────────────────────────────────────────┐  │
                                    │                 │  │                                                 │  │
                                    └────────────────►│  │            .product__description                │  │
                           renderProductItem(product) │  └─────────────────────────────────────────────────┘  │
                                                      │                                                       │
                                                      │  ┌─────────────────────────────────────────────────┐  │
                                                      │  │               .product__rating                  │  │
                                                      │  │ ┌─────────────────┐            ┌───────────────┐│  │
                                                      │  │ │                 │            │               ││  │
                                                      │  │ └─────────────────┘            └───────────────┘│  │
                                                      │  └─────────────────────────────────────────────────┘  │
                                                      └───────────────────────────────────────────────────────┘

                                                                                 │
                                                                                 │
                                                                                 │
                                                                                 │
                                                                                 ▼
                                                                  productList.appendChild(newProductElement)

 */
const productList = document.querySelector(".products-list");

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => products.forEach(product => {
        const newProductElement = renderProductItem(product);
        productList.appendChild(newProductElement);
    }));

function renderProductItem(product){
    const {category, description, image, price, rating, title} = product;
    const {rate, count} = rating;

    const productElement = document.createElement("a");
    productElement.setAttribute("href","#");
    productElement.classList.add("product");
    const content =
        `
            <div class = "product__image">
                <img src="${image}" alt="${category}">
            </div>
            <div class = "product__title">
                <h3>${title}</h3> 
            </div>
            <div class = "product__price">
                <span>$${price}</span> 
            </div>
            <div class = "product__description">
                <p>${description}</p>
            </div>
            <div class = "product__rating">
                <div class= "product__rating__average">Rating ${rate}</div>
                <div class= "product__rating__count">${count} reviews</div>
            </div>
        `
    // Prevent XSS attack by using DOMPurify
    productElement.innerHTML = DOMPurify.sanitize(content);
    return productElement;
}