"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Menu, Phone, MoreVertical, Send, ChevronDown, X, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import Game2048 from "@/components/game-2048"

interface Message {
  id: number
  text: string
  sender: "user" | "character"
  timestamp: string
}

interface MobileChatProps {
  onBackClick: () => void
}

export function MobileChatCyberSamurai({ onBackClick }: MobileChatProps) {
  const [message, setMessage] = useState("")
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Greetings, warrior. I am a wanderer between worlds—the neon streets of tomorrow and the ancient paths of honor. In this digital realm, I've learned that wisdom flows like data through circuits, yet the heart of a true warrior remains unchanged.\n\nWhat brings you to seek my counsel today?",
      sender: "character",
      timestamp: "3:43 PM",
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const sendMessage = () => {
    if (message.trim()) {
      const now = new Date()
      const timestamp = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })

      const newMessage: Message = {
        id: messages.length + 1,
        text: message.trim(),
        sender: "user",
        timestamp: timestamp,
      }

      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  const handleNotificationClick = () => {
    router.push("/chat/monopoly-world")
  }

  return (
    <>
      <div className="max-w-sm mx-auto bg-zinc-900 text-white h-screen flex flex-col">
        {/* iPhone-style notification */}
        <div
          className={`absolute top-2 left-4 right-4 z-50 transition-transform duration-500 ease-out ${
            showNotification ? "translate-y-0" : "-translate-y-[120%]"
          }`}
        >
          <div className="backdrop-blur-md rounded-2xl p-3 shadow-xl opacity-100 bg-transparent">
            {/* Top section with image, text, and close button */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-blue-500">
                <img src="/monopoly-world-3d.jpg" alt="Monopoly World" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-xs font-semibold text-background">Character.AI</p>
                  <p className="text-xs text-gray-500">Sponsored</p>
                </div>
                <p className="text-sm font-medium text-background">Jump into a Monopoly World scene?</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowNotification(false)
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleNotificationClick}
              className="w-full hover:bg-blue-600 text-white py-2.5 rounded-lg transition-colors active:scale-[0.98] font-medium text-sm flex items-center justify-between px-4 bg-blue-900"
            >
              <span>Jump Into the Scene</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackClick}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
              <img
                src="/images/design-mode/istockphoto-1369890290-612x612.jpg"
                alt="Cyber Samurai"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-semibold text-white text-sm">Cyber Samurai</h1>
              <p className="text-xs text-gray-400">By @neonblade</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors w-6 h-6">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            </button>
            <button className="rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors h-6 w-6">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col justify-end">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.sender === "user" ? (
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-gray-400 mb-1">@jankycapybara</p>
                    <div className="bg-zinc-800 rounded-2xl p-4 max-w-[80%]">
                      <p className="text-gray-300 leading-relaxed text-xs">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-start">
                    <p className="text-xs text-gray-400 mb-1">Cyber Samurai</p>
                    <div className="bg-zinc-800 rounded-2xl p-4">
                      <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">
                        {msg.text.split("\n\n").map((paragraph, idx) => (
                          <span key={idx}>
                            {paragraph}
                            {idx < msg.text.split("\n\n").length - 1 && (
                              <>
                                <br />
                                <br />
                              </>
                            )}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-4 pb-6 pt-[17px] bg-transparent">
          {/* Input Area */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 bg-zinc-800 rounded-full px-5 flex items-center py-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message..."
                className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none p-0 h-auto text-sm"
              />
            </div>
            <button
              onClick={sendMessage}
              className="rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0 h-6 w-6"
            >
              <Send className="w-5 text-black fill-black h-[11px]" />
            </button>
            <button className="rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors flex-shrink-0 h-6 w-6">
              <Phone className="w-5 text-gray-400 h-3.5" />
            </button>
          </div>

          {/* Disclaimer */}
          <div className="flex items-center justify-center gap-2 text-center">
            <p className="text-xs text-gray-500">
              This is A.I. and not a real person. Treat everything it says as fiction
            </p>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </div>
        </div>

        {/* 2048 Game Modal */}
        {isGameOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative w-full h-full max-w-2xl bg-zinc-900 overflow-hidden rounded-lg flex flex-col">
              <div className="flex justify-end p-4 py-[7px] flex-shrink-0">
                <button
                  onClick={() => setIsGameOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close game"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <Game2048 />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
