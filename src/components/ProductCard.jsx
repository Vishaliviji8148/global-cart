
import React, { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

function ProductCard({ product, onAdd }) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]
  );

  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0]
  );

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const cartProduct = {
      ...product,
      selectedColor: selectedColor.name,
      selectedSize,
      image: selectedColor.image,
      cartKey: `${product.id}-${selectedColor.name}-${selectedSize}`
    };

    onAdd(cartProduct);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="product-card">

      {/* PRODUCT IMAGE */}
      <div className="product-image">
        <img
          key={selectedColor.name}
          src={selectedColor.image}
          alt={`${product.name} in ${selectedColor.name}`}
        />

        <span className="product-badge">
          {product.badge}
        </span>
      </div>

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h3>{product.name}</h3>

        <h2>₹{product.price.toLocaleString("en-IN")}</h2>

        {/* COLOR SELECTION */}
        <div className="option-section">
          <p>
            Colour: <strong>{selectedColor.name}</strong>
          </p>

          <div className="color-options">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                className={`color-circle ${
                  selectedColor.name === color.name
                    ? "selected"
                    : ""
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color)}
                title={color.name}
                aria-label={`Select ${color.name}`}
                aria-pressed={selectedColor.name === color.name}
              />
            ))}
          </div>
        </div>

        {/* SIZE SELECTION */}
        <div className="option-section">
          <p>
            Size: <strong>{selectedSize}</strong>
          </p>

          <div className="size-options">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`size-btn ${
                  selectedSize === size ? "active" : ""
                }`}
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* ADD TO CART */}
        <button
          className={`add-cart-btn ${added ? "added" : ""}`}
          onClick={handleAdd}
        >
          {added ? (
            <>
              <Check size={18} />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Add to Cart
            </>
          )}
        </button>

        {/* SUCCESS MESSAGE */}
        {added && (
          <p className="cart-success">
            ✓ {product.name} successfully added to cart!
          </p>
        )}

      </div>
    </div>
  );
}

export default ProductCard;
