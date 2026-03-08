import { Button } from "@/components/ui/button"
import { BookOpen, MessageCircle, Sparkles } from "lucide-react"

export function CtaSection() {
  return (
    <section className="bg-gradient-to-br from-[#9046CF] via-[#9046CF] to-[#CC59D2] py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
          </div>
          
          <h2 className="mb-4 text-balance text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Empieza a protegerte hoy
          </h2>
          
          <p className="mb-8 text-lg text-white/90">
            Aprende ciberseguridad de forma práctica y accesible. Explora nuestros recursos o comienza una conversación con LIA.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-[#9046CF] hover:bg-white/90">
              <BookOpen className="mr-2 h-5 w-5" />
              Explorar recursos
            </Button>
            <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
              <MessageCircle className="mr-2 h-5 w-5" />
              Hablar con LIA
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
