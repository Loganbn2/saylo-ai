"use client"

import { MobileChat } from "@/components/mobile-chat"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function RainyDayDaresChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChat
          onBackClick={handleBackClick}
          characterImage="https://storage.googleapis.com/simula-public/assets/mockups/2.png"
          characterName="Rainy Day Dares"
          initialMessage="There's something thrilling about a rainy day with the right person... Want to do something daring with me?"
          promptSuggestions={[
            { emoji: "✨", text: "What's your wildest fantasy?" },
            { emoji: "✨", text: "Tell me what you find irresistible" },
          ]}
        />
      </div>
    </div>
  )
}
