"use client"

import { MobileChatHRManager } from "@/components/mobile-chat-hr-manager"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function HRManagerChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatHRManager onBackClick={handleBackClick} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hr-manager-TACTViXYwMwTYqNNyH37s5TgrrdEVj.avif" />
      </div>
    </div>
  )
}
