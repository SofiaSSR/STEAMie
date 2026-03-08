import { Heart, Users, Globe } from "lucide-react"

const stats = [
  { value: "1 de 3", label: "mujeres ha experimentado acoso en línea" },
  { value: "70%", label: "de las estafas online afectan más a mujeres" },
  { value: "+50%", label: "de deepfakes tienen como víctimas a mujeres" },
]

export function MissionSection() {
  return (
    <section id="sobre" className="bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F487B6] to-[#CC59D2]">
                <Heart className="h-7 w-7 text-white" />
              </div>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-[#2D1B42] md:text-4xl">
              Nuestra misión
            </h2>
          </div>

          <div className="mb-12 rounded-2xl bg-gradient-to-br from-[#FFF3F0] to-[#F5E6E3] p-8 lg:p-12">
            <p className="mb-6 text-center text-lg leading-relaxed text-[#2D1B42]">
              Muchas mujeres enfrentan diariamente acoso en línea, estafas y desinformación sin las herramientas adecuadas para protegerse. <strong>STEAMie nace con el propósito de cambiar esto.</strong>
            </p>
            <p className="text-center text-lg leading-relaxed text-[#6B5B7A]">
              Creemos que la ciberseguridad debe ser accesible, comprensible y práctica. Por eso, hemos diseñado una plataforma que enseña seguridad digital de forma clara, interactiva y sin tecnicismos, para que todas puedan navegar internet con confianza.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="rounded-xl border border-[#E8D5D0] bg-white p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#F487B6]/10"
              >
                <p className="mb-2 bg-gradient-to-r from-[#9046CF] to-[#CC59D2] bg-clip-text text-3xl font-bold text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-[#6B5B7A]">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-[#6B5B7A]">
              <Users className="h-5 w-5 text-[#9046CF]" />
              <span>Para mujeres de todas las edades</span>
            </div>
            <div className="flex items-center gap-2 text-[#6B5B7A]">
              <Globe className="h-5 w-5 text-[#9046CF]" />
              <span>100% en español</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
