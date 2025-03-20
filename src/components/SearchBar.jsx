import React, { useState } from "react";

export default function SearchBar({
  setPokemon,
  setLoading,
  setSearchedPokemon,
}) {
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    setSearchedPokemon(null); // Reset highlight initially

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Pokémon not found!");
      const pokemonData = await res.json();

      // Fetch species and evolution chain
      const speciesRes = await fetch(pokemonData.species.url);
      const speciesData = await speciesRes.json();
      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionRes.json();

      // Extract evolution chain
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

        evoQueue.push(...evoStage.evolves_to);
      }

      setSearchedPokemon(pokemonData.name); // Store searched Pokémon's name
      setPokemon(chain.length ? chain : [pokemonData]);
    } catch (error) {
      console.error("Error:", error.message);
      setPokemon([]);
    }

    setLoading(false);
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
