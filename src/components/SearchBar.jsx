import React, { useState } from "react";

export default function SearchBar({ setPokemon, setLoading }) {
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true); // Show loader when search starts

    try {
      // Step 1: Fetch Pokémon details
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Pokémon not found!");
      const pokemonData = await res.json();

      // Step 2: Fetch species details
      const speciesRes = await fetch(pokemonData.species.url);
      if (!speciesRes.ok) throw new Error("Species data not found!");
      const speciesData = await speciesRes.json();

      // Step 3: Fetch evolution chain
      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      if (!evolutionRes.ok) throw new Error("Evolution data not found!");
      const evolutionData = await evolutionRes.json();

      // Extract evolution chain using BFS
      let chain = [];
      let evoQueue = [evolutionData.chain];

      while (evoQueue.length > 0) {
        const evoStage = evoQueue.shift();
        const evoName = evoStage.species.name;

        const evoDetails = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${evoName}`
        );
        if (evoDetails.ok) {
          const evoData = await evoDetails.json();
          chain.push(evoData);
        }

        evoQueue.push(...evoStage.evolves_to); // Add next evolutions
      }

      // Set Pokémon and evolution details
      setPokemon(chain.length ? chain : [pokemonData]); // Ensure at least the searched Pokémon is displayed
    } catch (error) {
      console.error("Error:", error.message);
      setPokemon([]); // Clear results on error
    }

    setLoading(false); // Hide loader after fetching
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-5">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value.trimStart())}
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
