"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <header className="bg-white border-b w-full">
      <nav className="flex items-center justify-between w-full px-4 md:px-8 py-4">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/tiger_logo.png" alt="Tiger Logo" width={44} height={44} className="object-contain" priority />
            <span className="text-xl md:text-2xl font-extrabold tracking-tight font-serif" style={{ color: 'var(--logo)' }}>Jennyverse</span>
          </Link>
        </div>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8 text-base font-medium">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <a href="/recipes" className="hover:text-primary transition-colors">Recipes</a>
          <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
          <a href="/about" className="hover:text-primary transition-colors">About</a>
          <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
          <div className="ml-6 flex items-center space-x-2">
            <button className="px-2 py-1 rounded hover:bg-gray-100 text-sm">English</button>
            <span className="text-gray-300">|</span>
            <button className="px-2 py-1 rounded hover:bg-gray-100 text-sm">中文</button>
            <span className="text-gray-300">|</span>
            <button className="px-2 py-1 rounded hover:bg-gray-100 text-sm">Malay</button>
          </div>
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
            <div className="flex items-center space-x-2 pt-2">
              <button className="px-2 py-1 rounded hover:bg-gray-100 text-sm">English</button>
              <span className="text-gray-300">|</span>
              <button className="px-2 py-1 rounded hover:bg-gray-100 text-sm">中文</button>
              <span className="text-gray-300">|</span>
              <button className="px-2 py-1 rounded hover:bg-gray-100 text-sm">Malay</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 