import React, { useState } from 'react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-navy h-16 flex items-center justify-between px-4 md:px-10">
      {/* Logo */}
      <div className="flex items-center">
        <img 
          src="https://media.licdn.com/dms/image/v2/C4E0BAQFkfh9Sz3NzAw/company-logo_200_200/company-logo_200_200/0/1668641229271?e=2147483647&v=beta&t=DEPYc9DlEhV_7LW3VFJMVr99r2AIBkzvJ28sYhlCb24" 
          alt="Logo"
          className="h-10"
        />
      </div>

      {/* Links for desktop */}
      <ul className="hidden md:flex gap-4 text-white">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Services</li>
        <li className="cursor-pointer">Contact</li>
      </ul>

      {/* Toggle Button for Mobile */}
      <div className="md:hidden">
        <button 
          className="text-white"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-blue-400 text-white flex flex-col items-center space-y-4 py-4 md:hidden">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Services</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
