"use client"

import { useState } from "react"
import { MobileChat } from "@/components/mobile-chat"
import { HomePage } from "@/components/home-page"

export default function Home() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-900">
      {showChat ? (
        <MobileChat onBackClick={() => setShowChat(false)} />
      ) : (
        <HomePage onCharacterSelect={() => setShowChat(true)} />
      )}
    </div>
  )
}
