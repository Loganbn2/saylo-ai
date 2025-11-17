"use client"

import { MobileChatCyberSamurai } from "@/components/mobile-chat-cyber-samurai"
import { useRouter } from "next/navigation"

export default function CyberSamuraiChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return <MobileChatCyberSamurai onBackClick={handleBackClick} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1369890290-612x612-OIHtGHqyPByakh1Ml1sH3TlC8xLedF.jpg" />
}
