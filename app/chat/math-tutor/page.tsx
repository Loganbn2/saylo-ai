"use client"

import { MobileChatMathTutor } from "@/components/mobile-chat-math-tutor"
import { useRouter } from "next/navigation"

export default function MathTutorChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return <MobileChatMathTutor onBackClick={handleBackClick} />
}
