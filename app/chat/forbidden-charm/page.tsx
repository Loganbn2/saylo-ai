"use client"

import { MobileChat } from "@/components/mobile-chat"
import { useRouter } from "next/navigation"

export default function ForbiddenCharmChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <MobileChat
      onBackClick={handleBackClick}
      characterImage="https://storage.googleapis.com/simula-public/assets/mockups/3.png"
      characterName="Forbidden Charm"
      initialMessage="They say some things are forbidden for a reason... but I think rules are made to be broken. Especially with someone like you."
      promptSuggestions={[
        { emoji: "✨", text: "What would you risk for me?" },
        { emoji: "✨", text: "Show me your darker side" },
      ]}
    />
  )
}
