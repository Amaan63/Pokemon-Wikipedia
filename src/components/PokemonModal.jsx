import React from "react";
import typeColors from "../utils/typeColors";

const PokemonModal = ({
  isOpen,
  onClose,
  pokemon,
  description,
  speciesInfo,
}) => {
  if (!isOpen || !pokemon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 px-2">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl relative text-gray-800 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-700 hover:text-black"
        >
          &times;
        </button>

        <div className="text-center">
          {/* 🖼️ Image */}
          <img
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="w-24 h-24 mx-auto"
          />

          {/* 📛 Name */}
          <h2 className="text-2xl font-bold capitalize mt-2">
            {pokemon.name.includes("-mega")
              ? "Mega " + pokemon.name.replace("-mega", "")
              : pokemon.name}
          </h2>

          {/* 📝 Description */}
          {description && (
            <p className="text-gray-600 text-sm mt-2 italic">"{description}"</p>
          )}

          {/* 🔥 Type Badges */}
          <div className="flex justify-center flex-wrap gap-2 mt-3">
            {pokemon.types?.map((typeInfo) => (
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

          {/* ✨ Shiny Image */}
          {pokemon.sprites?.front_shiny && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700">
                Shiny Version:
              </p>
              <img
                src={pokemon.sprites.front_shiny}
                alt="Shiny"
                className="w-20 h-20 mx-auto mt-1"
              />
            </div>
          )}

          {/* 📊 More Informative Knowledge */}
          <div className="text-left mt-5 text-sm leading-relaxed">
            <p>
              <span className="font-semibold">Height:</span> {pokemon.height}
            </p>
            <p>
              <span className="font-semibold">Weight:</span> {pokemon.weight}
            </p>
            <p>
              <span className="font-semibold">Base Experience:</span>{" "}
              {pokemon.base_experience}
            </p>
            <p>
              <span className="font-semibold">Species:</span>{" "}
              {speciesInfo?.genera?.find((gen) => gen.language.name === "en")
                ?.genus || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Habitat:</span>{" "}
              {speciesInfo?.habitat?.name || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Shape:</span>{" "}
              {speciesInfo?.shape?.name || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Color:</span>{" "}
              {speciesInfo?.color?.name || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Generation:</span>{" "}
              {speciesInfo?.generation?.name || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Capture Rate:</span>{" "}
              {speciesInfo?.capture_rate}
            </p>
            <p>
              <span className="font-semibold">Base Happiness:</span>{" "}
              {speciesInfo?.base_happiness}
            </p>

            <p className="font-semibold mt-2">Abilities:</p>
            <ul className="list-disc list-inside">
              {pokemon.abilities?.map((ab) => (
                <li key={ab.ability.name}>{ab.ability.name}</li>
              ))}
            </ul>
            {speciesInfo?.evolution_details?.length > 0 && (
              <>
                <p className="font-semibold mt-4">Evolution Method:</p>
                <ul className="list-disc list-inside">
                  {speciesInfo.evolution_details.map((method, index) => (
                    <li key={index}>
                      {method.min_level && `Level ${method.min_level}`}
                      {method.trigger?.name === "use-item" &&
                        ` Using ${method.item?.name}`}
                      {method.trigger?.name === "trade" && " Trade"}
                      {method.trigger?.name === "level-up" &&
                        !method.min_level &&
                        " Level Up (Special Condition)"}
                      {method.time_of_day && ` at ${method.time_of_day}`}
                      {method.location && ` near ${method.location.name}`}
                      {!method.min_level &&
                        !method.item &&
                        !method.trigger?.name &&
                        " Unknown Method"}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
