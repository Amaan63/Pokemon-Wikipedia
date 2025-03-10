import React from "react";

function PokemonCard({ pokemon }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto"
      />
      <h2 className="text-xl font-semibold text-yellow-400 capitalize">
        {pokemon.name}
      </h2>
      <p className="text-gray-400">ID: {pokemon.id}</p>
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className="px-3 py-1 text-sm rounded-full bg-yellow-500 text-black"
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
export default PokemonCard;
