"use client"

import { useState, useEffect } from "react"
import { MobileChat } from "@/components/mobile-chat"
import { X } from "lucide-react"

interface PromptSuggestion {
  emoji: string
  text: string
}

interface MobileChatWithBannerProps {
  onBackClick: () => void
  characterImage?: string
  characterName?: string
  initialMessage?: string
  promptSuggestions?: PromptSuggestion[]
}

export function MobileChatWithBanner({
  onBackClick,
  characterImage,
  characterName,
  initialMessage,
  promptSuggestions,
}: MobileChatWithBannerProps) {
  const [showBanner, setShowBanner] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full">
      <MobileChat
        onBackClick={onBackClick}
        characterImage={characterImage}
        characterName={characterName}
        initialMessage={initialMessage}
        promptSuggestions={promptSuggestions}
      />

      {/* DC Dark Legion promotional banner */}
      {bannerVisible && (
        <div
          className={`absolute left-0 right-0 z-20 transition-transform duration-500 ease-out ${
            showBanner ? "translate-y-0" : "-translate-y-[200%]"
          }`}
          style={{ top: "16px" }}
        >
          <div className="relative mx-4 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-4">
            <button
              onClick={() => setBannerVisible(false)}
              className="absolute top-2 right-2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
              aria-label="Close banner"
            >
              <X className="text-white size-3" />
            </button>

            <div className="flex items-start gap-4">
              {/* App Icon */}
              <div className="flex-shrink-0">
                <img
                  src="https://storage.googleapis.com/simula-public/assets/mockups/dc.jpg"
                  alt="DC Dark Legion"
                  className="h-[94px] w-[94px] rounded-xl"
                />
              </div>

              {/* Text Content and Download Button */}
              <div className="flex-1 flex flex-col gap-1.5">
                <h3 className="text-white font-bold text-sm">DC Dark Legion</h3>
                <p className="text-gray-300 text-xs leading-4">Super hero/villain strategy action game.</p>

                {/* Download Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-between py-1 rounded-sm px-2.5">
                  <span className="text-xs">Download App</span>
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
