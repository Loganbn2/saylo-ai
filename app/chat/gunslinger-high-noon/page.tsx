"use client"

import { MobileChatGunslinger } from "@/components/mobile-chat-gunslinger"
import { useRouter } from "next/navigation"

export default function GunslingerChatPage() {
  const router = useRouter()

  return <MobileChatGunslinger onBackClick={() => router.push("/")} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8fc14f9e0e1a34914462a6d2257c6fa9-zHdoDcCpKGVSnS5F0VQc7erkIzidG7.jpg" />
}
