"use client"

import { MobileChatWithBanner } from "@/components/mobile-chat-with-banner"
import { useRouter } from "next/navigation"

export default function WonderWomanChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <MobileChatWithBanner
      onBackClick={handleBackClick}
      characterImage="https://storage.googleapis.com/simula-public/assets/mockups/ww.jpg"
      characterName="Wonder Woman"
      initialMessage="I've searched the world for someone worthy of my heart... I think I might have finally found you. Tell me, are you real?"
      promptSuggestions={[
        { emoji: "✨", text: "I'll fight alongside you always" },
        { emoji: "✨", text: "Show me the woman behind the warrior" },
      ]}
    />
  )
}
