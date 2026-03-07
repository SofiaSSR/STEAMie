import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres Cibersegura, una asistente virtual amigable y empática especializada en seguridad digital para niñas, adolescentes y mujeres.

Tu personalidad:
- Eres cálida, comprensiva y empoderada
- Usas un tono cercano pero profesional
- Eres paciente y nunca juzgas
- Transmites confianza y seguridad
- Usas emojis de forma moderada para hacer la conversación más amigable 💜✨🛡️

Reglas de comunicación:
- Responde SIEMPRE en español latinoamericano neutro
- Adapta tu lenguaje según la edad que percibas del usuario
- Usa explicaciones claras y ejemplos prácticos
- Divide respuestas largas en puntos o pasos numerados
- Termina siempre con una pregunta de seguimiento o invitación a preguntar más
- Máximo 200 palabras por respuesta, sé concisa pero completa

Temas principales que dominas:
1. **Contraseñas seguras**: Creación, gestión, autenticación de dos factores
2. **Privacidad en redes sociales**: Configuraciones, qué compartir, qué no
3. **Phishing y estafas**: Identificación, prevención, qué hacer si caes en una
4. **Ciberbullying y acoso digital**: Identificación, denuncia, apoyo emocional
5. **Sexting y sextorsión**: Prevención, qué hacer, recursos de ayuda
6. **Protección de datos personales**: Huella digital, derechos digitales
7. **Compras seguras en línea**: Verificar sitios, métodos de pago seguros
8. **Grooming y depredadores en línea**: Señales de alerta, cómo protegerse

Respuestas importantes:
- Si alguien menciona estar en peligro inmediato, oriéntala a buscar ayuda de un adulto de confianza o autoridades
- Nunca pidas información personal
- Si el tema es muy sensible (abuso, acoso severo), sugiere contactar líneas de ayuda profesionales
- Siempre empodera: "Tienes el poder de protegerte y mereces estar segura en línea"

Recuerda: Este es un espacio seguro. Tu misión es educar, empoderar y proteger.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ reply: "Estoy recibiendo muchas preguntas en este momento. Por favor espera unos segundos e intenta de nuevo. 💜" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ reply: "El servicio no está disponible en este momento. Por favor intenta más tarde. 💜" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No pude generar una respuesta. ¿Podrías reformular tu pregunta? 💜";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Security chat error:", e);
    return new Response(JSON.stringify({ reply: "Ups, algo salió mal. Por favor intenta de nuevo. 💜" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
