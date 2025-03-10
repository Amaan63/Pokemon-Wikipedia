import React from "react";

export default function PokemonList({ pokemon }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {pokemon.map((poke) => (
        <div key={poke.id} className="bg-gray-800 p-4 rounded-lg text-center">
          <img
            src={poke.sprites.front_default}
            alt={poke.name}
            className="mx-auto"
          />
          <p className="text-xl font-bold">{poke.name.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
}
