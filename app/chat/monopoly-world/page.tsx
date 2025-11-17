"use client"

import { MobileChatMonopolyWorld } from "@/components/mobile-chat-monopoly-world"
import { useRouter } from "next/navigation"

export default function MonopolyWorldChatPage() {
  const router = useRouter()

  return <MobileChatMonopolyWorld onBackClick={() => router.push("/")} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/monop-ADG2dyFTUrtgP56FEFiLL8Dbm66wOY.png" />
}
