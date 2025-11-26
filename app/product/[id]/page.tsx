import { ProductPageClient } from "@/components/product-page-client"
import { SAMPLE_PRODUCTS } from "@/lib/products"

// Generar rutas estáticas para todos los productos
export function generateStaticParams() {
  return SAMPLE_PRODUCTS.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProductPageClient productId={id} />
}
