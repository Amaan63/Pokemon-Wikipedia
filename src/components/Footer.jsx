import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white text-center py-4 mt-6">
      <p className="text-sm">
        © {new Date().getFullYear()} Amaan Sayyed. All rights reserved.
      </p>
    </footer>
  );
}
export default Footer;
