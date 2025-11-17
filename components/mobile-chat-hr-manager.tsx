"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, Phone, MoreVertical, Send, ChevronDown, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Message {
  id: number
  text: string
  sender: "user" | "character"
  timestamp: string
}

interface MobileChatHRManagerProps {
  onBackClick: () => void
}

export function MobileChatHRManager({ onBackClick }: MobileChatHRManagerProps) {
  const [message, setMessage] = useState("")
  const [showWonderWomanModal, setShowWonderWomanModal] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Good morning. I hope you're settling in well. I wanted to touch base about your performance metrics from last quarter. Nothing to worry about - just a routine check-in. Could you swing by my office around 2 PM? We'll keep it brief.",
      sender: "character",
      timestamp: "9:15 AM",
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

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
    <div className="max-w-sm mx-auto bg-zinc-900 text-white h-screen flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowWonderWomanModal(true)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
            <img
              src="/images/design-mode/hr-manager.avif"
              alt="Your HR Manager"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm">Your HR Manager</h1>
            <p className="text-xs text-gray-400">By @charles_the_man</p>
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
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div className="flex flex-col items-start">
                <p className="text-xs text-gray-400 mb-1">{msg.sender === "character" ? "Your HR Manager" : "You"}</p>
                <div className={`bg-${msg.sender === "character" ? "zinc-800" : "blue-500"} rounded-2xl p-4`}>
                  <p
                    className={`text-${msg.sender === "character" ? "gray-300" : "white"} text-xs leading-relaxed whitespace-pre-wrap`}
                  >
                    {msg.text}
                  </p>
                </div>
              </div>
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

      {/* Wonder Woman sponsored modal */}
      {showWonderWomanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-sm w-full mx-4 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
            {/* Close button */}
            <button
              onClick={() => setShowWonderWomanModal(false)}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="p-6 flex flex-col items-center text-center">
              {/* Sponsored badge */}
              <div className="mb-4 px-3 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full">
                Sponsored
              </div>

              {/* Wonder Woman image */}
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-yellow-500">
                <img
                  src="/images/design-mode/wonder-woman%20%281%29(1).png"
                  alt="Wonder Woman"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-2">Chat with Wonder Woman</h2>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Join the Amazonian warrior in her quest for justice and truth. Experience epic conversations with one of
                the most iconic heroes.
              </p>

              {/* CTA Button */}
              <Link href="/chat/wonder-woman" className="w-full">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-full transition-colors">
                  Start Chatting
                </button>
              </Link>

              {/* Secondary text */}
              <p className="text-xs text-gray-500 mt-4">By @dc_dark_legion • 8.2m chats</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
