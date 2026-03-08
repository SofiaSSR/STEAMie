"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, MessageCircle, Sparkles } from "lucide-react"

const floatingTags = [
  { label: "Phishing", position: "top-8 right-12", delay: "0s" },
  { label: "Privacidad", position: "top-24 right-4", delay: "0.5s" },
  { label: "Deepfakes", position: "bottom-32 right-8", delay: "1s" },
  { label: "Estafas", position: "bottom-16 left-4", delay: "1.5s" },
  { label: "Robo de cuentas", position: "top-16 left-8", delay: "2s" },
]

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-[#FFF3F0] via-[#F5E6E3] to-[#FAADC9]/20 py-16 lg:py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-[#9046CF]/10 blur-3xl" />
        <div className="absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-[#CC59D2]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#F487B6]/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <Badge variant="outline" className="w-fit border-[#9046CF]/30 bg-white/80 text-[#9046CF]">
              <Sparkles className="mr-1 h-3 w-3" />
              Plataforma educativa de ciberseguridad
            </Badge>
            
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-[#2D1B42] md:text-5xl lg:text-6xl">
              Aprende seguridad digital de forma{" "}
              <span className="bg-gradient-to-r from-[#9046CF] to-[#CC59D2] bg-clip-text text-transparent">
                clara y práctica
              </span>
            </h1>
            
            <p className="max-w-lg text-lg leading-relaxed text-[#6B5B7A]">
              STEAMie te ayuda a identificar y protegerte de riesgos digitales como phishing, estafas, deepfakes y robo de cuentas. Aprende con guías claras, minijuegos interactivos y la ayuda de LIA, tu asistente digital.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="bg-[#9046CF] text-white hover:bg-[#7035A8]">
                <BookOpen className="mr-2 h-5 w-5" />
                Explorar recursos
              </Button>
              <Button size="lg" variant="outline" className="border-[#CC59D2] text-[#CC59D2] hover:bg-[#CC59D2]/10">
                <MessageCircle className="mr-2 h-5 w-5" />
                Hablar con LIA
              </Button>
            </div>
          </div>

          {/* Right Content - LIA Avatar Container */}
          <div className="relative flex items-center justify-center">
            {/* Main LIA container */}
            <div className="relative h-[400px] w-[400px] lg:h-[500px] lg:w-[500px]">
              {/* Gradient background circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9046CF]/20 via-[#CC59D2]/20 to-[#F487B6]/20" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#9046CF]/30 via-[#CC59D2]/30 to-[#F487B6]/30" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm" />
              
              {/* LIA Avatar - Saludando (Waving) */}
              <div className="absolute inset-8 flex items-center justify-center">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIA_saludando-removebg-preview-jOgKoCNvHSx6lwIMclF0MOwkHsgbQ3.png"
                  alt="LIA saludando - Tu asistente de seguridad digital"
                  className="h-auto w-[85%] object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating Tags */}
              {floatingTags.map((tag, index) => (
                <div
                  key={tag.label}
                  className={`absolute ${tag.position} animate-pulse`}
                  style={{ animationDelay: tag.delay }}
                >
                  <Badge 
                    className="border-0 bg-white px-3 py-1.5 text-sm font-medium text-[#2D1B42] shadow-lg"
                  >
                    {tag.label}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
