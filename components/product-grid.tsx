"use client"

import { ProductCard, type Product } from "./product-card"

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <section className="container mx-auto px-4 py-16" id="productos">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">Nuestros productos</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Explora nuestra selección curada de vapers, e-liquids y accesorios premium
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">
            No se encontraron productos con los filtros seleccionados
          </p>
          <p className="text-sm text-muted-foreground">Intenta ajustar tus filtros para ver más resultados</p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-sm text-muted-foreground">
            Mostrando {products.length} {products.length === 1 ? "producto" : "productos"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
