import React, { useState } from 'react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to scroll to the section with the given ID
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close menu after navigating on mobile
    }
  };

  return (
    <nav className="bg-[#1A1A2E] h-16 sticky top-0 flex items-center justify-between px-4 md:px-10 text-white">
      {/* Logo */}
      <div className="flex items-center">
        <img 
          src="/DTElogo.png"  // Path to the image in the public folder
          alt="Logo"
          className="h-10"
        />
      </div>

      {/* Links for desktop */}
      <ul className="hidden md:flex gap-8 text-white font-medium">
        <li className="cursor-pointer hover:text-[#6C63FF]" onClick={() => scrollToSection('hero-section')}>Heart Health</li>
        <li className="cursor-pointer hover:text-[#6C63FF]" onClick={() => scrollToSection('compare-bpm')}>Compare BPM</li>
        <li className="cursor-pointer hover:text-[#6C63FF]" onClick={() => scrollToSection('symptoms-signs')}>Symptoms</li>
        <li className="cursor-pointer hover:text-[#6C63FF]" onClick={() => scrollToSection('management-tips')}>Management Tips</li>
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
        <ul className="absolute top-16 left-0 w-full bg-[#1A1A2E] text-white flex flex-col items-center space-y-4 py-4 md:hidden font-medium">
          <li className="cursor-pointer hover:text-[#6C63FF]" onClick={() => scrollToSection('hero-section')}>Heart Health</li>
          <li className="cursor-pointer hover:text-[#6C63FF]" onClick={() => scrollToSection('compare-bpm')}>Compare BPM</li>
          <li className="cursor-pointer hover:text-[#6C63FF]" onClick={() => scrollToSection('symptoms-signs')}>Symptoms</li>
          <li className="cursor-pointer hover:text-[#6C63FF]" onClick={() => scrollToSection('management-tips')}>Management Tips</li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
