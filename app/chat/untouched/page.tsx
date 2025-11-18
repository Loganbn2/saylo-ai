"use client"

import { useState } from "react"
import { MobileChat } from "@/components/mobile-chat"
import { CharacterPromotionPopup } from "@/components/character-promotion-popup"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function UntouchedChatPage() {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)

  const handleBackClick = () => {
    setShowPopup(true)
  }

  const handleNavigateToWonderWoman = () => {
    router.push("/chat/ellies-embrace")
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <div className="flex-1 overflow-y-auto">
          <MobileChat
            onBackClick={handleBackClick}
           
            characterName="Untouched"
            initialMessage="I've been waiting to meet someone genuine... Someone who sees beyond the surface. Are you that person?"
            promptSuggestions={[
              { emoji: "✨", text: "What draws you to me?" },
              { emoji: "✨", text: "Tell me something you've never told anyone" },
            ]}
            adSuggestion={{ emoji: "🐕", text: "Grow your connection with virtual dogs on Pocket Paws" }}
          />
        </div>
        <CharacterPromotionPopup
          isOpen={showPopup}
          onClose={handleClosePopup}
          onNavigate={handleNavigateToWonderWoman}
          characterName="Wonder Woman"
         
          promotionText="Have you met Wonder Woman? She's an Amazonian warrior searching for someone worthy of her heart. Come explore a deeper connection with her."
        />
      </div>
    </div>
  )
}
