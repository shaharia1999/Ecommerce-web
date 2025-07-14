'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import CartDrawer from './CartDrawer';
// import { useCart } from '../../context/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/FlashSaleCardDiscount', label: 'Flash Discount' },
  { href: '/Electronics', label: 'Electronics' },
  { href: '/Apparel', label: 'Apparel' },
];

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const pathname = usePathname();
  // const { setOpen } = useCart(); // ✅ এটা নিতে ভুলবেন না

  return (
    <nav className={` fixed top-0 left-0 right-0 bg-purple-50 shadow-md w-full z-50 ${className}`}>
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <span className="font-bold text-xl text-purple-700">Logo</span>
          </Link>
        </div>
        {/* Middle: Navigation Links */}
        <div className="flex-grow flex justify-center space-x-8">
          {navLinks.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              className={`font-semibold transition ${pathname === nav.href
                  ? 'text-purple-700 underline underline-offset-4'
                  : 'text-gray-700 hover:text-purple-700'
                }`}
            >
              {nav.label}
            </Link>
          ))}
        </div>
        {/* Right: Cart Icon & Profile Dropdown */}
        <div className="flex items-center space-x-4">
          <Link
            href="/Shopping_cart"
            // onClick={e => {
            //   e.preventDefault();
            //   setOpen(true); // ✅ Cart Drawer খুলবে
            // }}
            className="text-gray-700 hover:text-purple-700 transition"
          >
            <span className="material-icons">shopping_cart</span>
          </Link>
          <CartDrawer />
          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-purple-700 transition focus:outline-none">
              <span className="material-icons">account_circle</span>
            </button>
            <div className="absolute right-[-1] mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
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