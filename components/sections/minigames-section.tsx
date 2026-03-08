import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star } from "lucide-react"
import Link from "next/link"

const games = [
  {
    title: "Detecta el phishing",
    description: "¿Puedes identificar cuáles correos son fraudulentos? Pon a prueba tu ojo crítico.",
    difficulty: "Fácil",
    stars: 1,
  },
  {
    title: "Contraseña segura",
    description: "Crea contraseñas que resistan los ataques más comunes. ¿Qué tan fuerte es la tuya?",
    difficulty: "Medio",
    stars: 2,
  },
  {
    title: "¿Deepfake o real?",
    description: "Analiza videos e imágenes para determinar si fueron manipulados con IA.",
    difficulty: "Difícil",
    stars: 3,
  },
  {
    title: "Verdadero o falso digital",
    description: "Identifica noticias falsas y desinformación en redes sociales.",
    difficulty: "Medio",
    stars: 2,
  },
]

function getStars(count: number) {
  return Array.from({ length: 3 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${i < count ? "fill-[#FDE12D] text-[#FDE12D]" : "text-[#E8D5D0]"}`}
    />
  ))
}

export function MinigamesSection() {
  return (
    <section id="minijuegos" className="bg-gradient-to-br from-[#FDE12D]/10 via-[#FFF3F0] to-[#F487B6]/10 py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header with LIA celebrating */}
        <div className="mb-12 flex flex-col items-center text-center lg:flex-row lg:justify-center lg:gap-8">
          {/* LIA Avatar - Celebrating */}
          <div className="mb-6 flex-shrink-0 lg:mb-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FDE12D]/30 to-[#F487B6]/20 blur-xl" />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIA_celebrando-removebg-preview-rw4CiyoYEvnkSIt4IAQqa4rMA0q17d.png"
                alt="LIA celebrando - Aprende jugando"
                className="relative h-36 w-36 object-contain drop-shadow-lg lg:h-44 lg:w-44"
              />
            </div>
          </div>
          <div className="lg:text-left">
            <h2 className="mb-4 text-3xl font-bold text-[#2D1B42] md:text-4xl">
              Aprende jugando
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#6B5B7A] lg:mx-0">
              Practica lo aprendido con minijuegos interactivos diseñados para reforzar tus conocimientos de seguridad digital mientras te diviertes.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {games.map((game) => (
            <Card
              key={game.title}
              className="group overflow-hidden border-2 border-[#FDE12D]/30 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#FDE12D] hover:shadow-xl hover:shadow-[#FDE12D]/20"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge className="border-0 bg-[#FDE12D] text-[#2D1B42]">
                        {game.difficulty}
                      </Badge>
                      <div className="flex items-center gap-0.5">
                        {getStars(game.stars)}
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-[#2D1B42]">
                      {game.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-[#6B5B7A]">
                      {game.description}
                    </p>
                  </div>
                </div>
                <Link
                  href="#juego"
                >
                  <Button className="bg-[#FDE12D] text-[#2D1B42] hover:bg-[#E5C800]">
                    <Play className="mr-2 h-4 w-4" />
                    Jugar ahora
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
