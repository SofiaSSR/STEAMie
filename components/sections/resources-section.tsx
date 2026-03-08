import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Shield,
  CheckSquare,
  Lock,
  Flag,
  Download,
  ArrowRight,
  Sparkles
} from "lucide-react"

const resources = [
  {
    icon: Shield,
    title: "Qué hacer si te hackean",
    description: "Guía paso a paso para recuperar el control de tus cuentas comprometidas.",
  },
  {
    icon: FileText,
    title: "Guía contra phishing",
    description: "Documento completo con ejemplos reales de correos fraudulentos y cómo identificarlos.",
  },
  {
    icon: CheckSquare,
    title: "Checklist de seguridad digital",
    description: "Lista de verificación para asegurar que tu vida digital está protegida.",
  },
  {
    icon: Lock,
    title: "Privacidad en redes sociales",
    description: "Configuraciones recomendadas para proteger tu privacidad en cada red social.",
  },
  {
    icon: Flag,
    title: "Cómo denunciar contenido",
    description: "Aprende a reportar contenido inapropiado, acoso o estafas en diferentes plataformas.",
  },
  {
    icon: Sparkles,
    title: "Próximamente",
    description: "Iniciativas en tu ciudad",
  },
]

export function ResourcesSection() {
  return (
    <section id="recursos" className="bg-[#FFF3F0] py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header with LIA pointing */}
        <div className="mb-12 flex flex-col items-center text-center lg:flex-row lg:justify-center lg:gap-8">
          {/* LIA Avatar - Pointing */}
          <div className="mb-6 flex-shrink-0 lg:mb-0 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F487B6]/20 to-[#CC59D2]/20 blur-xl" />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIA_se%C3%B1alando-removebg-preview-9IsfRg9rqeB9V2yeziJtTRVaS4L0FD.png"
                alt="LIA señalando recursos útiles"
                className="relative h-32 w-32 object-contain drop-shadow-lg lg:h-40 lg:w-40"
              />
            </div>
          </div>
          <div className="lg:order-1 lg:text-right">
            <h2 className="mb-4 text-3xl font-bold text-[#2D1B42] md:text-4xl">
              Recursos y guías rápidas
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#6B5B7A] lg:mx-0">
              Material descargable y guías prácticas para que tengas siempre a mano información útil sobre seguridad digital.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card
              key={resource.title}
              className="group border-[#E8D5D0] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#9046CF]/10"
            >
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F487B6] to-[#CC59D2] text-white">
                  <resource.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-[#2D1B42]">
                    {resource.title}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-[#6B5B7A]">
                    {resource.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-[#9046CF] hover:bg-transparent hover:text-[#7035A8]"
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Descargar
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
