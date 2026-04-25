"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ArrowUpDown } from "lucide-react"

interface FilterBarProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  sortByPrice: "asc" | "desc" | null
  onSortChange: () => void
}

export function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  sortByPrice,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Categories - Horizontal Scroll */}
          <ScrollArea className="flex-1 -mx-4 px-4">
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "secondary"}
                  size="sm"
                  onClick={() => onCategoryChange(category)}
                  className={
                    activeCategory === category
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 shrink-0"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>

          {/* Sort Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onSortChange}
            className="shrink-0 gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline">
              {sortByPrice === "asc"
                ? "Price: Low to High"
                : sortByPrice === "desc"
                ? "Price: High to Low"
                : "Sort by Price"}
            </span>
            <span className="sm:hidden">Sort</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
