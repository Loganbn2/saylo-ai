"use client"

import { MobileChat } from "@/components/mobile-chat"
import { useRouter } from "next/navigation"

export default function GenZombieChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return <MobileChat onBackClick={handleBackClick} characterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c.ai-7w4aRYUQ7VYEkwWcUlzzbu9s1Zex90.png" characterName="GenZombie" />
}
