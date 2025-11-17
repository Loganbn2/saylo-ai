"use client"

import { MobileChatHappyDad } from "@/components/mobile-chat-happy-dad"
import { useRouter } from "next/navigation"

export default function HappyDadGuyChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return <MobileChatHappyDad onBackClick={handleBackClick} />
}
