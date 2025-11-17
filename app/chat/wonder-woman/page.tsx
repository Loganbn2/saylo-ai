"use client"

import { MobileChatWonderWoman } from "@/components/mobile-chat-wonder-woman"
import { useRouter } from "next/navigation"

export default function WonderWomanChatPage() {
  const router = useRouter()

  return <MobileChatWonderWoman onBackClick={() => router.push("/")} />
}
