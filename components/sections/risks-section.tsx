import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Fish, 
  AlertTriangle, 
  KeyRound, 
  ScanFace, 
  Newspaper, 
  MessageSquareWarning,
  ArrowRight 
} from "lucide-react"

const risks = [
  {
    icon: Fish,
    title: "Phishing",
    description: "Correos y mensajes falsos que intentan robar tus datos personales haciéndose pasar por empresas legítimas.",
    color: "from-[#F487B6] to-[#CC59D2]",
  },
  {
    icon: AlertTriangle,
    title: "Sextorsión",
    description: "Chantaje que utiliza contenido íntimo real o falso para extorsionar a las víctimas.",
    color: "from-[#CC59D2] to-[#9046CF]",
  },
  {
    icon: KeyRound,
    title: "Robo de cuentas",
    description: "Acceso no autorizado a tus redes sociales, correo o cuentas bancarias mediante contraseñas robadas.",
    color: "from-[#9046CF] to-[#7035A8]",
  },
  {
    icon: ScanFace,
    title: "Deepfakes",
    description: "Videos o imágenes manipuladas con inteligencia artificial para crear contenido falso muy realista.",
    color: "from-[#F487B6] to-[#FAADC9]",
  },
  {
    icon: Newspaper,
    title: "Desinformación",
    description: "Noticias falsas y contenido engañoso diseñado para manipular la opinión pública.",
    color: "from-[#CC59D2] to-[#F487B6]",
  },
  {
    icon: MessageSquareWarning,
    title: "Ciberacoso",
    description: "Acoso, intimidación o amenazas realizadas a través de medios digitales.",
    color: "from-[#9046CF] to-[#CC59D2]",
  },
]

export function RisksSection() {
  return (
    <section className="bg-gradient-to-br from-[#FFF3F0] to-[#F5E6E3] py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header with LIA Alert */}
        <div className="mb-12 flex flex-col items-center text-center lg:flex-row lg:justify-center lg:gap-8">
          {/* LIA Avatar - Alert */}
          <div className="mb-6 flex-shrink-0 lg:mb-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F487B6]/20 to-[#FDE12D]/20 blur-xl" />
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIA_alerta-removebg-preview-VcJh8fsueCfBQmETY2Ekv6Si4P3GPn.png"
                alt="LIA alertando sobre riesgos digitales"
                className="relative h-32 w-32 object-contain drop-shadow-lg lg:h-40 lg:w-40"
              />
            </div>
          </div>
          <div className="lg:text-left">
            <h2 className="mb-4 text-3xl font-bold text-[#2D1B42] md:text-4xl">
              Riesgos digitales más comunes
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#6B5B7A] lg:mx-0">
              Conoce las amenazas más frecuentes en el mundo digital y aprende a identificarlas antes de que te afecten.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {risks.map((risk) => (
            <Card 
              key={risk.title} 
              className="group overflow-hidden border-0 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F487B6]/20"
            >
              <CardContent className="p-6">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${risk.color} text-white`}>
                  <risk.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[#2D1B42]">
                  {risk.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[#6B5B7A]">
                  {risk.description}
                </p>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-[#9046CF] hover:bg-transparent hover:text-[#7035A8]"
                >
                  Aprender más
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
