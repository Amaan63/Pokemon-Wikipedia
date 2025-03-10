import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10");

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
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
      setLoading(false);
    }

    fetchData();
  }, [url]);

  return (
    <div className="max-w-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">
        Pokémon Finder
      </h1>

      {/* 🔍 Pass `setPokemon` to SearchBar */}
      <SearchBar setPokemon={setPokemon} />

      {loading ? (
        <p className="text-xl text-gray-400 mt-5">Loading Pokémon...</p>
      ) : pokemon.length === 0 ? (
        <p className="text-xl text-red-500 mt-5">Pokémon not found! ❌</p>
      ) : (
        <PokemonList pokemon={pokemon} />
      )}

      {/* Pagination Component */}
      <Pagination nextUrl={nextUrl} prevUrl={prevUrl} setUrl={setUrl} />
    </div>
  );
}
