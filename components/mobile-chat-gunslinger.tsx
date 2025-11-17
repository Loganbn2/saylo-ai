"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, Phone, MoreVertical, Send, X, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "character"
  timestamp: string
}

interface MobileChatGunslingerProps {
  onBackClick: () => void
}

export function MobileChatGunslinger({ onBackClick }: MobileChatGunslingerProps) {
  const [message, setMessage] = useState("")
  const [showGamePopup, setShowGamePopup] = useState(false)
  const [showSurvivalModal, setShowSurvivalModal] = useState(false)
  const [showAd, setShowAd] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "*tips hat and adjusts gun belt*\n\nWell now, I reckon I'm here for opportunity and a fresh start. Heard tell there's been trouble with outlaws, and the sheriff's looking for someone who knows their way around a six-shooter. Plus, the saloon serves decent whiskey.\n\n*squints at the horizon*\n\nBut truth be told, I'm hoping this might be the place where I can finally hang up my guns for good. Seen too much bloodshed. What about you - you from around here?",
      sender: "character",
      timestamp: "12:01 PM",
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true)
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

  const handleGameClose = () => {
    setShowGamePopup(false)
    setShowSurvivalModal(true)
  }

  return (
    <div className="max-w-sm mx-auto text-white h-screen flex flex-col relative">
      <div
        className={`absolute top-2 left-4 right-4 z-50 transition-transform duration-500 ease-out ${
          showAd ? "translate-y-0" : "-translate-y-[120%]"
        }`}
      >
        <div className="backdrop-blur-md rounded-2xl shadow-lg p-3 bg-transparent">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
              <img src="/state-of-survival-icon.png" alt="Shooter Game" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-xs font-semibold text-background">Character.AI</p>
                <p className="text-xs text-gray-500">Sponsored</p>
              </div>
              <p className="text-sm font-medium text-background">Test your skills in a FPS game?</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowAd(false)
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => {
              setShowAd(false)
              setShowGamePopup(true)
            }}
            className="w-full hover:bg-amber-700 text-white py-2.5 px-4 rounded-lg transition-colors active:scale-[0.98] font-medium text-sm flex items-center justify-between bg-amber-800"
          >
            <span>Test Your Skills</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showGamePopup && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={handleGameClose}
            className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors text-2xl font-bold w-10 h-10 flex items-center justify-center bg-zinc-800/80 rounded-full"
            aria-label="Close game"
          >
            ×
          </button>
          <iframe
            src="https://renjianfeng.github.io/BabylonFpsDemo/example/index.html"
            className="w-full h-full border-0"
            title="Zombie Shooter Game"
          />
        </div>
      )}

      {showSurvivalModal && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
          <button
            onClick={() => setShowSurvivalModal(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors text-3xl font-bold w-12 h-12 flex items-center justify-center"
            aria-label="Close modal"
          >
            ×
          </button>
          <div className="flex flex-col items-center max-w-md w-full">
            <img
              src="/state-of-survival-icon.png"
              alt="State of Survival"
              className="w-40 h-40 rounded-3xl shadow-2xl mb-8"
            />
            <h2 className="font-bold text-white mb-4 text-center text-2xl">State of Survival</h2>
            <p className="text-gray-300 text-center mb-8 leading-relaxed text-xs">
              The zombie apocalypse is here. Build your settlement, rescue survivors, and fight the undead in this
              thrilling FPS game.
            </p>
            <button className="w-full hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg text-base px-5 py-3 bg-orange-800">
              Download Now
            </button>
          </div>
        </div>
      )}

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8fc14f9e0e1a34914462a6d2257c6fa9-780QgHex01k8wZOw33wuCZc5q7DH4O.jpg')",
        }}
      />

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
              <img
                src="/images/design-mode/8fc14f9e0e1a34914462a6d2257c6fa9.jpg"
                alt="Gunslinger"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-semibold text-white text-sm">Gunslinger: High Noon</h1>
              <p className="text-xs text-gray-400">By @wildwest</p>
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
                    <p className="text-xs mb-1 text-foreground font-bold">Gunslinger</p>
                    <div className="rounded-2xl p-4 bg-amber-950">
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
    </div>
  )
}
