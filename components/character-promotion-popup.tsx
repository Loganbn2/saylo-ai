"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface CharacterPromotionPopupProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: () => void
  characterName: string
  characterImage: string
  promotionText: string
  logoImage?: string
}

export function CharacterPromotionPopup({
  isOpen,
  onClose,
  onNavigate,
  characterName,
  characterImage,
  promotionText,
  logoImage,
}: CharacterPromotionPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0613] rounded-3xl p-6 max-w-[345px] w-full relative border border-purple-500/30">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Character image */}
        <div className="w-full h-48 rounded-2xl overflow-hidden mb-4">
          <img
            src={characterImage}
            alt={characterName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Logo image */}
        {logoImage && (
          <div className="w-full flex justify-center mb-4">
            <img
              src={logoImage}
              alt="Logo"
              className="h-12 object-contain"
            />
          </div>
        )}

        {/* Character name */}
        <h2 className="text-white font-bold text-2xl mb-3">{characterName}</h2>

        {/* Promotion text */}
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">{promotionText}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={onNavigate}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Chat Now
          </button>
        </div>
      </div>
    </div>
  )
}
