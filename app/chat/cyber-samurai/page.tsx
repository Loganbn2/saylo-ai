"use client"

import { MobileChatCyberSamurai } from "@/components/mobile-chat-cyber-samurai"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function CyberSamuraiChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatCyberSamurai onBackClick={handleBackClick} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1369890290-612x612-OIHtGHqyPByakh1Ml1sH3TlC8xLedF.jpg" />
      </div>
    </div>
  )
}
