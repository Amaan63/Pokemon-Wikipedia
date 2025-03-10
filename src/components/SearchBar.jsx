import React, { useState } from "react";

export default function SearchBar({ setPokemon }) {
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) return; // Prevent empty search

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );

      if (!res.ok) {
        setPokemon([]); // Clear previous results if not found
        return;
      }

      const data = await res.json();
      setPokemon([data]); // Set searched Pokémon as array
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-5">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokémon..."
        className="px-4 py-2 text-black bg-white rounded-lg outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400"
      >
        Search
      </button>
    </form>
  );
}
