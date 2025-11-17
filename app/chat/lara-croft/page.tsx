"use client"

import { MobileChatLaraCroft } from "@/components/mobile-chat-lara-croft"
import { useRouter } from "next/navigation"

export default function LaraCroftChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return <MobileChatLaraCroft onBackClick={handleBackClick} />
}
