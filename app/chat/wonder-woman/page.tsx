"use client"

import { MobileChatWonderWoman } from "@/components/mobile-chat-wonder-woman"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function WonderWomanChatPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatWonderWoman onBackClick={() => router.push("/")} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wonder-woman%20%281%29-qVv5G5Shq1tdwRRPMSitIhp2RzGalJ.png" />
      </div>
    </div>
  )
}
