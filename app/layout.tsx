import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { HornbillIcon, TapirIcon, TurtleIcon } from '../components/AnimalIcons'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Jennyverse",
  description: 'Discover delicious recipes from around the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white border-b">
          <nav className="container py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HornbillIcon className="inline-block align-middle" />
              <TapirIcon className="inline-block align-middle" />
              <TurtleIcon className="inline-block align-middle" />
              <h1 className="text-2xl font-extrabold tracking-tight text-primary font-serif ml-2">Jennyverse</h1>
            </div>
            <div className="flex space-x-6 text-base font-medium">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <a href="/recipes" className="hover:text-primary transition-colors">Recipes</a>
              <a href="/about" className="hover:text-primary transition-colors">About</a>
              <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </nav>
        </header>
        <main className="container py-8">
          {children}
        </main>
        <footer className="bg-dark text-white py-8">
          <div className="container">
            <p className="text-center">&copy; {new Date().getFullYear()} Jennyverse. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 