"use client"

import { useState, useCallback } from "react"
import { useConversation } from "@elevenlabs/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Headphones, MessageCircle, Sparkles, Heart, Shield, Lightbulb } from "lucide-react"

const liaFeatures = [
  { icon: Shield, text: "Te protege de amenazas digitales" },
  { icon: Lightbulb, text: "Explica conceptos de forma sencilla" },
  { icon: Heart, text: "Te acompaña en tu aprendizaje" },
]

export function LiaSection() {
  const [messages, setMessages] = useState<{ source: string; text: string }[]>([]);
  const conversation = useConversation({
    onMessage: (message: any) => {
      setMessages((prev) => [...prev, { source: message.source, text: message.message }]);
    }
  });
  const [isConversing, setIsConversing] = useState(false);
  const [agentIdError, setAgentIdError] = useState("");

  const handleStartConversation = useCallback(async () => {
    try {
      setAgentIdError("");
      const res = await fetch('/api/agent');
      const data = await res.json();
      
      if (!data.agentId) {
        setAgentIdError("No se pudo obtener el Agent ID. Verifica que la API Key esté configurada.");
        return;
      }

      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: data.agentId,
      });
      setIsConversing(true);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setAgentIdError("Error al iniciar el micrófono o conectar con ElevenLabs.");
    }
  }, [conversation]);

  const handleStopConversation = useCallback(async () => {
    await conversation.endSession();
    setIsConversing(false);
  }, [conversation]);

  return (
    <section id="lia" className="bg-gradient-to-br from-[#9046CF] via-[#9046CF] to-[#CC59D2] py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - LIA Avatar */}
          <div className="relative flex justify-center">
            <div className="relative h-[400px] w-[400px] lg:h-[520px] lg:w-[520px]">
              {/* Animated rings */}
              <div className="absolute inset-0 animate-pulse rounded-full border-4 border-white/20" />
              <div className="absolute inset-3 animate-pulse rounded-full border-4 border-white/30" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-6 rounded-full bg-white/10 backdrop-blur-sm" />

              {/* LIA Avatar - Animated */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIA_v3-removebg-preview-ANIMATION%20%281%29-krG5tSJeQxPkCJOnbdaDUulBba1F6X.gif"
                  alt="LIA - Tu asistente de seguridad digital"
                  className={`relative z-10 h-[85%] w-auto object-contain drop-shadow-2xl transition-all duration-300 ${conversation.isSpeaking ? 'scale-105 drop-shadow-[0_0_35px_rgba(255,255,255,0.8)]' : ''}`}
                />
              </div>

              {/* Subtitles Overlay */}
              {isConversing && (
                <div className="absolute -bottom-8 inset-x-0 mx-auto w-[90%] md:w-full max-w-md rounded-2xl bg-[#2D1B42]/90 p-4 text-center backdrop-blur-md z-30 shadow-2xl transition-all border border-[#9046CF]/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col items-center gap-2">
                    {/* Status Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-1">
                      {conversation.isSpeaking ? (
                        <>
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                          </span>
                          <span className="text-xs font-semibold text-[#10b981] uppercase tracking-wider">LIA hablando</span>
                        </>
                      ) : (
                        <>
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FDE12D] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FDE12D]"></span>
                          </span>
                          <span className="text-xs font-semibold text-[#FDE12D] uppercase tracking-wider">Escuchando...</span>
                        </>
                      )}
                    </div>

                    {/* Transcripts Display */}
                    <div className="h-[60px] w-full flex items-center justify-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      <p 
                        key={messages.length} 
                        className="text-sm font-medium text-white/95 italic transition-all duration-300 animate-in fade-in zoom-in-95"
                      >
                        {messages.length > 0 
                          ? `"${messages[messages.length - 1].text}"`
                          : (conversation.isSpeaking ? "..." : "Habla para comenzar la interacción...")
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating elements */}
              <div className="absolute -right-4 top-12 animate-bounce">
                <Badge className="border-0 bg-white px-3 py-1.5 text-[#9046CF] shadow-lg">
                  <Sparkles className="mr-1 h-3 w-3" />
                  IA Conversacional
                </Badge>
              </div>
              <div className="absolute -left-4 bottom-16 animate-bounce" style={{ animationDelay: "0.3s" }}>
                <Badge className="border-0 bg-[#FDE12D] px-3 py-1.5 text-[#2D1B42] shadow-lg">
                  <Headphones className="mr-1 h-3 w-3" />
                  Voz interactiva
                </Badge>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col gap-6 text-white">
            <Badge variant="outline" className="w-fit border-white/30 bg-white/10 text-white">
              Tu guía digital
            </Badge>

            <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              Conoce a LIA
            </h2>

            <p className="max-w-lg text-lg leading-relaxed text-white/90">
              LIA es tu asistente digital de confianza. Diseñada para ayudarte a entender los riesgos del mundo digital y guiarte paso a paso en tu aprendizaje sobre ciberseguridad.
            </p>

            <ul className="flex flex-col gap-3">
              {liaFeatures.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                    <feature.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white/90">{feature.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-2">
              {isConversing ? (
                <Button onClick={handleStopConversation} size="lg" className="bg-red-500 text-white hover:bg-red-600 transition-all">
                  <Headphones className="mr-2 h-5 w-5 animate-pulse" />
                  Finalizar llamada
                </Button>
              ) : (
                <Button disabled={conversation.status === "connecting"} onClick={handleStartConversation} size="lg" className="bg-white text-[#9046CF] hover:bg-white/90 transition-all">
                  <Headphones className="mr-2 h-5 w-5" />
                  {conversation.status === "connecting" ? "Conectando..." : "Hablar con LIA"}
                </Button>
              )}
            </div>

            {agentIdError && (
              <div className="mt-4 rounded-xl border border-red-400 bg-red-500/20 p-4 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2">
                <p className="text-sm text-red-100 font-medium">
                  {agentIdError}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
