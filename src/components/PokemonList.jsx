import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemon, search }) {
  const filteredPokemon = pokemon.filter((poke) => poke.name.includes(search));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
      {filteredPokemon.length > 0 ? (
        filteredPokemon.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))
      ) : (
        <p className="text-gray-400 col-span-full text-center">
          No Pokémon found
        </p>
      )}
    </div>
  );
}
export default PokemonList;
