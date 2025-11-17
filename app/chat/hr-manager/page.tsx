"use client"

import { MobileChatHRManager } from "@/components/mobile-chat-hr-manager"
import { useRouter } from "next/navigation"

export default function HRManagerChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return <MobileChatHRManager onBackClick={handleBackClick} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hr-manager-TACTViXYwMwTYqNNyH37s5TgrrdEVj.avif" />
}
