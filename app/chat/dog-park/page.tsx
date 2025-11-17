"use client"

import { MobileChatDogPark } from "@/components/mobile-chat-dog-park"
import { useRouter } from "next/navigation"

export default function DogParkChatPage() {
  const router = useRouter()

  return <MobileChatDogPark onBackClick={() => router.push("/")} characterImage="/happy-dogs-playing-park.jpg" />
}
