"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, X } from "lucide-react"

export type CategoryFilter = "all" | "vaper" | "eliquid" | "accesorio"
export type SortOption = "featured" | "price-low" | "price-high" | "rating"

interface ProductFiltersProps {
  selectedCategory: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
  selectedSort: SortOption
  onSortChange: (sort: SortOption) => void
  showInStock: boolean
  onInStockChange: (show: boolean) => void
  activeFiltersCount: number
  onClearFilters: () => void
}

const categories = [
  { value: "all" as const, label: "Todos", icon: "🛍️" },
  { value: "vaper" as const, label: "Vapers", icon: "💨" },
  { value: "eliquid" as const, label: "E-Liquids", icon: "🧪" },
  { value: "accesorio" as const, label: "Accesorios", icon: "🔧" },
]

const sortOptions = [
  { value: "featured" as const, label: "Destacados" },
  { value: "price-low" as const, label: "Precio: Menor a Mayor" },
  { value: "price-high" as const, label: "Precio: Mayor a Menor" },
  { value: "rating" as const, label: "Mejor Valorados" },
]

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  showInStock,
  onInStockChange,
  activeFiltersCount,
  onClearFilters,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Header con contador de filtros */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-lg">Filtros</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Categorías */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-3 text-sm text-muted-foreground">Categorías</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                className="justify-start"
                onClick={() => onCategoryChange(category.value)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ordenar y disponibilidad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 text-sm text-muted-foreground">Ordenar por</h4>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedSort === option.value ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm"
                  onClick={() => onSortChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 text-sm text-muted-foreground">Disponibilidad</h4>
            <Button
              variant={showInStock ? "secondary" : "ghost"}
              className="w-full justify-start text-sm"
              onClick={() => onInStockChange(!showInStock)}
            >
              Solo productos en stock
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
