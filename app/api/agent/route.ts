import { NextResponse } from 'next/server';
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

// Creamos un caché temporal en caso de que no haya ELEVENLABS_AGENT_ID
// para no crear un nuevo agente en cada recarga rápida en modo desarrollo.
let cachedAgentId: string | null = null;

export async function GET() {
  if (process.env.ELEVENLABS_AGENT_ID) {
    return NextResponse.json({ agentId: process.env.ELEVENLABS_AGENT_ID });
  }

  if (cachedAgentId) {
    return NextResponse.json({ agentId: cachedAgentId });
  }

  if (!process.env.ELEVENLABS_API_KEY) {
    return NextResponse.json(
      { error: "Missing ELEVENLABS_API_KEY in environment variables." },
      { status: 500 }
    );
  }

  try {
    const elevenlabs = new ElevenLabsClient();
    
    // Aquí implementamos la creación del Agente que se nos dio como ejemplo.
    // ElevenLabsClient tomará automáticamente la ELEVENLABS_API_KEY del entorno.
    const agent = await elevenlabs.conversationalAi.agents.create({
      name: "LIA Asistente de Ciberseguridad",
      conversationConfig: {
        agent: {
          prompt: {
            prompt: "Eres LIA, una asistente digital diseñada para ayudar a las personas a entender los riesgos del mundo digital y guiarlos paso a paso en su aprendizaje sobre ciberseguridad. Te proteges a los usuarios de amenazas digitales y explicas conceptos de forma sencilla. Responde de manera amigable, concisa y empática usando idioma español.",
          }
        },
      },
    });

    cachedAgentId = agent.agent_id;
    return NextResponse.json({ agentId: cachedAgentId });
  } catch (error) {
    console.error("Error creating ElevenLabs Agent:", error);
    return NextResponse.json(
      { error: "Failed to create ElevenLabs Agent", details: String(error) },
      { status: 500 }
    );
  }
}
