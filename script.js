const STORAGE_KEYS = {
    cart: "novamart-cart",
    wishlist: "novamart-wishlist"
};

const state = {
    products: [],
    search: "",
    category: "all",
    sort: "featured",
    page: 1,
    pageSize: 8,
    loading: true,
    error: "",
    cart: loadStorage(STORAGE_KEYS.cart),
    wishlist: loadStorage(STORAGE_KEYS.wishlist),
    selectedProductId: null,
    cartOpen: false,
    wishlistOnly: false,
    messageTimer: null
};

const categoryLabels = {
    all: "All",
    fashion: "Fashion",
    "fashion-men": "Men",
    "fashion-women": "Women",
    "fashion-kids": "Kids",
    accessories: "Accessories",
    "accessories-sunglasses": "Sunglasses",
    "accessories-watches": "Watches",
    "accessories-bags": "Bags",
    ornaments: "Ornaments",
    "ornaments-jewelry": "Artificial jewelry",
    "ornaments-fashion-jewelry": "Fashion jewelry",
    household: "Household",
    "household-kitchen": "Kitchen essentials",
    "household-home-decor": "Home decor",
    "household-daily-use": "Daily use"
};

const elements = {};

const fallbackProducts = [
    {
        id: 1,
        name: "Men's Slim Fit Oxford Shirt",
        category: "fashion-men",
        price: 899,
        mrp: 1499,
        rating: 4.3,
        reviews: 218,
        discount: 40,
        stock: 24,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
        description: "A sharp everyday shirt with a clean collar and easy drape for office and casual wear."
    },
    {
        id: 2,
        name: "Men's Comfort Chino Trousers",
        category: "fashion-men",
        price: 1099,
        mrp: 1799,
        rating: 4.2,
        reviews: 164,
        discount: 39,
        stock: 18,
        badge: "Limited Offer",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
        description: "Relaxed slim chinos with stretch comfort for office days and weekend plans."
    },
    {
        id: 3,
        name: "Men's Cotton Graphic T-Shirt",
        category: "fashion-men",
        price: 499,
        mrp: 999,
        rating: 4.4,
        reviews: 286,
        discount: 50,
        stock: 40,
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80",
        description: "Soft cotton tee with a modern fit that works for daily casual wear."
    },
    {
        id: 4,
        name: "Men's Regular Fit Jeans",
        category: "fashion-men",
        price: 1299,
        mrp: 2199,
        rating: 4.5,
        reviews: 241,
        discount: 41,
        stock: 22,
        badge: "Hot Deal",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
        description: "Classic denim with a comfortable everyday fit and durable stitching."
    },
    {
        id: 5,
        name: "Women's Floral Kurti Set",
        category: "fashion-women",
        price: 1499,
        mrp: 2499,
        rating: 4.6,
        reviews: 332,
        discount: 40,
        stock: 16,
        badge: "New Arrival",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
        description: "Comfortable kurti set with a graceful print and everyday-ready tailoring."
    },
    {
        id: 6,
        name: "Women's Cotton Maxi Dress",
        category: "fashion-women",
        price: 1699,
        mrp: 2799,
        rating: 4.5,
        reviews: 195,
        discount: 39,
        stock: 14,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
        description: "Easy-flow maxi dress with a flattering silhouette and soft breathable fabric."
    },
    {
        id: 7,
        name: "Women's Casual Western Top",
        category: "fashion-women",
        price: 799,
        mrp: 1299,
        rating: 4.1,
        reviews: 143,
        discount: 38,
        stock: 27,
        badge: "Budget Buy",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
        description: "A versatile top that pairs easily with jeans, trousers, or skirts."
    },
    {
        id: 8,
        name: "Kids Boys Cotton Co-ord Set",
        category: "fashion-kids",
        price: 999,
        mrp: 1699,
        rating: 4.4,
        reviews: 124,
        discount: 41,
        stock: 20,
        badge: "Kids Favorite",
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
        description: "Soft everyday co-ord set made for active play and casual outings."
    },
    {
        id: 9,
        name: "Kids Girls Printed Frock",
        category: "fashion-kids",
        price: 849,
        mrp: 1399,
        rating: 4.3,
        reviews: 97,
        discount: 39,
        stock: 25,
        badge: "Value Deal",
        image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
        description: "Bright printed frock with a soft feel and comfortable fit for special days."
    },
    {
        id: 10,
        name: "Classic Black Sunglasses",
        category: "accessories-sunglasses",
        price: 699,
        mrp: 1299,
        rating: 4.4,
        reviews: 276,
        discount: 46,
        stock: 31,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
        description: "Lightweight UV-protected sunglasses with a clean everyday frame."
    },
    {
        id: 11,
        name: "Anti-Glare Computer Glasses",
        category: "accessories-sunglasses",
        price: 899,
        mrp: 1599,
        rating: 4.5,
        reviews: 188,
        discount: 44,
        stock: 17,
        badge: "Limited Offer",
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80",
        description: "Comfortable glasses designed for screen time and long work sessions."
    },
    {
        id: 12,
        name: "Digital Sports Watch",
        category: "accessories-watches",
        price: 1299,
        mrp: 2199,
        rating: 4.3,
        reviews: 226,
        discount: 41,
        stock: 19,
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
        description: "Sporty watch with clean digital display and everyday durability."
    },
    {
        id: 13,
        name: "Minimal Analog Watch",
        category: "accessories-watches",
        price: 1499,
        mrp: 2499,
        rating: 4.6,
        reviews: 201,
        discount: 40,
        stock: 13,
        badge: "Top Rated",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
        description: "Clean analog watch with a simple dial and versatile styling."
    },
    {
        id: 14,
        name: "Campus Day Backpack",
        category: "accessories-bags",
        price: 1199,
        mrp: 1999,
        rating: 4.4,
        reviews: 314,
        discount: 40,
        stock: 28,
        badge: "Back to School",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
        description: "Lightweight backpack with everyday storage and a neat profile."
    },
    {
        id: 15,
        name: "Weekend Sling Bag",
        category: "accessories-bags",
        price: 799,
        mrp: 1499,
        rating: 4.2,
        reviews: 156,
        discount: 47,
        stock: 35,
        badge: "Hot Deal",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
        description: "Compact sling bag for quick errands and travel days."
    },
    {
        id: 16,
        name: "Pearl Drop Earrings Set",
        category: "ornaments-jewelry",
        price: 599,
        mrp: 1099,
        rating: 4.5,
        reviews: 142,
        discount: 45,
        stock: 21,
        badge: "Gift Pick",
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
        description: "Elegant artificial earrings with a polished finish for festive looks."
    },
    {
        id: 17,
        name: "Layered Necklace Combo",
        category: "ornaments-fashion-jewelry",
        price: 749,
        mrp: 1399,
        rating: 4.4,
        reviews: 168,
        discount: 46,
        stock: 29,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
        description: "Budget-friendly layered jewelry for daily wear and small celebrations."
    },
    {
        id: 18,
        name: "Stone Bangles Set",
        category: "ornaments-jewelry",
        price: 649,
        mrp: 1199,
        rating: 4.3,
        reviews: 119,
        discount: 46,
        stock: 26,
        badge: "Limited Offer",
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
        description: "Colorful bangle set that adds a festive finish without stretching the budget."
    },
    {
        id: 19,
        name: "Stainless Steel Kitchen Set",
        category: "household-kitchen",
        price: 999,
        mrp: 1699,
        rating: 4.5,
        reviews: 238,
        discount: 41,
        stock: 18,
        badge: "Daily Essential",
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=900&q=80",
        description: "Everyday kitchen essentials with a durable stainless-steel build."
    },
    {
        id: 20,
        name: "Scented Home Decor Candle Set",
        category: "household-home-decor",
        price: 899,
        mrp: 1499,
        rating: 4.2,
        reviews: 147,
        discount: 40,
        stock: 30,
        badge: "Cozy Pick",
        image: "https://images.unsplash.com/photo-1602872029708-84f1ad8f4b16?auto=format&fit=crop&w=900&q=80",
        description: "Decorative candles that add warmth to shelves, tables, and corners."
    }
];

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    cacheElements();
    bindEvents();
    renderCart();
    renderFiltersMessage();
    loadCatalog();
}

function cacheElements() {
    elements.searchInput = document.getElementById("search-input");
    elements.categoryFilter = document.getElementById("category-filter");
    elements.sortBy = document.getElementById("sort-by");
    elements.clearFiltersBtn = document.getElementById("clear-filters-btn");
    elements.resetEmptyBtn = document.getElementById("reset-empty-btn");
    elements.productsGrid = document.getElementById("products-grid");
    elements.loadingState = document.getElementById("loading-state");
    elements.emptyState = document.getElementById("empty-state");
    elements.pagination = document.getElementById("pagination");
    elements.resultsMeta = document.getElementById("results-meta");
    elements.messageBar = document.getElementById("message-bar");
    elements.cartToggle = document.getElementById("cart-toggle");
    elements.cartClose = document.getElementById("cart-close");
    elements.cartDrawer = document.getElementById("cart-drawer");
    elements.cartOverlay = document.getElementById("cart-overlay");
    elements.cartItems = document.getElementById("cart-items");
    elements.cartCount = document.getElementById("cart-count");
    elements.cartItemsCount = document.getElementById("cart-items-count");
    elements.cartSubtotal = document.getElementById("cart-subtotal");
    elements.cartTotal = document.getElementById("cart-total");
    elements.checkoutBtn = document.getElementById("checkout-btn");
    elements.productModal = document.getElementById("product-modal");
    elements.modalContent = document.getElementById("modal-content");
    elements.toast = document.getElementById("toast");
    elements.shopNowBtn = document.getElementById("shop-now-btn");
    elements.viewDealsBtn = document.getElementById("view-deals-btn");
    elements.wishlistToggle = document.getElementById("wishlist-toggle");
    elements.categoryPills = Array.from(document.querySelectorAll(".category-pill[data-category]"));
}

function bindEvents() {
    if (elements.searchInput) {
        elements.searchInput.addEventListener("input", () => {
            state.search = elements.searchInput.value.trim().toLowerCase();
            state.page = 1;
            renderCatalog();
        });
    }

    if (elements.categoryFilter) {
        elements.categoryFilter.addEventListener("change", () => {
            state.category = elements.categoryFilter.value;
            state.page = 1;
            renderCatalog();
        });
    }

    if (elements.sortBy) {
        elements.sortBy.addEventListener("change", () => {
            state.sort = elements.sortBy.value;
            state.page = 1;
            renderCatalog();
        });
    }

    if (elements.clearFiltersBtn) {
        elements.clearFiltersBtn.addEventListener("click", resetFilters);
    }

    if (elements.resetEmptyBtn) {
        elements.resetEmptyBtn.addEventListener("click", resetFilters);
    }

    if (elements.cartToggle) {
        elements.cartToggle.addEventListener("click", () => toggleCart(true));
    }

    if (elements.cartClose) {
        elements.cartClose.addEventListener("click", () => toggleCart(false));
    }

    if (elements.cartOverlay) {
        elements.cartOverlay.addEventListener("click", () => toggleCart(false));
    }

    if (elements.checkoutBtn) {
        elements.checkoutBtn.addEventListener("click", checkout);
    }

    if (elements.shopNowBtn) {
        elements.shopNowBtn.addEventListener("click", () => scrollToCatalog());
    }

    if (elements.viewDealsBtn) {
        elements.viewDealsBtn.addEventListener("click", () => {
            state.sort = "discount-high";
            if (elements.sortBy) {
                elements.sortBy.value = "discount-high";
            }
            state.page = 1;
            renderCatalog();
            scrollToCatalog();
        });
    }

    if (elements.wishlistToggle) {
        elements.wishlistToggle.addEventListener("click", () => {
            state.wishlistOnly = !state.wishlistOnly;
            elements.wishlistToggle.setAttribute("aria-pressed", String(state.wishlistOnly));
            elements.wishlistToggle.textContent = state.wishlistOnly ? "All products" : "Wishlist";
            state.page = 1;
            renderCatalog();
        });
    }

    elements.categoryPills.forEach((pill) => {
        pill.addEventListener("click", () => {
            state.category = pill.dataset.category || "all";
            if (elements.categoryFilter) {
                elements.categoryFilter.value = state.category === "all" ? "all" : getGroupKey(state.category);
            }
            state.page = 1;
            renderCatalog();
        });
    });

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyboardShortcuts);
}

async function loadCatalog() {
    showLoading(true);
    try {
        await delay(550);
        const response = await fetch("products.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Catalog request failed with status ${response.status}`);
        }

        const products = await response.json();
        state.products = normalizeProducts(products);
        state.error = "";
        showMessage(`Loaded ${state.products.length} products from the catalog.`, "success");
    } catch (error) {
        state.products = normalizeProducts(fallbackProducts);
        state.error = "Using built-in catalog because the JSON file could not be loaded.";
        showMessage(state.error, "error");
    } finally {
        state.loading = false;
        showLoading(false);
        renderCatalog();
        renderCart();
    }
}

function normalizeProducts(products) {
    return products.map((product) => ({
        ...product,
        name: String(product.name || "Untitled product"),
        category: String(product.category || "general"),
        price: Number(product.price || 0),
        mrp: Number(product.mrp || product.price || 0),
        rating: Number(product.rating || 0),
        reviews: Number(product.reviews || 0),
        discount: Number(product.discount || 0),
        stock: Number(product.stock || 0),
        badge: String(product.badge || "Featured"),
        image: product.image || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80",
        description: String(product.description || "")
    }));
}

function showLoading(isLoading) {
    elements.loadingState.hidden = !isLoading;
    elements.productsGrid.hidden = isLoading;
    elements.pagination.hidden = isLoading;
    elements.emptyState.hidden = true;
}

function renderCatalog() {
    const visibleProducts = getVisibleProducts();
    const pageCount = Math.max(1, Math.ceil(visibleProducts.length / state.pageSize));

    if (state.page > pageCount) {
        state.page = pageCount;
    }

    const pagedProducts = visibleProducts.slice((state.page - 1) * state.pageSize, state.page * state.pageSize);

    renderFiltersMessage(visibleProducts);
    renderProducts(pagedProducts);
    renderPagination(visibleProducts.length);
    updateCategoryPills();

    elements.productsGrid.hidden = false;
    elements.pagination.hidden = false;
    elements.emptyState.hidden = visibleProducts.length !== 0;
    elements.loadingState.hidden = true;
}

function getVisibleProducts() {
    let filtered = state.products.filter((product) => {
        const matchesSearch = !state.search || [product.name, product.category, product.badge, product.description].join(" ").toLowerCase().includes(state.search);
        const matchesCategory = matchesCategoryValue(product.category, state.category);
        const matchesWishlist = !state.wishlistOnly || state.wishlist.includes(product.id);
        return matchesSearch && matchesCategory && matchesWishlist;
    });

    filtered = sortProducts(filtered, state.sort);
    return filtered;
}

function sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
        case "price-low":
            return sorted.sort((a, b) => a.price - b.price);
        case "price-high":
            return sorted.sort((a, b) => b.price - a.price);
        case "rating-high":
            return sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        case "discount-high":
            return sorted.sort((a, b) => b.discount - a.discount);
        default:
            return sorted.sort((a, b) => b.rating - a.rating || b.discount - a.discount || a.price - b.price);
    }
}

function renderProducts(products) {
    if (!products.length) {
        elements.productsGrid.innerHTML = "";
        return;
    }

    elements.productsGrid.innerHTML = products.map((product) => {
        const isWishlisted = state.wishlist.includes(product.id);
        return `
            <article class="product-card">
                <div class="product-card__media">
                    <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">
                    <span class="badge-pill">${escapeHtml(product.badge)}</span>
                    <button class="wish-btn ${isWishlisted ? "is-active" : ""}" type="button" data-action="toggle-wishlist" data-id="${product.id}" aria-label="${isWishlisted ? "Remove from wishlist" : "Add to wishlist"}">
                        <svg class="icon" aria-hidden="true"><use href="#icon-heart"></use></svg>
                    </button>
                    <span class="stock-pill">${product.stock} left</span>
                </div>
                <div class="product-card__body">
                    <span class="product-card__category">${escapeHtml(product.category)}</span>
                    <h3 class="product-card__title">${escapeHtml(product.name)}</h3>
                    <div class="rating-row">
                        <svg class="icon" aria-hidden="true"><use href="#icon-star"></use></svg>
                        <span>${product.rating.toFixed(1)}</span>
                        <span class="product-card__meta">(${product.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <div class="price-row">
                        <strong>${formatCurrency(product.price)}</strong>
                        <del>${formatCurrency(product.mrp)}</del>
                    </div>
                    <span class="discount-note">Save ${product.discount}% today</span>
                    <div class="product-card__actions">
                        <button class="secondary-btn" type="button" data-action="view-details" data-id="${product.id}">Details</button>
                        <button class="primary-btn" type="button" data-action="add-to-cart" data-id="${product.id}">Add to cart</button>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function renderPagination(totalItems) {
    const pageCount = Math.max(1, Math.ceil(totalItems / state.pageSize));

    if (pageCount <= 1) {
        elements.pagination.innerHTML = "";
        elements.pagination.hidden = true;
        return;
    }

    const pages = [];
    for (let index = 1; index <= pageCount; index += 1) {
        pages.push(`
            <button class="page-btn ${index === state.page ? "is-active" : ""}" type="button" data-page="${index}" aria-current="${index === state.page ? "page" : "false"}">${index}</button>
        `);
    }

    elements.pagination.innerHTML = `
        <button class="page-btn" type="button" data-page-nav="prev" ${state.page === 1 ? "disabled" : ""}>Prev</button>
        ${pages.join("")}
        <button class="page-btn" type="button" data-page-nav="next" ${state.page === pageCount ? "disabled" : ""}>Next</button>
    `;
}

function renderFiltersMessage(visibleProducts = getVisibleProducts()) {
    const categoryText = state.category === "all" ? "all categories" : (categoryLabels[state.category] || state.category);
    const searchText = state.search ? `for “${state.search}”` : "";
    const wishlistText = state.wishlistOnly ? " in wishlist only" : "";
    elements.resultsMeta.textContent = `${visibleProducts.length} item${visibleProducts.length === 1 ? "" : "s"} matched ${searchText || "your filters"}${state.category !== "all" ? ` in ${categoryText}` : ""}${wishlistText}.`;
}

function renderCart() {
    const cartItems = state.cart.map((cartItem) => {
        const product = state.products.find((item) => item.id === cartItem.id) || fallbackProducts.find((item) => item.id === cartItem.id) || cartItem;
        return { ...product, qty: cartItem.qty };
    });

    const count = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    elements.cartCount.textContent = String(count);
    elements.cartItemsCount.textContent = String(count);
    elements.cartSubtotal.textContent = formatCurrency(subtotal);
    elements.cartTotal.textContent = formatCurrency(subtotal);

    if (!cartItems.length) {
        elements.cartItems.innerHTML = `
            <div class="empty-state" style="margin: 0; padding: 28px 18px; box-shadow: none; background: transparent; border: 0;">
                <div class="empty-illustration">🛍</div>
                <h3>Your cart is empty</h3>
                <p>Add a product to see quantity controls, totals, and checkout actions here.</p>
            </div>
        `;
        return;
    }

    elements.cartItems.innerHTML = cartItems.map((item) => `
        <article class="cart-item">
            <img class="cart-item__image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
            <div class="cart-item__content">
                <div class="cart-item__top">
                    <div>
                        <h3 class="cart-item__title">${escapeHtml(item.name)}</h3>
                        <p class="cart-item__meta">${escapeHtml(item.category)} • ${formatCurrency(item.price)}</p>
                    </div>
                    <button class="remove-btn" type="button" data-action="remove-from-cart" data-id="${item.id}" aria-label="Remove ${escapeHtml(item.name)}">×</button>
                </div>
                <div class="cart-item__controls">
                    <button class="qty-btn" type="button" data-action="change-qty" data-id="${item.id}" data-delta="-1" aria-label="Decrease quantity">
                        <svg class="icon" aria-hidden="true"><use href="#icon-minus"></use></svg>
                    </button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" type="button" data-action="change-qty" data-id="${item.id}" data-delta="1" aria-label="Increase quantity">
                        <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
                    </button>
                    <span class="cart-item__price">${formatCurrency(item.price * item.qty)}</span>
                </div>
            </div>
        </article>
    `).join("");
}

function openProductModal(productId) {
    const product = state.products.find((item) => item.id === productId);
    if (!product) {
        return;
    }

    state.selectedProductId = productId;
    const inWishlist = state.wishlist.includes(product.id);
    elements.modalContent.innerHTML = `
        <article class="modal-product">
            <div class="modal-product__media">
                <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
            </div>
            <div class="modal-product__body">
                <span class="eyebrow">Product details</span>
                <h2 id="modal-title" class="modal__title">${escapeHtml(product.name)}</h2>
                <div class="modal-meta">
                    <span>${escapeHtml(product.category)}</span>
                    <span>•</span>
                    <span>${product.rating.toFixed(1)} rating</span>
                    <span>•</span>
                    <span>${product.reviews.toLocaleString()} reviews</span>
                </div>
                <p class="modal-copy">${escapeHtml(product.description)}</p>
                <div class="modal-price">
                    <strong>${formatCurrency(product.price)}</strong>
                    <del>${formatCurrency(product.mrp)}</del>
                    <span class="discount-note">${product.discount}% off</span>
                </div>
                <div class="modal-meta">
                    <span>${product.stock} units in stock</span>
                    <span>•</span>
                    <span>Free delivery on orders over ₹999</span>
                </div>
                <div class="modal-actions">
                    <button class="primary-btn" type="button" data-action="add-to-cart" data-id="${product.id}">Add to cart</button>
                    <button class="secondary-btn" type="button" data-action="toggle-wishlist" data-id="${product.id}">${inWishlist ? "Remove wishlist" : "Save for later"}</button>
                </div>
            </div>
        </article>
    `;

    toggleModal(true);
}

function toggleCart(forceState) {
    state.cartOpen = typeof forceState === "boolean" ? forceState : !state.cartOpen;
    elements.cartDrawer.classList.toggle("is-open", state.cartOpen);
    elements.cartDrawer.setAttribute("aria-hidden", String(!state.cartOpen));
}

function toggleModal(forceState) {
    const isOpen = typeof forceState === "boolean" ? forceState : !elements.productModal.classList.contains("is-open");
    elements.productModal.classList.toggle("is-open", isOpen);
    elements.productModal.setAttribute("aria-hidden", String(!isOpen));
}

function addToCart(productId) {
    const item = state.cart.find((entry) => entry.id === productId);
    if (item) {
        item.qty += 1;
    } else {
        state.cart.push({ id: productId, qty: 1 });
    }

    saveStorage(STORAGE_KEYS.cart, state.cart);
    renderCart();
    showToast("Added to cart");
}

function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.id !== productId);
    saveStorage(STORAGE_KEYS.cart, state.cart);
    renderCart();
    showToast("Removed from cart");
}

function changeQty(productId, delta) {
    const item = state.cart.find((entry) => entry.id === productId);
    if (!item) {
        return;
    }

    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }

    saveStorage(STORAGE_KEYS.cart, state.cart);
    renderCart();
}

function toggleWishlist(productId) {
    if (state.wishlist.includes(productId)) {
        state.wishlist = state.wishlist.filter((id) => id !== productId);
        showToast("Removed from wishlist");
    } else {
        state.wishlist.push(productId);
        showToast("Saved to wishlist");
    }

    saveStorage(STORAGE_KEYS.wishlist, state.wishlist);

    if (state.wishlistOnly) {
        renderCatalog();
    } else {
        renderCatalog();
    }

    if (state.selectedProductId === productId && elements.productModal.classList.contains("is-open")) {
        openProductModal(productId);
    }
}

function checkout() {
    if (!state.cart.length) {
        showToast("Your cart is empty");
        return;
    }

    state.cart = [];
    saveStorage(STORAGE_KEYS.cart, state.cart);
    renderCart();
    toggleCart(false);
    showToast("Checkout simulated successfully");
}

function resetFilters() {
    state.search = "";
    state.category = "all";
    state.sort = "featured";
    state.page = 1;
    state.wishlistOnly = false;
    elements.searchInput.value = "";
    elements.categoryFilter.value = "all";
    elements.sortBy.value = "featured";
    elements.wishlistToggle.textContent = "Wishlist";
    elements.wishlistToggle.setAttribute("aria-pressed", "false");
    renderCatalog();
    scrollToCatalog();
}

function matchesCategoryValue(productCategory, activeCategory) {
    if (activeCategory === "all") {
        return true;
    }

    if (productCategory === activeCategory) {
        return true;
    }

    return getGroupKey(productCategory) === activeCategory;
}

function getGroupKey(categoryKey) {
    return String(categoryKey).split("-")[0];
}

function updateCategoryPills() {
    elements.categoryPills.forEach((pill) => {
        pill.classList.toggle("is-active", (pill.dataset.category || "all") === state.category);
    });
}

function scrollToCatalog() {
    document.getElementById("top").scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleDocumentClick(event) {
    const actionTarget = event.target.closest("[data-action]");
    const pageTarget = event.target.closest("[data-page], [data-page-nav]");
    const closeModalTarget = event.target.closest("[data-close-modal]");

    if (actionTarget) {
        const productId = Number(actionTarget.dataset.id);
        const action = actionTarget.dataset.action;

        if (action === "add-to-cart") {
            addToCart(productId);
            return;
        }

        if (action === "remove-from-cart") {
            removeFromCart(productId);
            return;
        }

        if (action === "change-qty") {
            changeQty(productId, Number(actionTarget.dataset.delta || 0));
            return;
        }

        if (action === "toggle-wishlist") {
            toggleWishlist(productId);
            return;
        }

        if (action === "view-details") {
            openProductModal(productId);
            return;
        }
    }

    if (pageTarget) {
        if (pageTarget.dataset.page) {
            state.page = Number(pageTarget.dataset.page);
        } else if (pageTarget.dataset.pageNav === "prev") {
            state.page = Math.max(1, state.page - 1);
        } else if (pageTarget.dataset.pageNav === "next") {
            const totalPages = Math.max(1, Math.ceil(getVisibleProducts().length / state.pageSize));
            state.page = Math.min(totalPages, state.page + 1);
        }

        renderCatalog();
        scrollToCatalog();
    }

    if (closeModalTarget) {
        toggleModal(false);
    }
}

function handleKeyboardShortcuts(event) {
    if (event.key === "Escape") {
        toggleCart(false);
        toggleModal(false);
    }
}

function showToast(message) {
    clearTimeout(state.messageTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");

    state.messageTimer = window.setTimeout(() => {
        elements.toast.classList.remove("is-visible");
    }, 2200);
}

function showMessage(message, type = "") {
    elements.messageBar.textContent = message;
    elements.messageBar.className = `message-bar ${type ? `is-${type}` : ""}`.trim();
}

function saveStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadStorage(key) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        return [];
    }
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function delay(milliseconds) {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}