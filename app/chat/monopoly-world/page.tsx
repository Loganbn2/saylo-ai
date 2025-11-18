"use client"

import { MobileChatMonopolyWorld } from "@/components/mobile-chat-monopoly-world"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function MonopolyWorldChatPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatMonopolyWorld onBackClick={() => router.push("/")} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/monop-ADG2dyFTUrtgP56FEFiLL8Dbm66wOY.png" />
      </div>
    </div>
  )
}
