"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, User } from "lucide-react"
import ReactMarkdown from 'react-markdown'

const suggestedQuestions = [
  "¿Cómo detectar un phishing?",
  "¿Qué hacer si me roban una cuenta?",
  "¿Cómo saber si una imagen es deepfake?",
  "¿Es seguro este enlace?",
]

export function ChatbotSection() {
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy LIA, tu asistente de seguridad digital impulsada por Tropicalia AI. Estoy aquí para ayudarte a entender y protegerte de los riesgos en internet. ¿En qué puedo ayudarte hoy?",
    }
  ])
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage = text.trim()
    setInputValue("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/tropicalia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch response')
      }

      // Tropicalia 'generate_answer' returns the synthesized response in the 'completion' field. 
      const assistantMessage = data.completion || "Lo siento, la IA de Tropicalia no arrojó ningún texto en su campo completion."

      setMessages(prev => [...prev, { role: "assistant", content: assistantMessage }])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, tuve un problema de conexión al intentar responder. Por favor, verifica tu API Key o intenta nuevamente más tarde." }])
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <section id="chatbot" className="bg-[#fcf8ff] py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center lg:flex-row lg:items-start lg:gap-8 lg:text-left">
          {/* LIA Avatar - Default pose for chatbot */}
          <div className="mb-6 flex-shrink-0 lg:mb-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9046CF]/20 to-[#CC59D2]/20 blur-xl" />
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIA_v3-removebg-preview-0yKTDFLBZawt9pvNXpt2j9s9buZEi8.png"
                alt="LIA - Tu asistente de seguridad digital"
                className="relative h-32 w-32 object-contain drop-shadow-lg lg:h-40 lg:w-40"
              />
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#2D1B42] md:text-4xl">
              Pregunta lo que quieras sobre seguridad digital
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#6B5B7A] lg:mx-0">
              LIA está disponible para responder todas tus dudas sobre ciberseguridad de forma clara y sencilla.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden border-[#E8D5D0] shadow-xl shadow-[#9046CF]/10">
            <CardHeader className="border-b border-[#E8D5D0] bg-gradient-to-r from-[#9046CF] to-[#CC59D2] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIA_v3-removebg-preview-0yKTDFLBZawt9pvNXpt2j9s9buZEi8.png"
                    alt="LIA"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white">LIA</h3>
                  <p className="text-sm text-white/80">Asistente de seguridad digital</p>
                </div>
                <Badge className="ml-auto border-0 bg-white/20 text-white">
                  En línea
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Chat Messages */}
              <div ref={scrollContainerRef} className="h-[400px] overflow-y-auto p-4 scroll-smooth">
                <div className="flex flex-col gap-4 pb-2">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ${
                          message.role === "user"
                            ? "bg-[#F487B6]"
                            : "bg-[#9046CF]"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <img 
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIA_v3-removebg-preview-0yKTDFLBZawt9pvNXpt2j9s9buZEi8.png"
                            alt="LIA"
                            className="h-7 w-7 object-contain"
                          />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                          message.role === "user"
                            ? "bg-[#9046CF] text-white"
                            : "bg-white border border-[#E8D5D0] text-[#2D1B42]"
                        }`}
                      >
                         {message.role === "assistant" ? (
                           <ReactMarkdown 
                             className="prose prose-sm prose-p:leading-relaxed prose-pre:p-0 prose-ul:list-disc prose-ul:pl-4 prose-ol:list-decimal prose-ol:pl-4 prose-strong:font-bold break-words"
                             components={{
                               p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />
                             }}
                           >
                              {message.content}
                           </ReactMarkdown>
                         ) : (
                           <p className="whitespace-pre-line text-sm leading-relaxed">
                             {message.content}
                           </p>
                         )}
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex gap-3 animate-in fade-in">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#9046CF]">
                        <img 
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIA_v3-removebg-preview-0yKTDFLBZawt9pvNXpt2j9s9buZEi8.png"
                          alt="LIA"
                          className="h-7 w-7 object-contain mix-blend-screen"
                        />
                      </div>
                      <div className="max-w-[80%] rounded-2xl bg-white border border-[#E8D5D0] px-4 py-3 shadow-sm flex items-center gap-1.5 h-11">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#9046CF] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                         <span className="w-1.5 h-1.5 rounded-full bg-[#9046CF] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                         <span className="w-1.5 h-1.5 rounded-full bg-[#9046CF] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Suggested Questions */}
              <div className="border-t border-[#E8D5D0] p-4">
                <p className="mb-2 text-sm font-medium text-[#6B5B7A]">Preguntas sugeridas:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question) => (
                    <Button
                      key={question}
                      variant="outline"
                      size="sm"
                      className="border-[#E8D5D0] text-[#6B5B7A] hover:border-[#9046CF] hover:bg-[#9046CF]/5 hover:text-[#9046CF]"
                      onClick={() => setInputValue(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-[#E8D5D0] p-4 bg-white/50">
                <form onSubmit={onSubmit} className="flex gap-2">
                  <Input
                    placeholder="Escribe tu pregunta aquí..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                    className="border-[#E8D5D0] focus-visible:ring-[#9046CF] bg-white transition-all shadow-sm"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !inputValue.trim()} 
                    className="bg-[#9046CF] text-white hover:bg-[#7035A8] shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Enviar mensaje</span>
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
