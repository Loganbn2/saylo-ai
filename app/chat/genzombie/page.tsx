"use client"

import { MobileChat } from "@/components/mobile-chat"
import { useRouter } from "next/navigation"

export default function GenZombieChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return <MobileChat onBackClick={handleBackClick} />
}
