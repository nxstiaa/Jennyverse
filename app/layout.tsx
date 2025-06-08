import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
        <header className="bg-white shadow-sm">
          <nav className="container py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary">Jennyverse</h1>
              <div className="space-x-4">
                <a href="/" className="hover:text-primary">Home</a>
                <a href="/recipes" className="hover:text-primary">Recipes</a>
                <a href="/categories" className="hover:text-primary">Categories</a>
              </div>
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