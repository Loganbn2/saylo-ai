"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, Phone, MoreVertical, Send, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "character"
  timestamp: string
}

interface MobileChatMonopolyWorldProps {
  onBackClick: () => void
}

export function MobileChatMonopolyWorld({ onBackClick }: MobileChatMonopolyWorldProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Monopoly World! Want to dominate the board? Focus on acquiring complete color sets early - orange and red properties are statistically the most landed-on. Build three houses on each property for the best ROI, and always keep cash reserves. Trading is crucial, so negotiate deals that benefit both parties. Ready to build your empire?",
      sender: "character",
      timestamp: "4:21 PM",
    },
  ])
  const [showBanner, setShowBanner] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

  return (
    <div className="max-w-sm mx-auto text-white h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/design-mode/monop%20%281%29.png"
          alt="Monopoly World Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 backdrop-blur-sm bg-zinc-900">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackClick}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
              <img src="/images/design-mode/monop.png" alt="Monopoly World" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-semibold text-white text-sm">Monopoly World</h1>
              <p className="text-xs text-gray-400">By @boardgame</p>
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
                    <p className="text-xs text-gray-400 mb-1">@user</p>
                    <div className="bg-zinc-800 rounded-2xl p-4 max-w-[80%]">
                      <p className="text-gray-300 leading-relaxed text-xs">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-start">
                    <p className="text-xs mb-1 text-background font-medium">Monopoly World</p>
                    <div className="rounded-2xl p-4 bg-teal-950">
                      <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-4 pt-[17px] pb-2 bg-zinc-900">
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
        </div>
      </div>

      {/* Monopoly World promotional banner */}
      {bannerVisible && (
        <div
          className={`absolute left-0 right-0 top-16 z-20 transition-transform duration-500 ease-out ${
            showBanner ? "translate-y-0" : "-translate-y-[200%]"
          }`}
        >
          <div className="relative mx-4 bg-zinc-800 rounded-2xl shadow-2xl p-4 py-3 px-3 my-3.5">
            <button
              onClick={() => setBannerVisible(false)}
              className="absolute top-2 right-2 z-10 bg-zinc-800 hover:bg-zinc-700 rounded-full p-1.5 transition-colors"
              aria-label="Close banner"
            >
              <X className="text-white size-3" />
            </button>

            <div className="flex items-start gap-4">
              {/* App Icon */}
              <div className="flex-shrink-0">
                <img
                  src="/images/design-mode/unnamed%20%283%29.png"
                  alt="Monopoly World"
                  className="h-[94px] w-[94px] rounded-xl"
                />
              </div>

              {/* Text Content and Download Button */}
              <div className="flex-1 flex flex-col gap-1.5">
                <h3 className="text-white font-bold text-sm">Monopoly World</h3>
                <p className="text-gray-300 text-xs leading-4">Multi-player game in the real world virtual map.</p>

                {/* Download Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-between py-1 rounded-sm px-2.5">
                  <span className="text-xs">Download App</span>
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
