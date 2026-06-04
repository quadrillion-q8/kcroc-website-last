import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, X, Menu } from 'lucide-react'; // Added icons

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle function
  const toggleMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 shadow-lg h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/">
          <img src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" alt="Logo" width="140" height="91" style={{ width: '140px', height: '91px' }} />
        </Link>

        {/* Hamburger Button */}
        <button onClick={toggleMenu} className="lg:hidden text-white p-2">
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Panel */}
        {mobileOpen && (
          <div className="absolute top-16 left-0 w-full bg-emerald-900 p-6 flex flex-col gap-4 lg:hidden border-t border-emerald-800">
            <Link to="/" onClick={toggleMenu}>Home</Link>
            <Link to="/services" onClick={toggleMenu}>Services</Link>
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          </div>
        )}
      </div>
    </header>
  );
}
