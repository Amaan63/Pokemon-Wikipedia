import React from "react";

function Footer() {
  return (
    // <footer className="w-screen bg-red-600 text-white text-center py-4 mt-6">
    <footer className="w-11/12 bg-red-600 text-white text-center py-4 mt-6 mx-6 rounded-2xl">
      <p className="text-sm font-semibold">
        © {new Date().getFullYear()} Amaan Sayyed. All rights reserved.
      </p>
    </footer>
  );
}
export default Footer;
