"use client"

import { MobileChatGunslinger } from "@/components/mobile-chat-gunslinger"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function GunslingerChatPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatGunslinger onBackClick={() => router.push("/")} />
      </div>
    </div>
  )
}
