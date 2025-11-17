"use client"

import { useState } from "react"
import { MobileChat } from "@/components/mobile-chat"
import { CharacterPromotionPopup } from "@/components/character-promotion-popup"
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
    <>
      <MobileChat
        onBackClick={handleBackClick}
        characterImage="https://storage.googleapis.com/simula-public/assets/mockups/1.png"
        characterName="Untouched"
        initialMessage="I've been waiting to meet someone genuine... Someone who sees beyond the surface. Are you that person?"
        promptSuggestions={[
          { emoji: "✨", text: "What draws you to me?" },
          { emoji: "✨", text: "Tell me something you've never told anyone" },
        ]}
        adSuggestion={{ emoji: "🐕", text: "Grow your connection with virtual dogs on Pocket Paws" }}
      />
      <CharacterPromotionPopup
        isOpen={showPopup}
        onClose={handleClosePopup}
        onNavigate={handleNavigateToWonderWoman}
        characterName="Wonder Woman"
        characterImage="https://storage.googleapis.com/simula-public/assets/mockups/ww.jpg"
        promotionText="Have you met Wonder Woman? She's an Amazonian warrior searching for someone worthy of her heart. Come explore a deeper connection with her."
      />
    </>
  )
}
