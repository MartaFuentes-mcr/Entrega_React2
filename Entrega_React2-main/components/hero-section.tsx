import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Nuevos productos disponibles
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              La mejor experiencia de <span className="text-primary">vapeo</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-xl">
              Descubre nuestra colección premium de vapers y e-liquids. Calidad garantizada, envío rápido y los mejores
              precios del mercado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base group">
                Ver productos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent">
                Explorar e-liquids
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl rounded-full"></div>
            <img src="/modern-vape-device-with-colorful-vapor-cloud.jpg" alt="Vaper moderno" className="relative rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
