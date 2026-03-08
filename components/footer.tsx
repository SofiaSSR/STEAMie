import Link from "next/link"
import { Shield, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

const footerLinks = {
  plataforma: [
    { label: "Inicio", href: "#inicio" },
    { label: "Aprende", href: "#aprende" },
    { label: "Minijuegos", href: "#minijuegos" },
    { label: "Chatbot", href: "#chatbot" },
  ],
  recursos: [
    { label: "Guías", href: "#recursos" },
    { label: "LIA", href: "#lia" },
    { label: "Sobre el proyecto", href: "#sobre" },
    { label: "Contacto", href: "#contacto" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
]

export function Footer() {
  return (
    <footer className="border-t border-[#E8D5D0] bg-white">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9046CF]">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#2D1B42]">STEAMie</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#6B5B7A]">
              Plataforma educativa de ciberseguridad diseñada para enseñar seguridad digital a mujeres de todas las edades de forma práctica y accesible.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5E6E3] text-[#6B5B7A] transition-colors hover:bg-[#9046CF] hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-semibold text-[#2D1B42]">Plataforma</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.plataforma.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B5B7A] transition-colors hover:text-[#9046CF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-[#2D1B42]">Recursos</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B5B7A] transition-colors hover:text-[#9046CF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E8D5D0] pt-8 md:flex-row">
          <p className="text-sm text-[#6B5B7A]">
            © {new Date().getFullYear()} STEAMie. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-[#6B5B7A] hover:text-[#9046CF]">
              Política de privacidad
            </Link>
            <Link href="#" className="text-sm text-[#6B5B7A] hover:text-[#9046CF]">
              Términos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
