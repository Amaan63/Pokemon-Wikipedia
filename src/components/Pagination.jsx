import React from "react";

function Pagination({ nextUrl, prevUrl, setUrl }) {
  return (
    <div className="mt-6 flex gap-4">
      {prevUrl && (
        <button
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          onClick={() => setUrl(prevUrl)}
        >
          ⬅ Previous
        </button>
      )}
      {nextUrl && (
        <button
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400"
          onClick={() => setUrl(nextUrl)}
        >
          Next ➡
        </button>
      )}
    </div>
  );
}
export default Pagination;
