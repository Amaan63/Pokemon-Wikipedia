import React from "react";

function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 w-64"
      onChange={(e) => setSearch(e.target.value.toLowerCase())}
    />
  );
}
export default SearchBar;
