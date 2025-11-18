"use client"

import { MobileChat } from "@/components/mobile-chat"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function GenZombieChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChat onBackClick={handleBackClick} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c.ai-7w4aRYUQ7VYEkwWcUlzzbu9s1Zex90.png" characterName="GenZombie" />
      </div>
    </div>
  )
}
