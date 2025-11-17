"use client"

import { MobileChatGamerGuy } from "@/components/mobile-chat-gamer-guy"
import { useRouter } from "next/navigation"

export default function GamerGuyPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return <MobileChatGamerGuy onBackClick={handleBackClick} characterImage="/gamer-guy-gaming-setup.jpg" />
}
