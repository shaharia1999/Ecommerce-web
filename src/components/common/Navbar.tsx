'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import CartDrawer from './CartDrawer';
import { GiShoppingCart } from "react-icons/gi";
import { useCart } from "@/src/context/CartContext";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Image from 'next/image';
import { GetCookies } from '@/src/utils/Cookies/Set-Cookies';
import { Delete } from '@/src/utils/Cookies/Delete-Cookies';
import { HiOutlineMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/FlashSaleCardDiscount', label: 'Flash Discount' },
  { href: '/Viewall?sortBy=createdAt&sortOrder=desc&category=Fashion&limit=14', label: 'Fashion', category: 'Fashion' },
  { href: '/Viewall?sortBy=createdAt&sortOrder=desc&category=Trending&limit=14', label: 'Trending', category: 'Trending' },
  { href: '/Viewall?sortBy=createdAt&sortOrder=desc&category=Sports&limit=14', label: 'Sports', category: 'Sports' },
  { href: '/Viewall?sortBy=createdAt&sortOrder=desc&category=Electronics&limit=14', label: 'Electronics', category: 'Electronics' },
];

const Navbar = ({ className = '' }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const { cart } = useCart();
  const [token, setToken] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    async function fetchToken() {
      const t = await GetCookies();
      if (t) {
        setToken(t);
      }
    }
    fetchToken();
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      {/* Top Header */}
      <div className="w-full bg-white shadow-md">
        <div className="max-w-[1285px] mx-auto px-4 py-3">
          {/* Desktop View */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex-shrink-0">
              <Image src="/images/llogo-removebg-preview-main - Copy.png" alt="Logo" width={140} height={20} />
            </div>

            <div className="flex w-1/2">
              <input className="p-3 border border-gray-300 rounded-l-[30px] rounded-r-none w-full focus:outline-none" type="search" placeholder="I'm looking for..." />
              <button className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-r-[30px] rounded-l-none border border-l-0 border-gray-300 transition-colors">Search</button>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/Shopping_cart" className="text-gray-400 relative text-2xl">
                <GiShoppingCart />
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
              </Link>
              <Link href="/wishlist" className="text-gray-400 text-2xl">
                <FaRegHeart />
              </Link>
              <CartDrawer />
              <div className="relative group z-[9999]">
                <button className="flex items-center text-gray-400 transition focus:outline-none text-2xl">
                  <CgProfile />
                </button>
                <div className="absolute right-[-10px] mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 py-5">
                  {token ? (
                    <div>
                      <Link href="/user/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                      <p onClick={() => Delete()} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Log out</p>
                    </div>
                  ) : (
                    <Link href="/user/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Log in</Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="flex justify-between items-center">
              <Image src="/images/llogo-removebg-preview-main - Copy.png" alt="Logo" width={120} height={20} />
              <div className="flex items-center space-x-4">
                <Link href="/Shopping_cart" className="text-gray-400 relative text-2xl">
                  <GiShoppingCart />
                  {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
                </Link>
                <Link href="/wishlist" className="text-gray-400 text-2xl">
                  <FaRegHeart />
                </Link>
                <CartDrawer />
                <div className="relative group z-[9999]">
                  <button className="flex items-center text-gray-400 text-2xl focus:outline-none">
                    <CgProfile />
                  </button>
                  <div className="absolute right-[-10px] mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 py-5">
                    {token ? (
                      <div>
                        <Link href="/user/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                        <p onClick={() => Delete()} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Log out</p>
                      </div>
                    ) : (
                      <Link href="/user/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Log in</Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex w-full">
                <input className="p-3 border border-gray-300 rounded-l-[30px] rounded-r-none w-full focus:outline-none" type="search" placeholder="I'm looking for..." />
                <button className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-r-[30px] rounded-l-none border border-l-0 border-gray-300 transition-colors">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-400 to-orange-500 shadow-md w-full z-50 ${className}`}>
        <div className="max-w-[1285px] mx-auto flex items-center justify-between px-6 py-2">
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white text-3xl focus:outline-none">
              {mobileMenuOpen ? <HiX /> : <HiOutlineMenu />}
            </button>
          </div>

          <div className="hidden md:flex flex-grow justify-center space-x-8">
            {navLinks.filter(nav => !(pathname === '/Viewall' && nav.href.startsWith('/Viewall'))).map((nav) => {
              const isActive = nav.href === pathname || (pathname === '/Viewall' && nav.category === currentCategory);
              return (
                <Link key={nav.href} href={nav.href} className={`text-white font-medium transition ${isActive ? 'text-gray-200 underline underline-offset-4' : 'text-gray-200 hover:text-white'}`}>
                  {nav.label}
                </Link>
              );
            })}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-orange-500 px-4 py-3 space-y-2">
            {navLinks.map((nav) => (
              <Link key={nav.href} href={nav.href} onClick={() => setMobileMenuOpen(false)} className="block text-white text-base font-medium hover:underline">
                {nav.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;