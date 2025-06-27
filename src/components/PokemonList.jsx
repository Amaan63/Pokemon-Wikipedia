import React, { useState } from "react";
import typeColors from "../utils/typeColors";
import PokemonModal from "./PokemonModal";

const PokemonList = ({ pokemon, searchedPokemon }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [speciesInfo, setSpeciesInfo] = useState(null);
  const handleCardClick = async (poke) => {
    setSelectedPokemon(poke);
    setModalOpen(true);

    try {
      // 🧬 Fetch species data
      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${poke.id}`
      );
      const speciesData = await speciesRes.json();

      // 📝 Description
      const flavorText = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      const cleanedDescription =
        flavorText?.flavor_text.replace(/\f/g, " ") || "";

      // 🌱 Fetch evolution chain
      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionRes.json();

      // 🔍 Find evolution details for the current Pokémon
      let evoQueue = [evolutionData.chain];
      let evolutionDetails = [];

      while (evoQueue.length > 0) {
        const evoStage = evoQueue.shift();
        if (evoStage.species.name === poke.name) {
          // Get all evolution methods from this stage
          evolutionDetails = evoStage.evolves_to.flatMap(
            (e) => e.evolution_details
          );
          break;
        }
        evoQueue.push(...evoStage.evolves_to);
      }

      // 🧠 Attach evolutionDetails to speciesData
      speciesData.evolution_details = evolutionDetails;

      // 🧾 Set state
      setDescription(cleanedDescription);
      setSpeciesInfo(speciesData);
    } catch (err) {
      setDescription("No description available.");
      setSpeciesInfo(null);
    }
  };

  return (
    <>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
        {pokemon.map((poke) => (
          <div
            key={poke.id}
            onClick={() => handleCardClick(poke)}
            className={`relative cursor-pointer bg-white text-gray-700 p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 ${
              poke.name === searchedPokemon
                ? "border-4 border-red-900 shadow-2xl"
                : ""
            }`}
          >
            <p className="absolute top-2 right-2 bg-gray-300 text-gray-800 px-2 py-1 text-xs rounded-lg">
              #{poke.id}
            </p>

            <img
              src={poke.sprites?.front_default}
              alt={poke.name}
              className="w-24 h-24 mx-auto"
            />

            <h2
              className={`text-xl font-semibold capitalize ${
                poke.name === searchedPokemon ? "text-yellow-500" : ""
              }`}
            >
              {poke.name.includes("-mega")
                ? "Mega " + poke.name.replace("-mega", "")
                : poke.name}
            </h2>

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

      <PokemonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pokemon={selectedPokemon}
        description={description}
        speciesInfo={speciesInfo}
      />
    </>
  );
};

export default PokemonList;
