import React, { useState } from "react";

export default function SearchBar({ setPokemon }) {
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      // Step 1: Fetch Pokémon details
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Pokémon not found!");
      const pokemonData = await res.json();

      // Step 2: Fetch species details
      const speciesRes = await fetch(pokemonData.species.url);
      const speciesData = await speciesRes.json();

      // Step 3: Fetch evolution chain
      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionRes.json();

      // Extract evolution chain
      let chain = [];
      let evoStage = evolutionData.chain;
      while (evoStage) {
        const evoName = evoStage.species.name;
        const evoDetails = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${evoName}`
        );
        const evoData = await evoDetails.json();
        chain.push(evoData);
        evoStage = evoStage.evolves_to.length ? evoStage.evolves_to[0] : null;
      }

      // Set Pokémon and evolution details
      setPokemon(chain); // Store both searched Pokémon and evolutions
    } catch (error) {
      console.error("Error:", error);
      setPokemon([]); // Clear results on error
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-5">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokémon..."
        className="flex-1 px-4 py-2 text-black bg-white rounded-lg outline-none"
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
