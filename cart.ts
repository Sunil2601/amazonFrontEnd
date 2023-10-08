class Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    constructor(id: number,
        title: string,
        price: number,
        category: string,
        description: string,
        image: string) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image == image;
        this.category = category;
        this.description = description;
        this.image = image;

    }
}
function getCartProducts() {
    
    const cartContainer = (<HTMLElement>document.querySelector('.cartContainer'));
    cartContainer.innerHTML = "";
    
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartProducts.lenght == 0) { cartContainer.innerHTML = "The cart is empty"; return; }

    
    cartProducts.forEach(function (product: Product) {
        
        const card = document.createElement('div');
        card.classList.add('card', 'm-2', 'col', 'col-lg-3', 'col-md-3', 'col-sm-3'); 

        const cardImage = document.createElement('img');
        cardImage.src = product.image
        cardImage.classList.add('card-img-top', 'img-fluid');
        cardImage.alt = "product image";

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = product.title;

        const cardDescription = document.createElement('p');
        cardDescription.classList.add('card-text');
        cardDescription.textContent = product.description;

        const cardPrice = document.createElement('p');
        cardPrice.classList.add('card-text');
        cardPrice.textContent = product.price.toString()

        const removeFromCart = document.createElement('button');
        removeFromCart.classList.add('btn', 'btn-primary');
        removeFromCart.textContent = 'Remove to Cart';
        removeFromCart.setAttribute('id', product.id.toString()); 
        removeFromCart.addEventListener('click', function () {
            removeFromLocalStorage(new Product(product.id, product.title, product.price, product.category, product.description, product.image));
        });


        cardBody.appendChild(cardImage);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDescription);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(removeFromCart);

        card.appendChild(cardBody);

        cartContainer.appendChild(card);
    });
}

function removeFromLocalStorage(productDetails: Product) {
    // Retrieve existing cart items from local storage
    let existingCartItems: Product[]

    existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new product to the cart
    let idx = -1;
    for (let i = 0; i < existingCartItems.length; i++) {
        if (existingCartItems[i].id == productDetails.id) {
            idx = i;
            break;
        }
    }
    console.log("in cart", idx, existingCartItems, productDetails)
    if (idx != -1) {
        existingCartItems.splice(idx, 1)
    }
    localStorage.setItem('cart', JSON.stringify(existingCartItems));

    console.log('Updated Cart:', existingCartItems);
    getCartProducts()
}

//retrieving all the cart products initially
getCartProducts();


function generateCartTable() {
    const cartSummaryContainer = (<HTMLElement>document.querySelector('.cart-summary'));
    cartSummaryContainer.innerHTML = "";
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'mt-5');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            ${cartProducts.map(item => `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>$${item.price}</td>
                </tr>
            `).join('')}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2"><strong>Total</strong></td>
                <td><strong>$${calculateTotal(cartProducts)}</strong></td>
            </tr>
        </tfoot>
    `;
    cartSummaryContainer.appendChild(table);
}

function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
}

function placeOrder() {
    let existingOrders: Orders[]
    let existingCartItems: Product[]

    existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(existingCartItems);
    if (existingCartItems.length > 0) {
        let orderTitles: string = "";
        let totalSum: number = 0;
        for (let i = 0; i < existingCartItems.length; i++) {
            orderTitles = orderTitles + existingCartItems[i].title + " ";
            totalSum += existingCartItems[i].price;
        }
        function padZero(value:number) {
            return value < 10 ? '0' + value : value;
        }
        const today = new Date();
        const day = padZero(today.getDate());
        const month = padZero(today.getMonth() + 1); 
        const year = String(today.getFullYear()).slice(-2);

        const formattedDate = `${day}/${month}/${year}`;


        existingOrders.push({ id: existingOrders.length, title: orderTitles, total: totalSum, date: formattedDate });
        existingCartItems = []
        localStorage.setItem('cart', JSON.stringify(existingCartItems));
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        alert("Order Placed Succesfully")
        getCartProducts();
        generateCartTable();
    }
    else alert("Your cart is empty");
}

class Orders {
    id: number;
    title: string;
    total: number;
    date: string;
}

generateCartTable();
(<HTMLElement>document.querySelector('.place-order-btn')).addEventListener('click', placeOrder);