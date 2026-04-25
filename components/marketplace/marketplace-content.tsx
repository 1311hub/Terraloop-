"use client"

import { useState, useMemo } from "react"
import { MarketplaceHeader } from "./marketplace-header"
import { FilterBar } from "./filter-bar"
import { ProductCard, type Product } from "./product-card"
import { Package } from "lucide-react"

// Sample product data
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Apples",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    freshnessScore: 92,
    price: 2.49,
    originalPrice: 4.99,
    grocerName: "Organic Farms",
    distance: 1.2,
    category: "Fruits",
  },
  {
    id: "2",
    name: "Ripe Bananas Bundle",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    freshnessScore: 78,
    price: 1.29,
    originalPrice: 2.99,
    grocerName: "Fresh Market",
    distance: 0.8,
    category: "Fruits",
  },
  {
    id: "3",
    name: "Crisp Green Lettuce",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    freshnessScore: 85,
    price: 1.99,
    originalPrice: 3.49,
    grocerName: "Garden Fresh",
    distance: 2.1,
    category: "Vegetables",
  },
  {
    id: "4",
    name: "Sweet Strawberries",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
    freshnessScore: 88,
    price: 3.99,
    originalPrice: 6.99,
    grocerName: "Berry Good",
    distance: 1.5,
    category: "Fruits",
  },
  {
    id: "5",
    name: "Fresh Tomatoes",
    image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=400&fit=crop",
    freshnessScore: 90,
    price: 2.29,
    originalPrice: 3.99,
    grocerName: "Local Harvest",
    distance: 0.5,
    category: "Vegetables",
  },
  {
    id: "6",
    name: "Juicy Oranges",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop",
    freshnessScore: 82,
    price: 3.49,
    originalPrice: 5.99,
    grocerName: "Citrus Grove",
    distance: 3.2,
    category: "Fruits",
  },
  {
    id: "7",
    name: "Organic Carrots",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    freshnessScore: 95,
    price: 1.79,
    originalPrice: 2.99,
    grocerName: "Farm Direct",
    distance: 1.8,
    category: "Vegetables",
  },
  {
    id: "8",
    name: "Mixed Bell Peppers",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
    freshnessScore: 87,
    price: 2.99,
    originalPrice: 4.49,
    grocerName: "Rainbow Produce",
    distance: 2.4,
    category: "Vegetables",
  },
  {
    id: "9",
    name: "Organic Brown Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    freshnessScore: 98,
    price: 3.49,
    originalPrice: 5.99,
    grocerName: "Grain Market",
    distance: 1.9,
    category: "Grains",
  },
  {
    id: "10",
    name: "Whole Wheat Bread",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    freshnessScore: 85,
    price: 2.99,
    originalPrice: 4.49,
    grocerName: "Bakery Fresh",
    distance: 0.7,
    category: "Grains",
  },
  {
    id: "11",
    name: "Quinoa Pack",
    image: "https://images.unsplash.com/photo-1612257416648-ee7a6c5b18b1?w=400&h=400&fit=crop",
    freshnessScore: 96,
    price: 4.99,
    originalPrice: 7.99,
    grocerName: "Health Foods",
    distance: 2.3,
    category: "Grains",
  },
]

const CATEGORIES = ["All", "Fruits", "Vegetables", "Grains", "Near Me"]

// Main Marketplace Content Component
export function MarketplaceContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortByPrice, setSortByPrice] = useState<"asc" | "desc" | null>(null)
  const [cart, setCart] = useState<Product[]>([])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...SAMPLE_PRODUCTS]

    // Filter by search query
    if (searchQuery) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (activeCategory === "Fruits") {
      products = products.filter((p) => p.category === "Fruits")
    } else if (activeCategory === "Vegetables") {
      products = products.filter((p) => p.category === "Vegetables")
    } else if (activeCategory === "Grains") {
      products = products.filter((p) => p.category === "Grains")
    } else if (activeCategory === "Near Me") {
      products = products.filter((p) => p.distance <= 1.5).sort((a, b) => a.distance - b.distance)
    }

    // Sort by price
    if (sortByPrice === "asc") {
      products.sort((a, b) => a.price - b.price)
    } else if (sortByPrice === "desc") {
      products.sort((a, b) => b.price - a.price)
    }

    return products
  }, [searchQuery, activeCategory, sortByPrice])

  const handleSortChange = () => {
    if (sortByPrice === null) setSortByPrice("asc")
    else if (sortByPrice === "asc") setSortByPrice("desc")
    else setSortByPrice(null)
  }

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MarketplaceHeader
        cartCount={cart.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Filter Bar */}
      <FilterBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortByPrice={sortByPrice}
        onSortChange={handleSortChange}
      />

      {/* Product Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
            {activeCategory !== "All" && (
              <span> in <span className="font-medium text-foreground">{activeCategory}</span></span>
            )}
          </p>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No products found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
