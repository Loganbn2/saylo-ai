"use client"

import { useState, useEffect } from "react"
import { MobileChat } from "@/components/mobile-chat"
import { useRouter } from "next/navigation"
import { X, ChevronRight } from "lucide-react"
import UnoGame from "@/components/uno-game"

export default function HandOfTheQueenChatPage() {
  const router = useRouter()
  const [showAd, setShowAd] = useState(false)
  const [showGameModal, setShowGameModal] = useState(false)

  const handleBackClick = () => {
    router.push("/")
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showAd && (
        <div className="fixed top-2 left-4 right-4 z-50 transition-all duration-500">
          <div className="backdrop-blur-md rounded-2xl shadow-lg p-3 bg-transparent max-w-sm mx-auto">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                <img src="https://storage.googleapis.com/simula-public/assets/mockups/uno.png" alt="Play Game" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-xs font-semibold text-white">Saylo AI</p>
                  <p className="text-xs text-gray-500">Suggested</p>
                </div>
                <p className="text-sm font-medium text-white">Play a game with the Queen?</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowAd(false)
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => {
                setShowAd(false)
                setShowGameModal(true)
              }}
              className="w-full hover:bg-purple-700 text-white py-2.5 px-4 rounded-lg transition-colors active:scale-[0.98] font-medium text-sm flex items-center justify-between bg-purple-800"
            >
              <span>Play Now</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {showGameModal && (
        <div className="fixed inset-0 z-50 bg-zinc-900 flex flex-col">
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
            <UnoGame
              characterImage="https://storage.googleapis.com/simula-public/assets/mockups/4.png"
              characterName="Hand of the Queen"
            />
          </div>
        </div>
      )}

      <MobileChat
        onBackClick={handleBackClick}
        characterImage="https://storage.googleapis.com/simula-public/assets/mockups/4.png"
        characterName="Hand of the Queen"
        initialMessage="I serve the crown with pride, but my heart belongs to someone worthy... Are you that person?"
        promptSuggestions={[
          { emoji: "✨", text: "Make me feel like royalty" },
          { emoji: "✨", text: "What's your deepest desire?" },
        ]}
      />
    </>
  )
}
