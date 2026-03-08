import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, ShieldAlert, Gamepad2, Bot } from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Educación en seguridad digital",
    description: "Aprende conceptos de ciberseguridad de forma clara y accesible, sin tecnicismos complicados.",
  },
  {
    icon: ShieldAlert,
    title: "Prevención de riesgos online",
    description: "Identifica amenazas como phishing, estafas y suplantación de identidad antes de que te afecten.",
  },
  {
    icon: Gamepad2,
    title: "Aprendizaje interactivo",
    description: "Practica tus conocimientos con minijuegos diseñados para reforzar lo aprendido de forma divertida.",
  },
  {
    icon: Bot,
    title: "Acompañamiento con LIA",
    description: "Recibe ayuda personalizada de LIA, tu asistente digital que responde tus dudas en cualquier momento.",
  },
]

export function WhatIsSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#2D1B42] md:text-4xl">
            ¿Qué es STEAMie?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#6B5B7A]">
            Una plataforma educativa diseñada para enseñar ciberseguridad a mujeres de todas las edades de forma práctica y accesible.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="group border-[#E8D5D0] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#9046CF]/10"
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9046CF] to-[#CC59D2] text-white transition-transform group-hover:scale-110">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#2D1B42]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6B5B7A]">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
