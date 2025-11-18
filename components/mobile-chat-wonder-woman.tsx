"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, Phone, MoreVertical, Send, ChevronDown, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "character"
  timestamp: string
}

interface MobileChatWonderWomanProps {
  onBackClick: () => void
}

export function MobileChatWonderWoman({ onBackClick }: MobileChatWonderWomanProps) {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Being an Amazonian warrior is both an honor and a responsibility. From a young age on Themyscira, I was trained in combat, strategy, and diplomacy. Every day, I strive to be a symbol of hope and show that true strength comes from the courage to stand up for what's right. My mission is to bridge the gap between my homeland and this world, proving that peace and understanding are always possible.",
      sender: "character",
      timestamp: "2:16 PM",
    },
  ])
  const [showBanner, setShowBanner] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true)
    }, 1000)
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

  return (
    <div className="max-w-sm mx-auto bg-zinc-900 text-white h-screen flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBackClick} className="text-gray-400 hover:text-white transition-colors" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
            <img
              src="/images/design-mode/wonder-woman%20%281%29.png"
              alt="Wonder Woman"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm">Wonder Woman</h1>
            <p className="text-xs text-gray-400">By @amazonian</p>
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
                  <p className="text-xs text-gray-400 mb-1">Wonder Woman</p>
                  <div className="bg-zinc-800 rounded-2xl p-4">
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

      {/* DC Dark Legion promotional banner */}
      {bannerVisible && (
        <div
          className={`absolute left-0 right-0 z-20 transition-transform duration-500 ease-out ${
            showBanner ? "translate-y-0" : "-translate-y-[200%]"
          }`}
          style={{ top: "16px" }}
        >
          <div className="relative mx-4 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-4">
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
                  src="/images/design-mode/unnamed%20%281%29.jpg"
                  alt="DC Dark Legion"
                  className="h-[94px] w-[94px] rounded-xl"
                />
              </div>

              {/* Text Content and Download Button */}
              <div className="flex-1 flex flex-col gap-1.5">
                <h3 className="text-white font-bold text-sm">DC Dark Legion</h3>
                <p className="text-gray-300 text-xs leading-4">Super hero/villain strategy action game.</p>

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
