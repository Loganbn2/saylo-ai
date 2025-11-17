"use client"

import { MobileChatGunslinger } from "@/components/mobile-chat-gunslinger"
import { useRouter } from "next/navigation"

export default function GunslingerChatPage() {
  const router = useRouter()

  return <MobileChatGunslinger onBackClick={() => router.push("/")} />
}
