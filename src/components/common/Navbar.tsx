// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 bg-purple-50 shadow-md w-full ${className}`}>
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo/Icon */}
        <div className="flex items-center">
          {/* Example logo, replace src as needed */}
          <Link href="/">
            {/* <Image  alt="Logo" className="h-10 w-10" /> */}

          </Link>
        </div>
        {/* Middle: Navigation Links */}
        <div className="flex-grow flex justify-center space-x-8">
          <Link href="/" className="text-purple-700 font-semibold hover:text-purple-900 transition">Home</Link>
          <Link href="/dress" className="text-gray-700 hover:text-purple-700 transition">Dress</Link>
          <Link href="/shop" className="text-gray-700 hover:text-purple-700 transition">Shop</Link>
          <Link href="/toy" className="text-gray-700 hover:text-purple-700 transition">Toy</Link>
          <Link href="/fashion" className="text-gray-700 hover:text-purple-700 transition">Fashion</Link>
        </div>
        {/* Right: Icons & Profile Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Example icon, replace with your icon library */}
          <Link href="/order" className="text-gray-700 hover:text-purple-700 transition">
            {/* Order Icon */}
            <span className="material-icons">cart(icon)</span>
          </Link>
          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-purple-700 transition focus:outline-none">
              {/* Profile Icon */}
              <span className="material-icons">Profile(logo)</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
              <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
              <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
              <Link href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;