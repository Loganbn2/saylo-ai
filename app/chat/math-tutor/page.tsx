"use client"

import { MobileChatMathTutor } from "@/components/mobile-chat-math-tutor"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function MathTutorChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatMathTutor
          onBackClick={handleBackClick}
          characterImage="/images/design-mode/c.ai%20%282%29.png"
          characterName="Tutor's Lounge"
        />
      </div>
    </div>
  )
}
