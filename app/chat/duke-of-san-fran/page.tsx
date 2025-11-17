"use client"

import { MobileChatDuke } from "@/components/mobile-chat-duke"
import { useRouter } from "next/navigation"

export default function DukeOfSanFranChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return <MobileChatDuke onBackClick={handleBackClick} />
}
