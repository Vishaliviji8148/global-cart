
import React from "react";
import { Heart } from "lucide-react";

function WishlistButton({ active, onClick }) {
  return (
    <button
      className={`wishlist-btn ${active ? "active" : ""}`}
      onClick={onClick}
      aria-label="Toggle wishlist"
    >
      <Heart fill={active ? "currentColor" : "none"} />
    </button>
  );
}

export default WishlistButton;
