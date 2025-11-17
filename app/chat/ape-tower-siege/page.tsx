"use client"

import { MobileChatApeTower } from "@/components/mobile-chat-ape-tower"
import { useRouter } from "next/navigation"

export default function ApeTowerSiegeChatPage() {
  const router = useRouter()

  return <MobileChatApeTower onBackClick={() => router.push("/")} />
}
