import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [searchedPokemon, setSearchedPokemon] = useState(null); // Track searched Pokémon
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=12");

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
        setSearchedPokemon(null); // Reset highlight on pagination
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
      setLoading(false);
    }

    fetchData();
  }, [url]);

  return (
    <div className="w-full bg-gray-100 text-gray-800 flex flex-col items-center py-10 overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-6">Pokémon Finder</h1>

      {/* Pass `setPokemon` and `setSearchedPokemon` to SearchBar */}
      <SearchBar
        setPokemon={setPokemon}
        setLoading={setLoading}
        setSearchedPokemon={setSearchedPokemon}
      />

      {loading ? (
        <div className="flex justify-center items-center mt-5">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-emerald-800 mt-2">Loading Pokémon...</p>
        </div>
      ) : pokemon.length === 0 ? (
        <p className="text-xl mt-5">Pokémon not found! ❌</p>
      ) : (
        <PokemonList pokemon={pokemon} searchedPokemon={searchedPokemon} />
      )}

      {/* Pagination Component */}
      <Pagination nextUrl={nextUrl} prevUrl={prevUrl} setUrl={setUrl} />
      <Footer />
    </div>
  );
}
