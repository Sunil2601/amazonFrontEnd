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
function getProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(function (res) { return res.json(); })
        .then(function (result) {
        var cardContainer = document.querySelector(".products");
        var _loop_1 = function (product) {
            var card = document.createElement('div');
            card.classList.add('card', 'm-2', 'col', 'col-lg-3', 'col-md-3', 'col-sm-3');
            var cardImage = document.createElement('img');
            cardImage.src = product.image;
            cardImage.classList.add('card-img-top', 'img-fluid');
            cardImage.alt = 'Product Image';
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
            cardPrice.textContent = product.price; // Replace with actual price
            var addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('btn', 'btn-primary');
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.setAttribute('id', product.id); // Replace with actual product ID
            addToCartBtn.addEventListener('click', function () {
                saveToLocalStorage(new Product(product.id, product.title, product.price, product.category, product.description, product.image));
            });
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardPrice);
            cardBody.appendChild(addToCartBtn);
            card.appendChild(cardImage);
            card.appendChild(cardBody);
            cardContainer.appendChild(card);
        };
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var product = result_1[_i];
            _loop_1(product);
        }
    });
}
function saveToLocalStorage(productDetails) {
    var existingCartItems;
    if (localStorage.getItem("cart") == null) {
        existingCartItems = [];
    }
    else {
        existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    }
    existingCartItems.push(productDetails);
    localStorage.setItem('cart', JSON.stringify(existingCartItems));
    console.log('Updated Cart:', existingCartItems);
}
getProducts();
var electronics = document.querySelector('#Electronics');
electronics.addEventListener('click', function (event) {
    localStorage.setItem("category", "electronics");
});
var jewelery = document.querySelector('#Jewelery');
jewelery.addEventListener('click', function (event) {
    localStorage.setItem("category", "jewelery");
});
var MensClothing = document.querySelector('#MensClothing');
MensClothing.addEventListener('click', function (event) {
    localStorage.setItem("category", "men's clothing");
});
var WomensClothing = document.querySelector('#WomensClothing');
WomensClothing.addEventListener('click', function (event) {
    localStorage.setItem("category", "women's clothing");
});
