'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import CartDrawer from './CartDrawer';
import { GiShoppingCart } from "react-icons/gi";
import { useCart } from "@/src/context/CartContext"; // import add korun
import { FaRegHeart } from "react-icons/fa";


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/FlashSaleCardDiscount', label: 'Flash Discount' },
  { href: '/Viewall?sortBy=createdAt&sortOrder=desc&category=Fashion&limit=14', label: 'Fashion', category: 'Fashion' },
  { href: '/Viewall?sortBy=createdAt&sortOrder=desc&category=Trending&limit=14', label: 'Trending', category: 'Trending' },
  { href: '/Viewall?sortBy=createdAt&sortOrder=desc&category=Sports&limit=14', label: 'Sports', category: 'Sports' },
  { href: '/Viewall?sortBy=createdAt&sortOrder=desc&category=Electronics&limit=14', label: 'Electronics', category: 'Electronics' },
];

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const { cart } = useCart(); // cart state nite hobe

  // Total quantity calculation (optional: all items quantity sum)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);



  // "w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
  return (
    <nav className={` fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-400 to-orange-500 shadow-md w-full z-50 ${className}`}>
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <span className=" text-xl  text-white font-semibold">Logo</span>
          </Link>
        </div>
        {/* Middle: Navigation Links */}
        <div className="flex-grow flex justify-center space-x-8">
          {navLinks
            // Hide all /Viewall* links if current path is /Viewall
            .filter(nav => !(pathname === '/Viewall' && nav.href.startsWith('/Viewall')))
            .map((nav) => {
              const isActive =
                nav.href === pathname ||
                (pathname === '/Viewall' && nav.category === currentCategory);

              return (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className={`text-white font-medium transition ${isActive
                      ? 'text-gray-200 underline underline-offset-4'
                      : 'text-gray-200 hover:text-gray-200'
                    }`}
                >
                  {nav.label}
                </Link>
              );
            })}
        </div>
        {/* Right: Cart Icon & Profile Dropdown */}
        <div className="flex items-center space-x-4">
          <Link
            href="/Shopping_cart"
            className="text-gray-700 hover:text-purple-700 transition relative"
          >
            <div className='text-2xl '>
              <GiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          <Link href="/wishlist" className="text-gray-700 hover:text-purple-700 transition">
            <div className='text-2xl'>
              <FaRegHeart />
            </div>
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
