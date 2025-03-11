import React from "react";

function Pagination({ nextUrl, prevUrl, setUrl }) {
  return (
    <div className="w-full flex justify-center mt-6 gap-4 px-4">
      {prevUrl && (
        <button
          className="px-6 py-2 bg-red-500 text-white rounded-lg transition-transform duration-200 hover:scale-105"
          onClick={() => setUrl(prevUrl)}
        >
          ⬅ Previous
        </button>
      )}
      {nextUrl && (
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg transition-transform duration-200 hover:scale-105"
          onClick={() => setUrl(nextUrl)}
        >
          Next ➡
        </button>
      )}
    </div>
  );
}
export default Pagination;
