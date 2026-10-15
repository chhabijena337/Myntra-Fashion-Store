
const products = [
    {
        id: 1,
        brand: "Roadster",
        name: "Men's Casual Cotton Shirt",
        category: "Men",
        price: 799,
        oldPrice: 1599,
        rating: 4.4,
        discount: 50,
        image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        brand: "Style Avenue",
        name: "Women's Elegant Everyday Outfit",
        category: "Women",
        price: 1199,
        oldPrice: 2399,
        rating: 4.7,
        discount: 50,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        brand: "Urban Classic",
        name: "Men's Everyday Sneakers",
        category: "Men",
        price: 1499,
        oldPrice: 2499,
        rating: 4.3,
        discount: 40,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        brand: "Little Stars",
        name: "Kids' Casual Fashion",
        category: "Kids",
        price: 649,
        oldPrice: 999,
        rating: 4.5,
        discount: 35,
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        brand: "Home Edit",
        name: "Decorative Cushion Collection",
        category: "Home",
        price: 599,
        oldPrice: 999,
        rating: 4.2,
        discount: 40,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        brand: "Glow Studio",
        name: "Everyday Beauty Essentials",
        category: "Beauty",
        price: 499,
        oldPrice: 799,
        rating: 4.6,
        discount: 38,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        brand: "Trendsetter",
        name: "Women's Modern Casual Wear",
        category: "Women",
        price: 999,
        oldPrice: 1799,
        rating: 4.8,
        discount: 44,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        brand: "Street Mode",
        name: "Men's Streetwear Outfit",
        category: "Men",
        price: 1299,
        oldPrice: 1999,
        rating: 4.1,
        discount: 35,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        brand: "Little Trend",
        name: "Kids' Everyday Essentials",
        category: "Kids",
        price: 549,
        oldPrice: 899,
        rating: 4.3,
        discount: 39,
        image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        brand: "Home Comfort",
        name: "Minimal Home Accessories",
        category: "Home",
        price: 899,
        oldPrice: 1499,
        rating: 4.6,
        discount: 40,
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        brand: "Beauty Edit",
        name: "Makeup and Beauty Collection",
        category: "Beauty",
        price: 699,
        oldPrice: 1199,
        rating: 4.5,
        discount: 42,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        brand: "Modern Muse",
        name: "Women's Stylish Handbag",
        category: "Women",
        price: 1599,
        oldPrice: 2999,
        rating: 4.7,
        discount: 47,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    }
];

// DOM ELEMENTS
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const sortSelect = document.getElementById("sortSelect");
const filterButtons = document.getElementById("filterButtons");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");

const wishlistCount = document.getElementById("wishlistCount");
const bagCount = document.getElementById("bagCount");

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

let activeCategory = "All";
let wishlistOnly = false;
let toastTimer;

// Safely load saved data from localStorage.
function loadSavedData(key) {
    try {
        const saved = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

let wishlist = loadSavedData("fashion-demo-wishlist");
let bag = loadSavedData("fashion-demo-bag");

// Format Indian currency.
function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

// Save application data.
function saveData() {
    try {
        localStorage.setItem(
            "fashion-demo-wishlist",
            JSON.stringify(wishlist)
        );

        localStorage.setItem(
            "fashion-demo-bag",
            JSON.stringify(bag)
        );
    } catch {
        showToast("Unable to save changes in this browser.");
    }
}

// Show a temporary notification.
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Update wishlist and bag counters.
function updateCounters() {
    wishlistCount.textContent = wishlist.length;
    bagCount.textContent = bag.length;

    wishlistCount.hidden = wishlist.length === 0;
    bagCount.hidden = bag.length === 0;

    saveData();
}

// Build a product card.
function createProductCard(product) {
    const isWishlisted = wishlist.includes(product.id);
    const isInBag = bag.includes(product.id);

    const column = document.createElement("div");
    column.className = "col-6 col-md-4 col-lg-3";

    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    image.addEventListener("error", () => {
        image.alt = "Product image unavailable";
        image.style.opacity = "0.25";
    }, { once: true });

    const discount = document.createElement("span");
    discount.className = "discount-label";
    discount.textContent = `${product.discount}% OFF`;

    const heart = document.createElement("button");
    heart.className = "wishlist-toggle" + (isWishlisted ? " active" : "");
    heart.type = "button";
    heart.setAttribute("aria-label",
        isWishlisted ? "Remove from wishlist" : "Add to wishlist"
    );
    heart.setAttribute("aria-pressed", String(isWishlisted));

    const heartIcon = document.createElement("i");
    heartIcon.className = isWishlisted ? "bi bi-heart-fill" : "bi bi-heart";
    heart.appendChild(heartIcon);

    heart.addEventListener("click", () => toggleWishlist(product.id));

    imageWrap.append(image, discount, heart);

    const info = document.createElement("div");
    info.className = "product-info";

    const brand = document.createElement("h3");
    brand.className = "product-brand";
    brand.textContent = product.brand;

    const name = document.createElement("p");
    name.className = "product-name";
    name.textContent = product.name;

    const rating = document.createElement("div");
    rating.className = "product-rating";

    const ratingText = document.createElement("span");
    ratingText.textContent = product.rating.toFixed(1);

    const star = document.createElement("i");
    star.className = "bi bi-star-fill";

    rating.append(ratingText, star);

    const priceRow = document.createElement("div");
    priceRow.className = "price-row";

    const currentPrice = document.createElement("span");
    currentPrice.className = "current-price";
    currentPrice.textContent = formatPrice(product.price);

    const oldPrice = document.createElement("span");
    oldPrice.className = "original-price";
    oldPrice.textContent = formatPrice(product.oldPrice);

    const discountText = document.createElement("span");
    discountText.className = "discount-text";
    discountText.textContent = `(${product.discount}% off)`;

    priceRow.append(currentPrice, oldPrice, discountText);

    const addButton = document.createElement("button");
    addButton.className = "add-to-bag";
    addButton.type = "button";
    addButton.innerHTML = isInBag
        ? '<i class="bi bi-check2"></i> ADDED TO BAG'
        : '<i class="bi bi-bag-plus"></i> ADD TO BAG';

    addButton.addEventListener("click", () => addToBag(product.id));

    info.append(brand, name, rating, priceRow, addButton);
    card.append(imageWrap, info);
    column.appendChild(card);

    return column;
}

// Filter and sort products.
function getVisibleProducts() {
    const query = searchInput.value.trim().toLowerCase();

    let visible = products.filter(product => {
        const matchesCategory =
            activeCategory === "All" ||
            product.category === activeCategory;

        const searchableText =
            `${product.brand} ${product.name} ${product.category}`.toLowerCase();

        const matchesSearch = searchableText.includes(query);

        const matchesWishlist =
            !wishlistOnly || wishlist.includes(product.id);

        return matchesCategory && matchesSearch && matchesWishlist;
    });

    switch (sortSelect.value) {
        case "low":
            visible.sort((a, b) => a.price - b.price);
            break;

        case "high":
            visible.sort((a, b) => b.price - a.price);
            break;

        case "rating":
            visible.sort((a, b) => b.rating - a.rating);
            break;
    }

    return visible;
}

// Render the product grid.
function renderProducts() {
    const visibleProducts = getVisibleProducts();

    productGrid.replaceChildren();

    visibleProducts.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });

    resultCount.textContent =
        `Showing ${visibleProducts.length} of ${products.length} products`;

    emptyState.hidden = visibleProducts.length !== 0;

    clearSearch.hidden = searchInput.value.length === 0;

    document.querySelectorAll(".filter-btn").forEach(button => {
        const isActive =
            button.dataset.category === activeCategory;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    document.getElementById("wishlistBtn").setAttribute(
        "aria-pressed", String(wishlistOnly)
    );
}

// Select a category.
function selectCategory(category) {
    const validCategories = [
        "All", "Men", "Women", "Kids", "Home", "Beauty"
    ];

    activeCategory = validCategories.includes(category)
        ? category
        : "All";

    wishlistOnly = false;

    renderProducts();

    document.getElementById("products").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    mainNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
}

// Add or remove wishlist item.
function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showToast("Removed from wishlist.");
    } else {
        wishlist.push(productId);
        showToast("Added to wishlist!");
    }

    updateCounters();
    renderProducts();
}

// Add item to shopping bag.
function addToBag(productId) {
    if (bag.includes(productId)) {
        showToast("This demo keeps one of each product in your bag.");
        return;
    }

    bag.push(productId);

    updateCounters();
    renderProducts();

    const product = products.find(item => item.id === productId);
    showToast(`${product.brand} added to your bag!`);
}

// SEARCH
searchInput.addEventListener("input", renderProducts);

clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    renderProducts();
    searchInput.focus();
});

// FILTER BUTTONS
filterButtons.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");

    if (!button) return;

    selectCategory(button.dataset.category);
});

// CATEGORY CARDS AND NAVIGATION
document.querySelectorAll(
    ".category-card, .main-nav [data-category], .footer-grid [data-category]"
).forEach(element => {
    element.addEventListener("click", event => {
        event.preventDefault();
        selectCategory(element.dataset.category);
    });
});

// SORT
sortSelect.addEventListener("change", renderProducts);

// RESET FILTERS
document.getElementById("resetBtn").addEventListener("click", () => {
    searchInput.value = "";
    sortSelect.value = "featured";
    activeCategory = "All";
    wishlistOnly = false;

    renderProducts();
});

// WISHLIST VIEW
document.getElementById("wishlistBtn").addEventListener("click", () => {
    wishlistOnly = !wishlistOnly;
    activeCategory = "All";

    renderProducts();

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

    showToast(
        wishlistOnly ? "Showing your wishlist." : "Showing all products."
    );
});

// SHOPPING BAG SUMMARY
document.getElementById("bagBtn").addEventListener("click", () => {
    const selectedProducts = products.filter(
        product => bag.includes(product.id)
    );

    if (selectedProducts.length === 0) {
        showToast("Your bag is empty. Add a product to get started.");
        return;
    }

    const total = selectedProducts.reduce(
        (sum, product) => sum + product.price, 0
    );

    showToast(
        `Bag: ${selectedProducts.length} item(s) | Total: ${formatPrice(total)}`
    );
});

// PROFILE DEMO
document.getElementById("profileBtn").addEventListener("click", () => {
    showToast("Welcome! Login and account management are demo features.");
});

// MOBILE MENU
menuBtn.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(isOpen));

    menuBtn.innerHTML = isOpen
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';
});

// FOOTER YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

// INITIALIZE APP
updateCounters();
renderProducts();
