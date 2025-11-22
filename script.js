
function searchProducts() {
    let input = document.getElementById('searchBox').value.toLowerCase();
    let products = document.querySelectorAll('.product');
    products.forEach(product => {
        let name = product.innerText.toLowerCase();
        product.style.display = name.includes(input) ? 'block' : 'none';
    });
}

function addToWishlist(name, category, price, image) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.some(item => item.name === name)) {
    wishlist.push({ name, category, price, image }); 
    localStorage.setItem("wishlist", JSON.stringify(wishlist)); 
    alert(`${name} added to Wishlist!`);  
    updateWishlistCount(); 
    } else {
    alert(`${name} is already in your Wishlist!`);
    }
}
     function updateWishlistCount() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    document.getElementById("wishlistCount").innerText= wishlist.length;
}
    window.onload = updateWishlistCount;
 
function loadWishlist() {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        let wishlistContainer = document.getElementById("wishlistItems");

        wishlistContainer.innerHTML = wishlist.length === 0 ? 
            "<h3>Your Wishlist is empty.</h3>" : "";

        wishlist.forEach((item, index) => {
            wishlistContainer.innerHTML += `
                <div class="wishlist-item">
                    <img src="${item.image}" alt="${item.name}" width="100">
                    <h3>${item.name}</h3>
                    <p>${item.category}</p>
                    <p>₹${item.price}</p>
                    <button onclick="removeFromWishlist(${index})">Remove</button>
                </div>
            `;
        });
    }
    function removeFromWishlist(index) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        loadWishlist();
    }
    window.onload = loadWishlist;



function filterProducts(){
    let selectedCategory = document.getElementById("category").value;
    let products = document.querySelectorAll(".product");
    products.forEach(product => {
        if (selectedCategory === "all")
        { product.style.display = "block";
        } else {
          product.style.display =product.classList.contains(selectedCategory)? "block" : "none";
        }
    });
}

function showPaymentOptions() {
    let payment = document.getElementById("payment").value;
    let paymentOptions = document.getElementById("paymentOptions");

    if (payment) {
        paymentOptions.style.display = "block"; 
    } else {
        paymentOptions.style.display = "none"; 
    }
}

function placeOrder() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let payment = document.getElementById("payment").value;

    if (name === "" || address === "" || payment === "") {
        alert("Please fill all details and select a payment method.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let orderDetails = {
        customerName: name,
        customerAddress: address,
        paymentMethod: payment,
        products: cart, 
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(orders)); 

    alert("Order Confirmed! Thank you for shopping with us. ✅");
    localStorage.removeItem("cart"); 
    window.location.href = "home.html"; 
}


function addToCart(name, category, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, category, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").innerText = `(${totalCount})`;
}

document.addEventListener("DOMContentLoaded", updateCartCount);


