"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { CartDrawer, type CartItem } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, ArrowLeft, Minus, Plus, Package, Truck, Shield } from "lucide-react"
import type { Product } from "@/components/product-card"
import { SAMPLE_PRODUCTS, PRODUCT_DESCRIPTIONS } from "@/lib/products"

interface ProductPageClientProps {
  productId: string
}

export function ProductPageClient({ productId }: ProductPageClientProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  const description = PRODUCT_DESCRIPTIONS[productId] || "Producto de alta calidad para tu experiencia de vapeo."

  const handleAddToCart = () => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { ...product, quantity }]
    })
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a productos
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen del producto */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.featured && <Badge className="absolute left-4 top-4 bg-primary">Destacado</Badge>}
              {!product.inStock && (
                <Badge variant="destructive" className="absolute right-4 top-4">
                  Agotado
                </Badge>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="capitalize mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.rating}.0)</span>
                <span className="text-sm text-muted-foreground">• 127 reseñas</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <span className="text-sm text-muted-foreground">IVA incluido</span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-pretty">{description}</p>
            </div>

            {/* Cantidad y agregar al carrito */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "Agregar al carrito" : "No disponible"}
              </Button>
            </div>

            {/* Características */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              <Card>
                <CardContent className="flex flex-col items-center text-center p-4">
                  <Package className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold text-sm mb-1">Envío Gratis</h3>
                  <p className="text-xs text-muted-foreground">En pedidos +$50</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center text-center p-4">
                  <Truck className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold text-sm mb-1">Entrega Rápida</h3>
                  <p className="text-xs text-muted-foreground">2-3 días hábiles</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center text-center p-4">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold text-sm mb-1">Garantía</h3>
                  <p className="text-xs text-muted-foreground">30 días</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10"
                  onClick={() => router.push(`/product/${relatedProduct.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-2 text-balance">{relatedProduct.name}</h3>
                      <span className="text-xl font-bold text-primary">${relatedProduct.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  )
}
