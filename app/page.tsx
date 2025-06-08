"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const featuredRecipes = [
  {
    id: 1,
    title: 'Classic Chocolate Cake',
    description: 'A rich and moist chocolate cake that will satisfy your sweet tooth',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    category: 'Dessert',
  },
  {
    id: 2,
    title: 'Homemade Pizza',
    description: 'Crispy crust pizza with your favorite toppings',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    category: 'Italian',
  },
  {
    id: 3,
    title: 'Grilled Salmon',
    description: 'Perfectly grilled salmon with lemon and herbs',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    category: 'Seafood',
  },
]

const heroImages = [
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591',
];

const heroContent = [
  {
    title: 'Recipe of the Month',
    description: 'Try our featured recipe, handpicked for you this month!',
    button: { text: 'View Recipe', href: '/recipes/recipe-of-the-month' },
  },
  {
    title: 'Most Interesting Recipe',
    description: 'Discover the most unique and creative recipe in our collection.',
    button: { text: 'Explore', href: '/recipes/most-interesting' },
  },
  {
    title: 'Blog: All About Okra',
    description: 'Read our latest blog post on the wonders of okra in Malaysian cuisine.',
    button: { text: 'Read Blog', href: '/blog/okra' },
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const riceCursor = '/rice-cursor.png'; // Place a rice grain PNG in public/

  function prev() {
    setCurrent((c) => (c === 0 ? heroImages.length - 1 : c - 1));
  }
  function next() {
    setCurrent((c) => (c === heroImages.length - 1 ? 0 : c + 1));
  }

  return (
    <div className="space-y-12">
      {/* Hero Section Carousel */}
      <section
        className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden p-0 m-0 max-w-none"
        style={{ cursor: `url(${riceCursor}), auto` }}
      >
        <Image
          src={heroImages[current]}
          alt="Hero image"
          fill
          className="object-cover transition-all duration-500"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full px-4 md:px-0" style={{maxWidth: 700}}>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight text-center leading-tight">
              {heroContent[current].title}
            </h1>
            <p className="text-base md:text-lg mb-6 text-white text-center max-w-xl leading-relaxed">
              {heroContent[current].description}
            </p>
            <Link href={heroContent[current].button.href} className="btn-hero font-semibold text-base px-6 py-2">
              {heroContent[current].button.text}
            </Link>
          </div>
        </div>
        {/* Minimalist Carousel arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full p-1 text-black text-2xl border border-gray-200"
          onClick={prev}
          aria-label="Previous image"
          style={{ cursor: `url(${riceCursor}), auto` }}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full p-1 text-black text-2xl border border-gray-200"
          onClick={next}
          aria-label="Next image"
          style={{ cursor: `url(${riceCursor}), auto` }}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {/* Dots for carousel */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-3 h-3 rounded-full ${i === current ? 'bg-white' : 'bg-gray-400 bg-opacity-60'}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content Wrapper for spacing */}
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Featured Recipes */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="card">
                <div className="relative h-48">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="text-sm text-primary font-semibold">{recipe.category}</span>
                  <h3 className="text-xl font-bold mt-2">{recipe.title}</h3>
                  <p className="text-gray-600 mt-2">{recipe.description}</p>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="btn-primary inline-block mt-4"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog & Favourites Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Blog & Favourites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example blog post 1 */}
            <div className="card">
              <div className="relative h-48">
                <iframe className="w-full h-full rounded-t-xl" src="https://www.youtube.com/embed/1APwq1df6Mw" title="Cooking Video" allowFullScreen></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mt-2">How to Make Nasi Lemak</h3>
                <p className="text-gray-600 mt-2">A favourite Malaysian breakfast! Watch this video to learn how to make authentic nasi lemak at home.</p>
                <a href="https://www.youtube.com/watch?v=1APwq1df6Mw" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block mt-4">Watch on YouTube</a>
              </div>
            </div>
            {/* Example blog post 2 */}
            <div className="card">
              <div className="relative h-48">
                <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Rendang" fill className="object-cover rounded-t-xl" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mt-2">Beef Rendang Recipe</h3>
                <p className="text-gray-600 mt-2">A repost of a delicious beef rendang recipe from a favourite food blog. Perfect for festive occasions!</p>
                <a href="https://www.seriouseats.com/beef-rendang-recipe" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block mt-4">Read Recipe</a>
              </div>
            </div>
            {/* Example blog post 3 */}
            <div className="card">
              <div className="relative h-48">
                <iframe className="w-full h-full rounded-t-xl" src="https://www.youtube.com/embed/4aZr5hZXP_s" title="Cooking Video" allowFullScreen></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mt-2">Kuih Lapis Tutorial</h3>
                <p className="text-gray-600 mt-2">Step-by-step video for making colourful kuih lapis, a classic Malaysian dessert.</p>
                <a href="https://www.youtube.com/watch?v=4aZr5hZXP_s" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block mt-4">Watch on YouTube</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 