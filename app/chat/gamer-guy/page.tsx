"use client"

import { MobileChatGamerGuy } from "@/components/mobile-chat-gamer-guy"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function GamerGuyPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatGamerGuy onBackClick={handleBackClick} characterImage="/gamer-guy-gaming-setup.jpg" />
      </div>
    </div>
  )
}
