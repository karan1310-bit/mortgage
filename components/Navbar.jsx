'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !toggleRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  const navLinks = [
    { href: '#', label: 'Purchase' },
    { href: '#', label: 'Refinance' },
    { href: '#', label: 'Loan Types' },
    { href: '#', label: 'Calculators' },
    { href: '#', label: 'Info' },
    { href: '#', label: 'Blog' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-[#e6e1da]/90 backdrop-blur-md z-40 transition-opacity duration-300 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      <header className="fixed font-Satoshi bg-[#e6e1da]/30 md:backdrop-blur-xs text-black top-0 left-0 w-full z-50 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        <div className="flex items-center gap-2 z-50 px-2 py-1 rounded">
          <span className="font-bold text-xl uppercase">Mortgage</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-lg font-normal">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} className="nav-hover-btn">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex gap-4 items-center">
          <button className="text-black px-4 py-2 font-normal rounded-full border border-black transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white">
            APPLY NOW
          </button>
        </div>

        {/* Hamburger Menu Icon */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl z-50 focus:outline-none p-2 rounded"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Mobile Drawer */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#e6e1da] z-[999] transform shadow-xl px-6 pt-6 transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="mb-6 focus:outline-none bg-[#e6e1da] p-2 rounded"
            aria-label="Close menu"
          >
            <HiX className="text-2xl" />
          </button>
          <ul className="flex flex-col gap-6 text-lg">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} onClick={() => setMenuOpen(false)} className="block">
                  {link.label}
                </Link>
                <div className="bg-gray-300 h-px w-full mt-2" />
              </li>
            ))}
            <li>
              <button className="w-full text-black px-4 py-2 font-normal rounded-full border border-black transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white">
                APPLY NOW
              </button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}