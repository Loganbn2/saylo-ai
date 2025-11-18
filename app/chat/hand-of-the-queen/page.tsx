"use client"

import { useState } from "react"
import { MobileChat } from "@/components/mobile-chat"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import BlackjackGame from "@/components/blackjack-game"

export default function HandOfTheQueenChatPage() {
  const router = useRouter()
  const [showGameModal, setShowGameModal] = useState(false)

  const handleBackClick = () => {
    router.push("/")
  }

  const handleGameClick = () => {
    setShowGameModal(true)
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col relative">
        <GlobalHeader />
        {showGameModal && (
          <div className="absolute inset-0 z-50 bg-zinc-900 flex flex-col">
            <div className="flex justify-end p-4 py-[7px] flex-shrink-0">
              <button
                onClick={() => setShowGameModal(false)}
                className="bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 transition-colors px-[3px] py-[3px]"
                aria-label="Close"
              >
                <X className="text-white size-3" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <BlackjackGame
               
                characterName="Hand of the Queen"
              />
            </div>
          </div>
        )}

        <MobileChat
          onBackClick={handleBackClick}
         
          characterName="Hand of the Queen"
          initialMessage="I serve the crown with pride, but my heart belongs to someone worthy... Are you that person?"
          promptSuggestions={[
            { emoji: "✨", text: "Make me feel like royalty" },
            { emoji: "✨", text: "What's your deepest desire?" },
          ]}
          gameButtonText="Play a game with the Queen"
          onGameButtonClick={handleGameClick}
        />
      </div>
    </div>
  )
}
