
import React from "react";
import { Search } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-box">
      <Search size={20} />

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
