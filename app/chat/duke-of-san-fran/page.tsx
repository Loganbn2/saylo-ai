"use client"

import { MobileChatDuke } from "@/components/mobile-chat-duke"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function DukeOfSanFranChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatDuke
          onBackClick={handleBackClick}
         
          characterName="The Duke of San Fran"
        />
      </div>
    </div>
  )
}
