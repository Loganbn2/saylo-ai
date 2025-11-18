"use client"

import { MobileChatHappyDad } from "@/components/mobile-chat-happy-dad"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function HappyDadGuyChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatHappyDad onBackClick={handleBackClick} />
      </div>
    </div>
  )
}
