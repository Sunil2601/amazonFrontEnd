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

function getProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(result => {

            let cardContainer = (<HTMLElement>document.querySelector(".products"));
            for (let product of result) {
                const card = document.createElement('div');
                card.classList.add('card', 'm-2', 'col', 'col-lg-3', 'col-md-3', 'col-sm-3');

                const cardImage = document.createElement('img');
                cardImage.src = product.image 
                cardImage.classList.add('card-img-top', 'img-fluid');
                cardImage.alt = 'Product Image';

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
                cardPrice.textContent = product.price

                const addToCartBtn = document.createElement('button');
                addToCartBtn.classList.add('btn', 'btn-primary');
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.setAttribute('id', product.id); 
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
            }
        })
}

function saveToLocalStorage(productDetails: Product) {
    let existingCartItems: Product[]
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

var electronics = <HTMLElement>document.querySelector('#Electronics');
electronics.addEventListener('click', function (event) {
    localStorage.setItem("category", "electronics");
});
var jewelery = <HTMLElement>document.querySelector('#Jewelery');
jewelery.addEventListener('click', function (event) {
    localStorage.setItem("category", "jewelery");
});

var MensClothing = <HTMLElement>document.querySelector('#MensClothing');
MensClothing.addEventListener('click', function (event) {
    localStorage.setItem("category", "men's clothing");
});

var WomensClothing = <HTMLElement>document.querySelector('#WomensClothing');
WomensClothing.addEventListener('click', function (event) {
    localStorage.setItem("category", "women's clothing");
});


