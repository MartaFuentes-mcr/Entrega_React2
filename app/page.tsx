"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters, type CategoryFilter, type SortOption } from "@/components/product-filters"
import { CartDrawer, type CartItem } from "@/components/cart-drawer"
import type { Product } from "@/components/product-card"

// Datos de ejemplo de productos
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Vaper Pro X1 - Dispositivo Premium",
    price: 89.99,
    image: "/modern-sleek-vape-device-black.jpg",
    category: "vaper",
    rating: 5,
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "E-Liquid Mango Tropical 60ml",
    price: 24.99,
    image: "/vape-juice-bottle-mango-flavor.jpg",
    category: "eliquid",
    rating: 4,
    inStock: true,
  },
  {
    id: "3",
    name: "Vaper Mini Compact - Portátil",
    price: 49.99,
    image: "/compact-portable-vape-device.jpg",
    category: "vaper",
    rating: 4,
    inStock: true,
  },
  {
    id: "4",
    name: "E-Liquid Fresa Crema 60ml",
    price: 19.99,
    image: "/vape-juice-bottle-strawberry-cream.jpg",
    category: "eliquid",
    rating: 5,
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Kit de Resistencias Premium x5",
    price: 19.99,
    image: "/vape-coils-replacement-kit.jpg",
    category: "accesorio",
    rating: 4,
    inStock: true,
  },
  {
    id: "6",
    name: "E-Liquid Menta Fresca 60ml",
    price: 22.99,
    image: "/vape-juice-bottle-mint-flavor.jpg",
    category: "eliquid",
    rating: 4,
    inStock: false,
  },
  {
    id: "7",
    name: "Vaper Elite RGB - Edición Limitada",
    price: 129.99,
    image: "/rgb-led-vape-device-premium.jpg",
    category: "vaper",
    rating: 5,
    inStock: true,
    featured: true,
  },
  {
    id: "8",
    name: "E-Liquid Café Vainilla 60ml",
    price: 26.99,
    image: "/vape-juice-bottle-coffee-vanilla.jpg",
    category: "eliquid",
    rating: 5,
    inStock: true,
  },
]

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all")
  const [selectedSort, setSelectedSort] = useState<SortOption>("featured")
  const [showInStock, setShowInStock] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = [...SAMPLE_PRODUCTS]

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by stock
    if (showInStock) {
      filtered = filtered.filter((p) => p.inStock)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "featured":
        default:
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
      }
    })

    return filtered
  }, [selectedCategory, selectedSort, showInStock])

  const activeFiltersCount = (selectedCategory !== "all" ? 1 : 0) + (showInStock ? 1 : 0)

  const handleClearFilters = () => {
    setSelectedCategory("all")
    setShowInStock(false)
  }

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId))
    } else {
      setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen">
      <Header cartItemsCount={cartItemsCount} onCartClick={handleCartClick} />
      <main>
        <HeroSection />

        <section className="container mx-auto px-4 py-8">
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            showInStock={showInStock}
            onInStockChange={setShowInStock}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={handleClearFilters}
          />
        </section>

        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">VapeShop</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Tu tienda de confianza para vapers y e-liquids premium.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Productos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#vapers" className="hover:text-foreground transition-colors">
                    Vapers
                  </a>
                </li>
                <li>
                  <a href="#eliquids" className="hover:text-foreground transition-colors">
                    E-Liquids
                  </a>
                </li>
                <li>
                  <a href="#accesorios" className="hover:text-foreground transition-colors">
                    Accesorios
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Envíos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Devoluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 VapeShop. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
