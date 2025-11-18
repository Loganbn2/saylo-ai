"use client"

import { MobileChatApeTower } from "@/components/mobile-chat-ape-tower"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function ApeTowerSiegeChatPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatApeTower onBackClick={() => router.push("/")} characterImage="/gorilla-soldier-city-tower.jpg" />
      </div>
    </div>
  )
}
