import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { WhatIsSection } from "@/components/sections/what-is-section"
import { RisksSection } from "@/components/sections/risks-section"
import { LearningSection } from "@/components/sections/learning-section"
import { MinigamesSection } from "@/components/sections/minigames-section"
import { ChatbotSection } from "@/components/sections/chatbot-section"
import { LiaSection } from "@/components/sections/lia-section"
import { ResourcesSection } from "@/components/sections/resources-section"
import { MissionSection } from "@/components/sections/mission-section"
import { CtaSection } from "@/components/sections/cta-section"
import { Footer } from "@/components/footer"
import STEAMieGame from "@/components/sections/steamie-game"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF3F0]">
      <Navbar />
      <main>
        <HeroSection />
        <WhatIsSection />
        <RisksSection />
        <LearningSection />
        <MinigamesSection />
        <ChatbotSection />
        <LiaSection />
        <ResourcesSection />
        <MissionSection />
        <CtaSection />
        <STEAMieGame />
      </main>
      <Footer />
    </div>
  )
}
