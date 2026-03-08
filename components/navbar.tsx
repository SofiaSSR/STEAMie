"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield } from "lucide-react"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#aprende", label: "Aprende" },
  { href: "#minijuegos", label: "Minijuegos" },
  { href: "#chatbot", label: "Chatbot" },
  { href: "#lia", label: "LIA" },
  { href: "#recursos", label: "Recursos" },
  { href: "#sobre", label: "Sobre el proyecto" },
  { href: "#juego", label: "Jugar" }
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8D5D0] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9046CF]">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#2D1B42]">STEAMie</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#6B5B7A] transition-colors hover:bg-[#F5E6E3] hover:text-[#9046CF]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button className="bg-[#9046CF] text-white hover:bg-[#7035A8]">
            Comenzar
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-white">
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9046CF]">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-[#2D1B42]">STEAMie</span>
              </Link>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2 text-base font-medium text-[#6B5B7A] transition-colors hover:bg-[#F5E6E3] hover:text-[#9046CF]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Button className="bg-[#9046CF] text-white hover:bg-[#7035A8]">
                Comenzar
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
