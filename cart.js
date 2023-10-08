var Product = /** @class */ (function () {
    function Product(id, title, price, category, description, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image == image;
        this.category = category;
        this.description = description;
        this.image = image;
    }
    return Product;
}());
function getCartProducts() {
    var cartContainer = document.querySelector('.cartContainer');
    cartContainer.innerHTML = "";
    var cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartProducts.lenght == 0) {
        cartContainer.innerHTML = "The cart is empty";
        return;
    }
    cartProducts.forEach(function (product) {
        var card = document.createElement('div');
        card.classList.add('card', 'm-2', 'col', 'col-lg-3', 'col-md-3', 'col-sm-3');
        var cardImage = document.createElement('img');
        cardImage.src = product.image;
        cardImage.classList.add('card-img-top', 'img-fluid');
        cardImage.alt = "product image";
        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        var cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = product.title;
        var cardDescription = document.createElement('p');
        cardDescription.classList.add('card-text');
        cardDescription.textContent = product.description;
        var cardPrice = document.createElement('p');
        cardPrice.classList.add('card-text');
        cardPrice.textContent = product.price.toString();
        var removeFromCart = document.createElement('button');
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
function removeFromLocalStorage(productDetails) {
    // Retrieve existing cart items from local storage
    var existingCartItems;
    existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    // Add the new product to the cart
    var idx = -1;
    for (var i = 0; i < existingCartItems.length; i++) {
        if (existingCartItems[i].id == productDetails.id) {
            idx = i;
            break;
        }
    }
    console.log("in cart", idx, existingCartItems, productDetails);
    if (idx != -1) {
        existingCartItems.splice(idx, 1);
    }
    localStorage.setItem('cart', JSON.stringify(existingCartItems));
    console.log('Updated Cart:', existingCartItems);
    getCartProducts();
}
//retrieving all the cart products initially
getCartProducts();
function generateCartTable() {
    var cartSummaryContainer = document.querySelector('.cart-summary');
    cartSummaryContainer.innerHTML = "";
    var cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    var table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'mt-5');
    table.innerHTML = "\n        <thead>\n            <tr>\n                <th>ID</th>\n                <th>Name</th>\n                <th>Price</th>\n            </tr>\n        </thead>\n        <tbody>\n            ".concat(cartProducts.map(function (item) { return "\n                <tr>\n                    <td>".concat(item.id, "</td>\n                    <td>").concat(item.title, "</td>\n                    <td>$").concat(item.price, "</td>\n                </tr>\n            "); }).join(''), "\n        </tbody>\n        <tfoot>\n            <tr>\n                <td colspan=\"2\"><strong>Total</strong></td>\n                <td><strong>$").concat(calculateTotal(cartProducts), "</strong></td>\n            </tr>\n        </tfoot>\n    ");
    cartSummaryContainer.appendChild(table);
}
function calculateTotal(cart) {
    return cart.reduce(function (total, item) { return total + item.price; }, 0);
}
function placeOrder() {
    var existingOrders;
    var existingCartItems;
    existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(existingCartItems);
    if (existingCartItems.length > 0) {
        var orderTitles = "";
        var totalSum = 0;
        for (var i = 0; i < existingCartItems.length; i++) {
            orderTitles = orderTitles + existingCartItems[i].title + " ";
            totalSum += existingCartItems[i].price;
        }
        function padZero(value) {
            return value < 10 ? '0' + value : value;
        }
        var today = new Date();
        var day = padZero(today.getDate());
        var month = padZero(today.getMonth() + 1);
        var year = String(today.getFullYear()).slice(-2);
        var formattedDate = "".concat(day, "/").concat(month, "/").concat(year);
        existingOrders.push({ id: existingOrders.length, title: orderTitles, total: totalSum, date: formattedDate });
        existingCartItems = [];
        localStorage.setItem('cart', JSON.stringify(existingCartItems));
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        alert("Order Placed Succesfully");
        getCartProducts();
        generateCartTable();
    }
    else
        alert("Your cart is empty");
}
var Orders = /** @class */ (function () {
    function Orders() {
    }
    return Orders;
}());
generateCartTable();
document.querySelector('.place-order-btn').addEventListener('click', placeOrder);
