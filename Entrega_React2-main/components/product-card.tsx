"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: "vaper" | "eliquid" | "accesorio"
  rating: number
  inStock: boolean
  featured?: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter()

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking the add to cart button
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    router.push(`/product/${product.id}`)
  }

  return (
    <Card
      className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {product.featured && <Badge className="absolute left-3 top-3 bg-primary">Destacado</Badge>}
          {!product.inStock && (
            <Badge variant="destructive" className="absolute right-3 top-3">
              Agotado
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
          </div>

          <h3 className="font-semibold text-lg line-clamp-2 text-balance">{product.name}</h3>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            <Badge variant="secondary" className="capitalize">
              {product.category}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full group"
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product)
          }}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          {product.inStock ? "Agregar al carrito" : "No disponible"}
        </Button>
      </CardFooter>
    </Card>
  )
}
