"use client"

import { useState, useMemo } from "react"
import { MarketplaceHeader } from "./marketplace-header"
import { FilterBar } from "./filter-bar"
import { ProductCard, type Product } from "./product-card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, TrendingUp, Clock, Plus } from "lucide-react"

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
]

const CATEGORIES = ["All", "Fruits", "Vegetables", "Near Me"]

// Grocer Dashboard Component
function GrocerDashboard() {
  const activeListings = SAMPLE_PRODUCTS.slice(0, 4)
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Grocer Dashboard</h1>
        <p className="text-muted-foreground">Manage your surplus produce listings</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Listings</p>
              <p className="text-2xl font-bold text-foreground">24</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <TrendingUp className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Items Sold</p>
              <p className="text-2xl font-bold text-foreground">156</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
              <p className="text-2xl font-bold text-foreground">8</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-xl font-bold text-primary">$</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold text-foreground">$1,248</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Listing Button */}
      <div className="mb-6">
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add New Listing
        </Button>
      </div>

      {/* Active Listings */}
      <Card>
        <CardHeader>
          <CardTitle>Your Active Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activeListings.map((product) => (
              <div key={product.id} className="rounded-lg border p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mb-3 aspect-square w-full rounded-md object-cover"
                />
                <h3 className="font-medium text-foreground">{product.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-primary font-semibold">${product.price.toFixed(2)}</span>
                  <Badge variant="secondary">In Stock</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Marketplace Content Component
export function MarketplaceContent() {
  const [viewMode, setViewMode] = useState<"user" | "grocer">("user")
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
      {/* Dev Mode Toggle - Easy to replace with login state */}
      <div className="border-b bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <div className="flex items-center justify-center gap-3">
            <Badge variant="outline" className="text-xs">Dev Mode</Badge>
            <div className="flex items-center gap-2">
              <Label htmlFor="view-toggle" className="text-sm text-muted-foreground">
                User View
              </Label>
              <Switch
                id="view-toggle"
                checked={viewMode === "grocer"}
                onCheckedChange={(checked) => setViewMode(checked ? "grocer" : "user")}
              />
              <Label htmlFor="view-toggle" className="text-sm text-muted-foreground">
                Grocer View
              </Label>
            </div>
          </div>
        </div>
      </div>

      {viewMode === "user" ? (
        <>
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
        </>
      ) : (
        <GrocerDashboard />
      )}
    </div>
  )
}
