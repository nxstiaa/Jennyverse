import Image from 'next/image'
import Link from 'next/link'

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

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1495521821757-a1efb6729352"
          alt="Hero image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Discover Delicious Recipes</h1>
            <p className="text-xl mb-8">Find and share your favorite recipes</p>
            <Link href="/recipes" className="btn-primary">
              Browse Recipes
            </Link>
          </div>
        </div>
      </section>

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
    </div>
  )
} 