
import React from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

function CartDrawer({
  open,
  onClose,
  cart,
  onIncrease,
  onDecrease,
  onRemove
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!open) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-drawer">

        <div className="cart-header">
          <h2>
            <ShoppingBag size={22} /> My Shopping Cart
          </h2>

          <button onClick={onClose} className="close-cart">
            <X />
          </button>
        </div>

        <p className="cart-count">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} items selected
        </p>

        <div className="cart-products">

          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={55} />
              <h3>Your cart is empty</h3>
              <p>Add products to see them here.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.cartKey}>

                <img src={item.image} alt={item.name} />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>

                  <p>Colour: {item.selectedColor.name}</p>
                  <p>Size: {item.selectedSize}</p>

                  <strong>₹{item.price}</strong>

                  <div className="quantity-control">

                    <button onClick={() => onDecrease(item.cartKey)}>
                      <Minus size={15} />
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => onIncrease(item.cartKey)}>
                      <Plus size={15} />
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() => onRemove(item.cartKey)}
                      title="Remove product"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>
                </div>

              </div>
            ))
          )}

        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total Amount</span>
            <h2>₹{total.toLocaleString("en-IN")}</h2>
          </div>

          <button
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={() => alert("Demo checkout successful!")}
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}

export default CartDrawer;
