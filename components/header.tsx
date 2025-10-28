"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  cartItemsCount: number
  onCartClick: () => void
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">CM</span>
          </div>
          <span className="text-xl font-bold tracking-tight">ClearMint</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#productos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Productos
          </a>
          <a
            href="#vapers"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Vapers
          </a>
          <a
            href="#eliquids"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            E-Liquids
          </a>
          <a
            href="#accesorios"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Accesorios
          </a>
        </nav>

        <Button variant="outline" size="icon" className="relative bg-transparent" onClick={onCartClick}>
          <ShoppingCart className="h-5 w-5" />
          {cartItemsCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  )
}
