"use client"

import { useState } from "react"
import { MobileChat } from "@/components/mobile-chat"
import { HomePage } from "@/components/home-page"
import { GlobalHeader } from "@/components/global-header"

export default function Home() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        {showChat ? (
          <MobileChat onBackClick={() => setShowChat(false)} />
        ) : (
          <HomePage onCharacterSelect={() => setShowChat(true)} />
        )}
      </div>
    </div>
  )
}
