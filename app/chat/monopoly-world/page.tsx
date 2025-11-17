"use client"

import { MobileChatMonopolyWorld } from "@/components/mobile-chat-monopoly-world"
import { useRouter } from "next/navigation"

export default function MonopolyWorldChatPage() {
  const router = useRouter()

  return <MobileChatMonopolyWorld onBackClick={() => router.push("/")} />
}
