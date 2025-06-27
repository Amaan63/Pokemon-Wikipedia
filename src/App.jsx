import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [searchedPokemon, setSearchedPokemon] = useState(null); // Track searched Pokémon
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=14");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();

        const allPokemon = await Promise.all(
          data.results.map(async (poke) => {
            try {
              // Fetch base Pokémon and species in parallel
              const [baseRes, speciesRes] = await Promise.all([
                fetch(poke.url),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${poke.name}`),
              ]);
              const baseData = await baseRes.json();
              const speciesData = await speciesRes.json();

              // Filter mega forms
              const megaForms = speciesData.varieties.filter((v) =>
                v.pokemon.name.includes("mega")
              );

              // Fetch mega Pokémon in parallel
              const megaDataList = await Promise.all(
                megaForms.map(async (mega) => {
                  const res = await fetch(mega.pokemon.url);
                  if (!res.ok) return null;
                  return await res.json();
                })
              );

              // Combine base + mega forms
              return [baseData, ...megaDataList.filter(Boolean)];
            } catch (err) {
              console.error("Error with Pokémon:", poke.name, err);
              return []; // Skip this one if error
            }
          })
        );

        // Flatten nested arrays
        const flattened = allPokemon.flat();

        setPokemon(flattened);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setSearchedPokemon(null);
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
        <Loader />
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
