"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ShoppingCart, Sparkles } from "lucide-react"

export interface Product {
  id: string
  name: string
  image: string
  freshnessScore: number
  price: number
  originalPrice: number
  grocerName: string
  distance: number
  category: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

function getFreshnessColor(score: number): string {
  if (score >= 80) return "bg-primary text-primary-foreground"
  if (score >= 60) return "bg-amber-500 text-white"
  return "bg-orange-500 text-white"
}

function getFreshnessLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Good"
  return "Fair"
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <Card className="group overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Freshness Badge */}
        <Badge
          className={`absolute left-2 top-2 gap-1 ${getFreshnessColor(product.freshnessScore)}`}
        >
          <Sparkles className="h-3 w-3" />
          {product.freshnessScore}% {getFreshnessLabel(product.freshnessScore)}
        </Badge>

        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute right-2 top-2 bg-destructive text-destructive-foreground">
            -{discount}%
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-foreground text-balance">{product.name}</h3>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Grocer Info */}
        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{product.grocerName}</span>
          <span className="shrink-0">• {product.distance} km away</span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
