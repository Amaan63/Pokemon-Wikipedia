import React from "react";
import typeColors from "../utils/typeColors";

const PokemonList = ({ pokemon, searchedPokemon }) => {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
      {pokemon.map((poke) => (
        <div
          key={poke.id}
          className={`relative bg-white text-gray-700 p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 ${
            poke.name === searchedPokemon
              ? "border-4 border-red-900 shadow-2xl"
              : ""
          }`}
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
          <h2
            className={`text-xl font-semibold capitalize ${
              poke.name === searchedPokemon ? "text-yellow-500" : ""
            }`}
          >
            {poke.name.includes("-mega")
              ? "Mega " + poke.name.replace("-mega", "")
              : poke.name}
          </h2>

          {/* 🔥 Pokémon Type Badges */}
          <div className="flex justify-center gap-2 mt-2">
            {poke.types?.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${
                  typeColors[typeInfo.type.name] || "bg-gray-500"
                }`}
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