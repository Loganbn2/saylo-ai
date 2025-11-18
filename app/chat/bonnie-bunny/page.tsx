"use client"

import { useState, useEffect } from "react"
import { MobileChat } from "@/components/mobile-chat"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"
import { X, ChevronRight } from "lucide-react"

export default function BonnieBunnyChatPage() {
  const router = useRouter()
  const [showAd, setShowAd] = useState(false)
  const [showGamePopup, setShowGamePopup] = useState(false)
  const [showSurvivalModal, setShowSurvivalModal] = useState(false)

  const handleBackClick = () => {
    router.push("/")
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleGameClose = () => {
    setShowGamePopup(false)
    setShowSurvivalModal(true)
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        {showAd && (
        <div className="absolute left-0 right-0 z-50 transition-transform duration-500 ease-out translate-y-0" style={{ top: "16px" }}>
          <div className="relative mx-4 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                <img src="https://storage.googleapis.com/simula-public/assets/mockups/state.png" alt="Test Skills" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-xs font-semibold text-white">Saylo AI</p>
                  <p className="text-xs text-gray-500">Sponsored</p>
                </div>
                <p className="text-sm font-medium text-white">Test your skills in a FPS game?</p>
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
                setShowGamePopup(true)
              }}
              className="w-full hover:bg-amber-700 text-white py-2.5 px-4 rounded-lg transition-colors active:scale-[0.98] font-medium text-sm flex items-center justify-between bg-amber-800"
            >
              <span>Test Your Skills</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {showGamePopup && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <button
            onClick={handleGameClose}
            className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors text-2xl font-bold w-10 h-10 flex items-center justify-center bg-zinc-800/80 rounded-full"
            aria-label="Close game"
          >
            ×
          </button>
          <iframe
            src="https://renjianfeng.github.io/BabylonFpsDemo/example/index.html"
            className="w-full h-full border-0"
            title="Zombie Shooter Game"
          />
        </div>
      )}

      {showSurvivalModal && (
        <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
          <button
            onClick={() => setShowSurvivalModal(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors text-3xl font-bold w-12 h-12 flex items-center justify-center"
            aria-label="Close modal"
          >
            ×
          </button>
          <div className="flex flex-col items-center max-w-md w-full">
            <div className="w-40 h-40 rounded-lg overflow-hidden shadow-2xl mb-8">
              <img
                src="https://storage.googleapis.com/simula-public/assets/mockups/state.png"
                alt="State of Survival"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-bold text-white mb-4 text-center text-2xl">State of Survival</h2>
            <p className="text-gray-300 text-center mb-8 leading-relaxed text-xs">
              The zombie apocalypse is here. Build your settlement, rescue survivors, and fight the undead in this
              thrilling FPS game.
            </p>
            <button className="w-full hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg text-base px-5 py-3 bg-orange-800">
              Download Now
            </button>
          </div>
        </div>
      )}

        <MobileChat
          onBackClick={handleBackClick}
          characterImage="https://storage.googleapis.com/simula-public/assets/mockups/5.png"
          characterName="Bonnie Bunny"
          initialMessage="Life's too short to be boring! Wanna have some fun with me? 💕"
          promptSuggestions={[
            { emoji: "✨", text: "Tell me what turns you on" },
            { emoji: "✨", text: "Let's do something spontaneous" },
          ]}
        />
      </div>
    </div>
  )
}
