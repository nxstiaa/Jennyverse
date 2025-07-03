"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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

const heroVideos = [
  '/mummy_video.mp4',
];

const videoTitle = 'Meet Jenny: the best mum, cook, and best friend in the world!';

const videoMessages = [
  'Meet Jenny — passionate home cook, baker, and food lover.',
  'She specialises in chinese cuisine and bakes, but honestly, any dish is possible for her.',
  "Jenny loves to travel — especially to try local dishes and discover new flavours.",
  "Her favourite moments are spent hosting festive feasts for family and friends.",
  'From Lunar New Year banquets to birthday spreads, her table is always full of love.',
  "Sharing her love for cooking has been her passion for years — welcome to the page!"
];

const heroContent = [
  {
    type: 'video',
    title: videoTitle,
    button: { text: 'About Jenny', href: '/about' },
    video: 'https://www.dropbox.com/scl/fi/cifyihqv2bw40fl0xqegi/0703.mp4?rlkey=16yo7r0zudo4h82ymctuzpri2&st=fh99yysd&raw=1',
  },
  {
    type: 'image',
    title: 'Recipe of the Month',
    description: 'Try our featured recipe, handpicked for you this month!',
    button: { text: 'View Recipe', href: '/recipes/recipe-of-the-month' },
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352',
  },
  {
    type: 'image',
    title: 'Most Interesting Recipe',
    description: 'Discover the most unique and creative recipe in our collection.',
    button: { text: 'Explore', href: '/recipes/most-interesting' },
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  },
  {
    type: 'image',
    title: 'Blog: All About Okra',
    description: 'Read our latest blog post on the wonders of okra in Malaysian cuisine.',
    button: { text: 'Read Blog', href: '/blog/okra' },
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [videoMsgIdx, setVideoMsgIdx] = useState(0);
  const riceCursor = '/rice-cursor.png'; // Place a rice grain PNG in public/

  // Cycle video messages every 25s when on video slide
  useEffect(() => {
    if (heroContent[current].type !== 'video') return;
    setVideoMsgIdx(0);
    const interval = setInterval(() => {
      setVideoMsgIdx((idx) => (idx + 1) % videoMessages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [current]);

  function prev() {
    setCurrent((c) => (c === 0 ? heroContent.length - 1 : c - 1));
  }
  function next() {
    setCurrent((c) => (c === heroContent.length - 1 ? 0 : c + 1));
  }

  return (
    <div className="space-y-12" style={{marginTop: 0, paddingTop: 0}}>
      {/* Hero Section Carousel */}
      <section
        className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden p-0 m-0 max-w-none"
        style={{ cursor: `url(${riceCursor}), auto`, marginTop: 0, paddingTop: 0 }}
      >
        {heroContent[current].type === 'video' ? (
          <video
            src={heroContent[current].video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            Sorry, your browser does not support embedded videos.
          </video>
        ) : (
          <Image
            src={heroContent[current].image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352'}
            alt="Hero image"
            fill
            className="object-cover transition-all duration-500 z-0"
            priority
          />
        )}
        {/* Overlay: bottom left for video, center for others */}
        {heroContent[current].type === 'video' ? (
          <div className="absolute bottom-10 left-8 md:left-16 z-10 flex flex-col items-start max-w-lg bg-black bg-opacity-40 p-6 rounded-xl">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white tracking-tight leading-tight">
              {videoMessages[videoMsgIdx]}
            </h1>
            <Link href={heroContent[current].button.href} className="btn-hero font-semibold text-base px-6 py-2 mt-2">
              {heroContent[current].button.text}
            </Link>
          </div>
        ) : (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
            <div className="flex flex-col items-center justify-center w-full px-4 md:px-0" style={{maxWidth: 700}}>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight text-center leading-tight">
                {heroContent[current].title}
              </h1>
              {heroContent[current].description && (
                <p className="text-base md:text-lg mb-6 text-white text-center max-w-xl leading-relaxed">
                  {heroContent[current].description}
                </p>
              )}
              <Link href={heroContent[current].button.href} className="btn-hero font-semibold text-base px-6 py-2">
                {heroContent[current].button.text}
              </Link>
            </div>
          </div>
        )}
        {/* Minimalist Carousel arrows - ensure always visible and above overlays */}
        <button
          className="absolute left-2 md:left-4 top-auto md:top-1/2 bottom-20 md:bottom-auto md:-translate-y-1/2 p-3 md:p-1 text-white text-3xl md:text-2xl transition-all duration-200 focus:outline-none z-20"
          onClick={prev}
          aria-label="Previous image"
          style={{ cursor: `url(${riceCursor}), auto`, background: 'none', border: 'none' }}
        >
          <svg width="32" height="32" className="md:w-7 md:h-7" fill="none" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          className="absolute right-2 md:right-4 top-auto md:top-1/2 bottom-20 md:bottom-auto md:-translate-y-1/2 p-3 md:p-1 text-white text-3xl md:text-2xl transition-all duration-200 focus:outline-none z-20"
          onClick={next}
          aria-label="Next image"
          style={{ cursor: `url(${riceCursor}), auto`, background: 'none', border: 'none' }}
        >
          <svg width="32" height="32" className="md:w-7 md:h-7" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {/* Dots for carousel */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {heroContent.map((_, i) => (
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
            {/* Marry Me Chicken blog/favourite post */}
            <div className="card">
              <div className="relative h-48">
                <Image src="https://littlesunnykitchen.com/wp-content/uploads/2022/09/Marry-Me-Chicken-Recipe-21.jpg" alt="Marry Me Chicken" fill className="object-cover rounded-t-xl" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mt-2">Marry Me Chicken</h3>
                <p className="text-gray-600 mt-2">Marry Me Chicken is creamy, juicy, and full of flavor! It's said that this chicken dinner is so good that if you make it for your partner, a marriage proposal will be his next question. <a href='https://littlesunnykitchen.com/marry-me-chicken/#wprm-recipe-container-23226' target='_blank' rel='noopener noreferrer' className='underline'>Original recipe</a></p>
                <ul className="text-gray-700 text-sm mt-2 list-disc list-inside">
                  <li>Chicken breast, sliced into cutlets</li>
                  <li>Flour, salt, and pepper</li>
                  <li>Olive oil and butter</li>
                  <li>Garlic</li>
                  <li>Chicken or vegetable stock</li>
                  <li>Heavy cream and parmesan cheese</li>
                  <li>Chili flakes, dried oregano, and thyme</li>
                  <li>Sundried tomatoes</li>
                  <li>Fresh basil leaves</li>
                </ul>
                <a href="https://littlesunnykitchen.com/marry-me-chicken/#wprm-recipe-container-23226" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block mt-4">View Full Recipe</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 