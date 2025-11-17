"use client"

import { MobileChatMathTutor } from "@/components/mobile-chat-math-tutor"
import { useRouter } from "next/navigation"

export default function MathTutorChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <MobileChatMathTutor
      onBackClick={handleBackClick}
      characterImage="/images/design-mode/c.ai%20%282%29.png"
      characterName="Tutor's Lounge"
    />
  )
}
