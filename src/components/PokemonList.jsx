import React from "react";

function PokemonList({ pokemon }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon.map((poke) => (
        <div
          key={poke.id}
          className="relative bg-white text-gray-700 p-4 rounded-lg shadow-lg text-center"
        >
          {/* 🏷️ Pokémon ID in the Top Right */}
          <p className="absolute top-2 right-2 bg-gray-300 text-gray-800 px-2 py-1 text-xs rounded-lg">
            #{poke.id}
          </p>

          {/* 🖼️ Pokémon Image */}
          <img
            src={poke.sprites?.front_default}
            alt={poke.name}
            className="w-24 h-24 mx-auto"
          />

          {/* 📛 Pokémon Name */}
          <h2 className="text-xl font-semibold capitalize">{poke.name}</h2>

          {/* 🔥 Pokémon Type Badges */}
          <div className="flex justify-center gap-2 mt-2">
            {poke.types?.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className="px-3 py-1 text-sm rounded-full bg-yellow-500 text-black"
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default PokemonList;
