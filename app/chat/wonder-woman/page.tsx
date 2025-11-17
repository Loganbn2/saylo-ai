"use client"

import { MobileChatWonderWoman } from "@/components/mobile-chat-wonder-woman"
import { useRouter } from "next/navigation"

export default function WonderWomanChatPage() {
  const router = useRouter()

  return <MobileChatWonderWoman onBackClick={() => router.push("/")} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wonder-woman%20%281%29-qVv5G5Shq1tdwRRPMSitIhp2RzGalJ.png" />
}
