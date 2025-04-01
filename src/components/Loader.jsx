import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xl text-emerald-800 mt-2">Loading Pokémon...</p>
    </div>
  );
}

export default Loader