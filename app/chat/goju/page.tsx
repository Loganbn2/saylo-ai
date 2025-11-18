"use client"

import { MobileChatGoju } from "@/components/mobile-chat-goju"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function GojuChatPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatGoju onBackClick={() => router.push("/")} />
      </div>
    </div>
  )
}
