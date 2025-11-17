"use client"

import { MobileChatGoju } from "@/components/mobile-chat-goju"
import { useRouter } from "next/navigation"

export default function GojuChatPage() {
  const router = useRouter()

  return <MobileChatGoju onBackClick={() => router.push("/")} />
}
