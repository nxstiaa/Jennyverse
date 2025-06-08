import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Jennyverse",
  description: 'Discover delicious recipes from around the world',
}

function TigerLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
      <circle cx="24" cy="24" r="20" fill="#FBBF24" stroke="#222" strokeWidth="2"/>
      <ellipse cx="24" cy="32" rx="10" ry="6" fill="#fff" stroke="#222" strokeWidth="1.5"/>
      <ellipse cx="17" cy="20" rx="2.5" ry="3.5" fill="#fff" stroke="#222" strokeWidth="1.5"/>
      <ellipse cx="31" cy="20" rx="2.5" ry="3.5" fill="#fff" stroke="#222" strokeWidth="1.5"/>
      <ellipse cx="17" cy="21" rx="1" ry="1.5" fill="#222"/>
      <ellipse cx="31" cy="21" rx="1" ry="1.5" fill="#222"/>
      <ellipse cx="24" cy="28" rx="2" ry="1" fill="#222"/>
      <path d="M19 15 Q24 10 29 15" stroke="#222" strokeWidth="1.5" fill="none"/>
      <path d="M14 24 Q12 20 16 18" stroke="#222" strokeWidth="1.2" fill="none"/>
      <path d="M34 18 Q36 20 34 24" stroke="#222" strokeWidth="1.2" fill="none"/>
      <path d="M20 34 Q24 36 28 34" stroke="#222" strokeWidth="1.2" fill="none"/>
      <path d="M22 12 Q24 14 26 12" stroke="#222" strokeWidth="1.2" fill="none"/>
      <path d="M18 28 Q16 30 18 32" stroke="#222" strokeWidth="1.2" fill="none"/>
      <path d="M30 28 Q32 30 30 32" stroke="#222" strokeWidth="1.2" fill="none"/>
    </svg>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="w-full py-8">
          {children}
        </main>
        <footer className="bg-white text-black py-8 border-t">
          <div className="container">
            <p className="text-center">&copy; {new Date().getFullYear()} Jennyverse. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 