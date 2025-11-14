// Variables for filtering products by category, sorting, and displaying from JSON
const productsCategory = document.getElementById("category");
const productsSort = document.getElementById("sort");
const productsGrid = document.getElementById("products-grid");
let productsData = [{
    id: "",
    name:"",
    price: 0,
    category: "",
    image: "",
    description: ""
}]

// Fetch products from JSON file
async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products:', error);
        }
        productsData = await response.json();
        displayProducts(productsData);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};
fetchProducts();

// Display products in the grid
function displayProducts(products) {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="price">$${product.price.toFixed(2)}</span>
            <button class="btn-add-to-cart" data-id="${product.id}">
            <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
}

//Events for filtering by category and sorting products
productsCategory.addEventListener("change", applyFilters);
productsSort.addEventListener("change", applyFilters);

//Function to apply filters and sorting
function applyFilters() {
    let filteredProducts = [...productsData];

    const categoryValue = productsCategory.value;
    if (categoryValue !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === categoryValue);
    }

    const sortValue = productsSort.value;
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    displayProducts(filteredProducts);
}

// Making Add to Cart Button Functional and Update Cart UI
productsGrid.addEventListener('click', function(event) {
    if(event.target.classList.contains('btn-add-to-cart')) {
        const productId = Number(event.target.getAttribute('data-id'));
        const product = productsData.find(item => item.id === productId);
            if(product) {
                addToCart(product);
                updateCartUI();
        }
    }
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}