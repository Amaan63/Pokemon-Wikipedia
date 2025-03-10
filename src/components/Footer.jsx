import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 m-1.5 min-w-2xl">
      <p className="text-sm">
        © {new Date().getFullYear()} Amaan Sayyed. All rights reserved.
      </p>
    </footer>
  );
}
export default Footer;
