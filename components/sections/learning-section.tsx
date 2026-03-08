import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, BarChart3, ArrowRight } from "lucide-react"

const courses = [
  {
    title: "Cómo detectar phishing",
    description: "Aprende a identificar correos y mensajes fraudulentos antes de hacer clic.",
    difficulty: "Básico",
    time: "15 min",
    tag: "Phishing",
    tagColor: "bg-[#F487B6] text-white",
  },
  {
    title: "Cómo proteger tus cuentas",
    description: "Configura contraseñas seguras y autenticación de dos factores.",
    difficulty: "Básico",
    time: "20 min",
    tag: "Seguridad",
    tagColor: "bg-[#9046CF] text-white",
  },
  {
    title: "Seguridad en redes sociales",
    description: "Configura tu privacidad y evita compartir información sensible.",
    difficulty: "Intermedio",
    time: "25 min",
    tag: "Privacidad",
    tagColor: "bg-[#CC59D2] text-white",
  },
  {
    title: "Detectar deepfakes",
    description: "Identifica videos e imágenes manipuladas con inteligencia artificial.",
    difficulty: "Avanzado",
    time: "30 min",
    tag: "Deepfakes",
    tagColor: "bg-[#7035A8] text-white",
  },
  {
    title: "Estafas comunes en internet",
    description: "Conoce los fraudes más frecuentes y cómo evitar ser víctima.",
    difficulty: "Básico",
    time: "20 min",
    tag: "Estafas",
    tagColor: "bg-[#F487B6] text-white",
  },
]

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Básico":
      return "text-green-600 bg-green-50"
    case "Intermedio":
      return "text-amber-600 bg-amber-50"
    case "Avanzado":
      return "text-red-600 bg-red-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export function LearningSection() {
  return (
    <section id="aprende" className="bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header with LIA thinking */}
        <div className="mb-12 flex flex-col items-center text-center lg:flex-row lg:justify-center lg:gap-8">
          {/* LIA Avatar - Thinking */}
          <div className="mb-6 flex-shrink-0 lg:mb-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9046CF]/20 to-[#CC59D2]/20 blur-xl" />
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIA_pensando-removebg-preview-RI4IuO18yoYS1sY03lLLwjJiphSZ84.png"
                alt="LIA pensando - Módulos de aprendizaje"
                className="relative h-32 w-32 object-contain drop-shadow-lg lg:h-40 lg:w-40"
              />
            </div>
          </div>
          <div className="lg:text-left">
            <h2 className="mb-4 text-3xl font-bold text-[#2D1B42] md:text-4xl">
              Módulos de aprendizaje
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#6B5B7A] lg:mx-0">
              Cursos prácticos diseñados para que aprendas a tu ritmo. Cada módulo incluye ejemplos reales y ejercicios.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card 
              key={course.title} 
              className="group flex flex-col border-[#E8D5D0] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#9046CF]/10"
            >
              <CardContent className="flex-1 p-6">
                <Badge className={`mb-4 border-0 ${course.tagColor}`}>
                  {course.tag}
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-[#2D1B42]">
                  {course.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[#6B5B7A]">
                  {course.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-[#6B5B7A]">
                    <Clock className="h-4 w-4" />
                    {course.time}
                  </div>
                  <Badge variant="outline" className={`border-0 ${getDifficultyColor(course.difficulty)}`}>
                    <BarChart3 className="mr-1 h-3 w-3" />
                    {course.difficulty}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#E8D5D0] p-4">
                <Button className="w-full bg-[#9046CF] text-white hover:bg-[#7035A8]">
                  Comenzar módulo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
