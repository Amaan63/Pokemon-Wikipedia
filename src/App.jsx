import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        const pokemonData = await Promise.all(
          data.results.map(async (poke) => {
            const res = await fetch(poke.url);
            return await res.json();
          })
        );
        setPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">
        Pokémon Finder
      </h1>
      <SearchBar setSearch={setSearch} />
      {loading ? (
        <p className="text-xl text-gray-400 mt-5">Loading Pokémon...</p>
      ) : (
        <PokemonList pokemon={pokemon} search={search} />
      )}
    </div>
  );
}
export default App;
