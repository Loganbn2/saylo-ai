"use client"

import { MobileChatCyberSamurai } from "@/components/mobile-chat-cyber-samurai"
import { useRouter } from "next/navigation"

export default function CyberSamuraiChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return <MobileChatCyberSamurai onBackClick={handleBackClick} />
}
