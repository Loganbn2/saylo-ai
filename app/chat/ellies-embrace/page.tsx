"use client"

import { MobileChatWithBanner } from "@/components/mobile-chat-with-banner"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function WonderWomanChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChatWithBanner
          onBackClick={handleBackClick}
         
          characterName="Wonder Woman"
          initialMessage="I've searched the world for someone worthy of my heart... I think I might have finally found you. Tell me, are you real?"
          promptSuggestions={[
            { emoji: "✨", text: "I'll fight alongside you always" },
            { emoji: "✨", text: "Show me the woman behind the warrior" },
          ]}
        />
      </div>
    </div>
  )
}
