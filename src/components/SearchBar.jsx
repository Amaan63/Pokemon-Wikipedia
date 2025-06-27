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
    setSearchedPokemon(null);

    try {
      const searchName = search.toLowerCase();

      // Fetch searched Pokémon
      const searchedRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchName}`
      );
      if (!searchedRes.ok) throw new Error("Pokémon not found");
      const searchedData = await searchedRes.json();

      // Set this as the one to highlight (base name only, like "charizard")
      setSearchedPokemon(searchedData.name);

      // Fetch species and evolution chain
      const speciesRes = await fetch(searchedData.species.url);
      const speciesData = await speciesRes.json();

      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionRes.json();

      // Process evolution chain recursively
      const extractEvolutions = (node) => {
        let names = [node.species.name];
        node.evolves_to.forEach((evo) => {
          names = names.concat(extractEvolutions(evo));
        });
        return names;
      };

      const evolutionNames = extractEvolutions(evolutionData.chain);

      const allForms = [];

      for (const name of evolutionNames) {
        // Fetch base form
        const baseRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (!baseRes.ok) continue;
        const baseData = await baseRes.json();
        allForms.push(baseData);

        // Fetch species to get mega forms
        const speciesRes = await fetch(baseData.species.url);
        const speciesData = await speciesRes.json();

        const megaVarieties = speciesData.varieties.filter((v) =>
          v.pokemon.name.includes("mega")
        );

        // Fetch all mega forms
        for (const mega of megaVarieties) {
          const megaRes = await fetch(mega.pokemon.url);
          if (!megaRes.ok) continue;
          const megaData = await megaRes.json();
          allForms.push(megaData);
        }
      }

      setPokemon(allForms);
    } catch (error) {
      console.error("Search Error:", error.message);
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
