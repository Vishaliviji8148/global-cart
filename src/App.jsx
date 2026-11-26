import React, { useEffect, useState } from "react";
import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 2499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    description: "Premium wireless headphones with amazing sound quality.",
    colors: ["Black", "White", "Blue", "Pink"],
    sizes: ["Standard"],
  },
  {
    id: 2,
    name: "Classic Sports Sneakers",
    category: "Fashion",
    price: 1899,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    description: "Comfortable and stylish sports sneakers.",
    colors: ["Red", "Black", "White", "Blue"],
    sizes: ["6", "7", "8", "9", "10", "11"],
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 3299,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    description: "Track your fitness and daily activities.",
    colors: ["Black", "Silver", "Rose Gold"],
    sizes: ["Standard"],
  },
  {
    id: 4,
    name: "Luxury Skincare Set",
    category: "Beauty",
    price: 1499,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600",
    description: "Premium skincare collection.",
    colors: ["Pink", "White", "Gold"],
    sizes: ["Standard"],
  },
  {
    id: 5,
    name: "Modern Designer Backpack",
    category: "Fashion",
    price: 1199,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    description: "Stylish backpack for everyday use.",
    colors: ["Black", "Blue", "Brown", "Grey"],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: 6,
    name: "Minimal Table Lamp",
    category: "Home",
    price: 899,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    description: "Modern decorative table lamp.",
    colors: ["Black", "White", "Gold"],
    sizes: ["Standard"],
  },
  {
    id: 7,
    name: "Premium Camera",
    category: "Electronics",
    price: 12999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    description: "Capture beautiful moments with a premium camera.",
    colors: ["Black", "Silver"],
    sizes: ["Standard"],
  },
  {
    id: 8,
    name: "Elegant Women's Handbag",
    category: "Fashion",
    price: 2199,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    description: "Elegant handbag for everyday fashion.",
    colors: ["Red", "Black", "Brown", "Pink"],
    sizes: ["Small", "Medium", "Large"],
  },
];

const money = (value) =>
  "₹" + Number(value).toLocaleString("en-IN");

const getSaved = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

function App() {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [products, setProducts] = useState(() =>
    getSaved("luxecart-products", initialProducts)
  );

  const [cart, setCart] = useState(() =>
    getSaved("luxecart-cart", [])
  );

  const [wishlist, setWishlist] = useState(() =>
    getSaved("luxecart-wishlist", [])
  );

  const [orders, setOrders] = useState(() =>
    getSaved("luxecart-orders", [])
  );

  const [user, setUser] = useState(() =>
    getSaved("luxecart-user", null)
  );

  const [theme, setTheme] = useState(() =>
    getSaved("luxecart-theme", "light")
  );

  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [authMode, setAuthMode] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [toast, setToast] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Electronics",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("luxecart-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("luxecart-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("luxecart-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("luxecart-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("luxecart-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("luxecart-theme", JSON.stringify(theme));
  }, [theme]);

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 99;
  const total = subtotal + delivery;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  const addToCart = (product, color, size) => {
  setCart((previous) => {
    const found = previous.find(
      (item) =>
        item.id === product.id &&
        item.selectedColor === color &&
        item.selectedSize === size
    );

    if (found) {
      return previous.map((item) =>
        item.id === product.id &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [
      ...previous,
      {
        ...product,
        selectedColor: color,
        selectedSize: size,
        quantity: 1,
      },
    ];
  });

  setSelectedProduct(null);
  notify("Product added to cart successfully!");
};

  const changeQuantity = (id, amount) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );

    notify(
      wishlist.includes(id)
        ? "Removed from wishlist"
        : "Added to wishlist!"
    );
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email");

    const account = {
      name: form.get("name") || String(email).split("@")[0],
      email,
    };

    setUser(account);
    setAuthMode("");
    notify("Welcome to LUXECART!");
  };

  const logout = () => {
    setUser(null);
    setPage("home");
    notify("You have logged out.");
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (!cart.length) {
      notify("Your cart is empty.");
      return;
    }

    const form = new FormData(event.currentTarget);

    const order = {
      id: "LX" + Date.now().toString().slice(-8),
      date: new Date().toLocaleDateString("en-IN"),
      items: cart,
      total,
      customer: form.get("name"),
      address: form.get("address"),
      status: "Order placed",
    };

    setOrders((previous) => [order, ...previous]);
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setPage("orders");

    notify("Your demo order was placed successfully!");
  };

  const addProduct = (event) => {
    event.preventDefault();

    const product = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      rating: 4.5,
      image: newProduct.image.trim(),
      description: newProduct.description,
    };

    setProducts((previous) => [...previous, product]);

    setNewProduct({
      name: "",
      category: "Electronics",
      price: "",
      image: "",
      description: "",
    });

    notify("New product added!");
  };

  const deleteProduct = (id) => {
    setProducts((previous) =>
      previous.filter((product) => product.id !== id)
    );

    setCart((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setWishlist((previous) =>
      previous.filter((item) => item !== id)
    );

    notify("Product deleted.");
  };

  const imageUrl = (image) =>
    image?.startsWith("http")
      ? image
      : `https://images.unsplash.com/${image}?w=600&auto=format&fit=crop&q=80`;

  return (
    <div className={`app ${theme}`}>

      {/* HEADER */}

      <header className="header">
        <a className="logo" href="#home" onClick={() => setPage("home")}>
          LUXE<span>CART.</span>
        </a>

        <nav className="navigation">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("home")}>Shop</button>
          <button onClick={() => setPage("orders")}>My Orders</button>
          <button onClick={() => setPage("admin")}>Admin</button>
        </nav>

        <div className="header-actions">

          <button
            className="theme-button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title="Change theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            className="header-icon"
            onClick={() => setPage("wishlist")}
          >
            ♡ {wishlist.length}
          </button>

       <button className="cart-button" onClick={() => setShowCart(true)}>
            🛒 Cart ({cartCount})
          </button>

          {user ? (
            <button className="account-button" onClick={logout}>
              👤 {user.name} · Logout
            </button>
          ) : (
            <button
              className="account-button"
              onClick={() => setAuthMode("login")}
            >
              Login
            </button>
          )}

        </div>
      </header>

      {/* HOME PAGE */}

      {page === "home" && (
        <>

          <section className="hero" id="home">

            <div className="hero-content">
              <span className="eyebrow">✦ THE ART OF SMART SHOPPING</span>

              <h1>
                Shop Better.
                <br />
                <span>Live Better.</span>
              </h1>

              <p>
                Discover amazing products, explore exclusive collections
                and enjoy a smarter shopping experience.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  document.getElementById("products")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Explore Collection →
              </button>

              <div className="hero-stats">
                <div><strong>{products.length}+</strong><small>Products</small></div>
                <div><strong>4.9★</strong><small>Rating</small></div>
                <div><strong>24/7</strong><small>Shopping</small></div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-circle">🛍️</div>
              <div className="hero-floating one">✨ Premium Collection</div>
              <div className="hero-floating two">🔥 Amazing Deals</div>
            </div>

          </section>

          <section className="benefits">
            <div>🚚 <strong>Free Delivery</strong><small>Orders above ₹999</small></div>
            <div>🔒 <strong>Secure Experience</strong><small>Frontend demo</small></div>
            <div>↩️ <strong>Easy Returns</strong><small>Demo policy</small></div>
            <div>💬 <strong>Customer Support</strong><small>Always here to help</small></div>
          </section>

          <section className="shop-section" id="products">

            <div className="section-heading">
              <div>
                <span className="eyebrow">OUR COLLECTION</span>
                <h2>Explore Products</h2>
              </div>

              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="search-box">
              🔍
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
              />
            </div>

            <div className="categories">
              {["All", "Electronics", "Fashion", "Beauty", "Home"].map((item) => (
                <button
                  key={item}
                  className={category === item ? "category active" : "category"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="product-grid">

              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>

                  <div
                    className="product-image"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img src={imageUrl(product.image)} alt={product.name} />

                    <button
                      className="heart"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                    >
                      {wishlist.includes(product.id) ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="product-details">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p className="rating">⭐ {product.rating} / 5</p>
                    <strong className="product-price">{money(product.price)}</strong>

                    <button
  className="add-button"
  onClick={() => {
    setSelectedColor(product.colors?.[0] || "Standard");
    setSelectedSize(product.sizes?.[0] || "Standard");
    setSelectedProduct(product);
  }}
>
  + Select Options
</button>
                  </div>

                </article>
              ))}

            </div>

            {filteredProducts.length === 0 && (
              <div className="empty-state">
                <h2>No products found</h2>
                <button onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}>
                  Clear filters
                </button>
              </div>
            )}

          </section>

          <section className="promo">
            <span>✨ SPECIAL COLLECTION</span>
            <h2>Make Every Purchase Special.</h2>
            <p>Find your favourites at LUXECART.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Shop Now →
            </button>
          </section>

        </>
      )}

      {/* WISHLIST PAGE */}

      {page === "wishlist" && (
        <section className="inner-page">
          <h1>❤️ My Wishlist</h1>
          <p>Your favourite products in one place.</p>

          <div className="product-grid">
            {products.filter((p) => wishlist.includes(p.id)).map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={imageUrl(product.image)} alt={product.name} />
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <strong>{money(product.price)}</strong>
                  <p className="cart-variation">
  Colour: {item.selectedColor}
</p>

<p className="cart-variation">
  Size: {item.selectedSize}
</p>
                  <button
  className="add-button"
  onClick={() => {
    setSelectedColor(product.colors?.[0] || "Standard");
    setSelectedSize(product.sizes?.[0] || "Standard");
    setSelectedProduct(product);
  }}
>
  Select Colour & Size
</button>
                  <button className="remove-wish" onClick={() => toggleWishlist(product.id)}>
                    Remove from Wishlist
                  </button>
                </div>
              </article>
            ))}
          </div>

          {wishlist.length === 0 && <h3>Your wishlist is empty.</h3>}
          <button className="primary-button" onClick={() => setPage("home")}>
            Continue Shopping
          </button>
        </section>
      )}

      {/* ORDERS PAGE */}

      {page === "orders" && (
        <section className="inner-page">
          <span className="eyebrow">YOUR SHOPPING ACTIVITY</span>
          <h1>My Orders</h1>
          <p>View your previous demo purchases.</p>

          {orders.length === 0 ? (
            <div className="empty-state">
              <span>📦</span>
              <h2>No orders yet</h2>
              <button className="primary-button" onClick={() => setPage("home")}>
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-top">
                  <strong>Order #{order.id}</strong>
                  <span className="order-status">✓ {order.status}</span>
                </div>

                <p>Date: {order.date}</p>
                <p>Customer: {order.customer}</p>
                <p>Address: {order.address}</p>

                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.name} × {item.quantity}
                  </p>
                ))}

                <h3>Total: {money(order.total)}</h3>
              </div>
            ))
          )}
        </section>
      )}

      {/* ADMIN DASHBOARD */}

      {page === "admin" && (
        <section className="inner-page admin-page">
          <span className="eyebrow">MANAGEMENT PANEL</span>
          <h1>Admin Dashboard</h1>
          <p>Manage your demo shopping store.</p>

          <div className="admin-stats">
            <div><span>📦</span><h2>{products.length}</h2><p>Total Products</p></div>
            <div><span>🛒</span><h2>{orders.length}</h2><p>Total Orders</p></div>
            <div><span>💰</span><h2>{money(orders.reduce((sum, o) => sum + o.total, 0))}</h2><p>Demo Revenue</p></div>
            <div><span>❤️</span><h2>{wishlist.length}</h2><p>Wishlist Items</p></div>
          </div>

          <h2>Add New Product</h2>

          <form className="admin-form" onSubmit={addProduct}>
            <input
              placeholder="Product name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />

            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            >
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Beauty</option>
              <option>Home</option>
            </select>

            <input
              type="number"
              min="1"
              placeholder="Price in ₹"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />

            <input
              placeholder="Image URL or Unsplash photo ID"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              required
            />

            <input
              placeholder="Product description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
            />

            <button type="submit" className="primary-button">
              + Add Product
            </button>
          </form>

          <h2 className="admin-list-title">Manage Products</h2>

          {products.map((product) => (
            <div className="admin-product" key={product.id}>
              <span>{product.name} — {money(product.price)}</span>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          ))}

          <p className="admin-note">
            Demo dashboard only. A real admin system needs backend authentication
            and protected permissions.
          </p>
        </section>
      )}

      {/* FOOTER */}

      <footer className="footer">
        <div>
          <a className="logo" href="#home" onClick={() => setPage("home")}>
            LUXE<span>CART.</span>
          </a>
          <p>Your destination for smarter shopping.</p>
        </div>

        <p>© 2026 LUXECART. All rights reserved.</p>
      </footer>

      {/* PRODUCT DETAILS POPUP */}

     {selectedProduct && (
  <div
    className="modal-backdrop"
    onClick={() => setSelectedProduct(null)}
  >
    <div
      className="modal product-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setSelectedProduct(null)}
      >
        ✕
      </button>

      <img
        src={imageUrl(selectedProduct.image)}
        alt={selectedProduct.name}
      />

      <div className="product-options">

        <span className="eyebrow">
          {selectedProduct.category}
        </span>

        <h2>{selectedProduct.name}</h2>

        <p>⭐ {selectedProduct.rating} / 5</p>

        <h2>{money(selectedProduct.price)}</h2>

        <p>{selectedProduct.description}</p>

        {/* COLOUR OPTIONS */}

        <h4>Choose Colour:</h4>

        <div className="color-options">
          {(selectedProduct.colors || ["Standard"]).map((color) => (
            <button
              key={color}
              className={
                selectedColor === color
                  ? "color-option selected"
                  : "color-option"
              }
              onClick={() => setSelectedColor(color)}
            >
              <span
                className="color-circle"
                style={{
                  background:
                    color.toLowerCase() === "rose gold"
                      ? "#b76e79"
                      : color.toLowerCase(),
                }}
              />
              {color}
            </button>
          ))}
        </div>

        {/* SIZE OPTIONS */}

        <h4>Choose Size:</h4>

        <div className="size-options">
          {(selectedProduct.sizes || ["Standard"]).map((size) => (
            <button
              key={size}
              className={
                selectedSize === size
                  ? "size-option selected"
                  : "size-option"
              }
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* ADD TO CART */}

        <button
          className="primary-button"
          onClick={() =>
            addToCart(
              selectedProduct,
              selectedColor,
              selectedSize
            )
          }
        >
          Add to Cart 🛒
        </button>

      </div>
    </div>
  </div>
)}

      {/* LOGIN AND SIGNUP */}

      {authMode && (
        <div className="modal-backdrop" onClick={() => setAuthMode("")}>
          <div className="modal auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setAuthMode("")}>✕</button>

            <h2>{authMode === "login" ? "Welcome Back!" : "Create Account"}</h2>
            <p>Join the LUXECART shopping experience.</p>

            <form onSubmit={handleLogin}>
              {authMode === "signup" && (
                <input name="name" placeholder="Your full name" required />
              )}

              <input name="email" type="email" placeholder="Email address" required />
              <input name="password" type="password" placeholder="Password" minLength="6" required />

              <button className="primary-button" type="submit">
                {authMode === "login" ? "Login" : "Create Account"}
              </button>
            </form>

            <p className="switch-auth">
              {authMode === "login" ? "Don't have an account?" : "Already registered?"}
              <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}>
                {authMode === "login" ? " Sign Up" : " Login"}
              </button>
            </p>

            <small className="demo-warning">
              Frontend demonstration only. Do not enter real passwords.
            </small>
          </div>
        </div>
      )}

      {/* CART */}

      {showCart && (
        <div className="modal-backdrop cart-backdrop" onClick={() => setShowCart(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>

            <div className="drawer-heading">
              <h2>🛒 Shopping Cart</h2>
              <button onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-state">
                <span>🛍️</span>
                <h3>Your cart is empty</h3>
                <button className="primary-button" onClick={() => {
                  setShowCart(false);
                  setPage("home");
                }}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={imageUrl(item.image)} alt={item.name} />

                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <strong>{money(item.price)}</strong>

                        <div className="quantity">
                          <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>

                      <button className="remove-button" onClick={() => changeQuantity(item.id, -item.quantity)}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <p>Subtotal: <strong>{money(subtotal)}</strong></p>
                  <p>Delivery: <strong>{delivery === 0 ? "FREE" : money(delivery)}</strong></p>
                  <h3>Total: {money(total)}</h3>

                  <button className="checkout-button" onClick={() => {
                    if (!user) {
                      setShowCart(false);
                      setAuthMode("login");
                      notify("Please log in before checkout.");
                    } else {
                      setShowCheckout(true);
                    }
                  }}>
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT */}

      {showCheckout && (
        <div className="modal-backdrop" onClick={() => setShowCheckout(false)}>
          <div className="modal checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCheckout(false)}>✕</button>

            <h2>Complete Your Order</h2>
            <p>Enter your delivery details.</p>

            <form onSubmit={placeOrder}>
              <input name="name" placeholder="Full name" defaultValue={user?.name || ""} required />
              <input name="phone" type="tel" placeholder="Phone number" pattern="[0-9]{10}" title="Enter a 10-digit phone number" required />
              <textarea name="address" placeholder="Full delivery address" rows="3" required />

              <div className="checkout-total">
                Order total: <strong>{money(total)}</strong>
              </div>

              <button type="submit" className="primary-button">
                Place Demo Order
              </button>
            </form>

            <small className="demo-warning">
              No real payment is collected. This is a frontend demo.
            </small>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}

    </div>
  );
}

export default App;