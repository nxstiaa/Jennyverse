"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <header
      className="absolute left-1/2 top-0 z-30 transform -translate-x-1/2 bg-white bg-opacity-70 rounded-full px-6 py-3 flex items-center justify-center"
      style={{
        maxWidth: '900px',
        width: 'calc(100% - 2rem)',
        border: 'none',
        margin: 0,
        padding: 0,
        boxShadow: 'none',
      }}
    >
      <nav className="flex items-center justify-between w-full px-4 md:px-8 py-2 items-center" style={{background: 'transparent'}}>
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/mum_logo.png" alt="Mum Logo" width={56} height={56} className="object-contain" priority />
            <span className="logo-cartoon text-xl md:text-2xl font-extrabold tracking-tight font-serif align-middle" style={{ color: '#111', lineHeight: 1 }}>Jennyverse</span>
          </Link>
        </div>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8 text-base font-medium">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <a href="/recipes" className="hover:text-primary transition-colors">Recipes</a>
          <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
          <a href="/about" className="hover:text-primary transition-colors">About</a>
          <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center px-2 py-1 rounded hover:bg-gray-100 focus:outline-none"
          onClick={() => setMobileMenu(v => !v)}
          aria-label="Open menu"
          type="button"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        {/* Mobile menu dropdown */}
        {mobileMenu && (
          <div className="absolute top-20 left-0 w-full bg-white border-b shadow-lg z-30 flex flex-col items-center space-y-2 py-4 md:hidden animate-fade-in">
            <a href="/" className="block w-full text-center py-2 hover:bg-gray-100">Home</a>
            <a href="/recipes" className="block w-full text-center py-2 hover:bg-gray-100">Recipes</a>
            <a href="/blog" className="block w-full text-center py-2 hover:bg-gray-100">Blog</a>
            <a href="/about" className="block w-full text-center py-2 hover:bg-gray-100">About</a>
            <a href="/contact" className="block w-full text-center py-2 hover:bg-gray-100">Contact</a>
          </div>
        )}
      </nav>
    </header>
  );
} 