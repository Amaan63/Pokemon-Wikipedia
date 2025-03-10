import React from "react";

function Pagination({ nextUrl, prevUrl, setUrl }) {
  return (
    <div className="mt-6 flex gap-4">
      {prevUrl && (
        <button
          className="px-4 py-2 bg-red-500 rounded-lg text-white hover:transform hover:scale-105 transition-transform duration-200"
          onClick={() => setUrl(prevUrl)}
        >
          ⬅ Previous
        </button>
      )}
      {nextUrl && (
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:transform hover:scale-105 transition-transform duration-200"
          onClick={() => setUrl(nextUrl)}
        >
          Next ➡
        </button>
      )}
    </div>
  );
}
export default Pagination;
