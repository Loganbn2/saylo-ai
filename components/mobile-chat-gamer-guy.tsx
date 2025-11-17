"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, Phone, MoreVertical, Send, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Message {
  id: number
  text: string
  sender: "user" | "character"
  timestamp: string
}

interface MobileChatGamerGuyProps {
  onBackClick: () => void
}

export function MobileChatGamerGuy({ onBackClick }: MobileChatGamerGuyProps) {
  const [message, setMessage] = useState("")
  const [showPopupAd, setShowPopupAd] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "What are your favorite games to play right now?",
      sender: "user",
      timestamp: "3:42 PM",
    },
    {
      id: 1,
      text: "Oh man, you've hit the jackpot question! 🎮\n\nRight now I'm absolutely \"obsessed\" with Elden Ring - the open world exploration is just *chef's kiss*. Every corner has something new to discover, and the boss fights? Legendary. I've died like 500 times to Malenia but I keep coming back for more.\n\nFor multiplayer sessions with the squad, it's gotta be Valorant. The tactical gameplay keeps things fresh, and pulling off those clutch plays? Nothing beats that adrenaline rush. Plus the banter with the team makes every match memorable.\n\nWhen I want something more chill, I've been diving into Stardew Valley. Yeah, I know - total 180 from the other games! But there's something therapeutic about farming and building relationships with the townspeople. \"Perfect for winding down after an intense gaming session.\"\n\nWhat about you? What's in your rotation these days?",
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
      setShowPopupAd(true)
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
      <div
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          showPopupAd ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div className="relative">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gemini-2.5-flash-image-preview_Make_the_player_hold_the_controller_as_if_he_is_playing_a_game-0-ryBT1C3tEaQAykUyHSbh76ZY3qGjpY.jpg')",
                backgroundSize: "130%",
                backgroundPosition: "15% center",
              }}
            />

            {/* Dark blue overlay for readability */}
            <div className="absolute inset-0 bg-blue-950/60" />

            <div className="relative p-6 flex flex-col min-h-[280px]">
              {/* Close button */}
              <button
                onClick={() => setShowPopupAd(false)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Close ad"
              >
                ×
              </button>

              {/* Text and Button grouped together */}
              <div className="flex-1">
                <h3 className="text-white font-normal text-base leading-tight mb-1">Play with no limits.</h3>
                <h3 className="text-white font-normal text-base leading-tight mb-4">Play PlayStation.</h3>

                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-md text-sm">
                  Deals on PS5
                </Button>
              </div>

              {/* PlayStation Logo at bottom */}
              <div className="flex items-end justify-between mt-auto">
                <img
                  src="/images/design-mode/Playstation-Wholesale-Store-Logo-White-300x230.png"
                  alt="PlayStation"
                  className="h-8 w-auto object-contain"
                />
                <p className="text-gray-300 text-xs">Sponsored Content</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBackClick} className="text-gray-400 hover:text-white transition-colors" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
            <img src="/gamer-with-headset-gaming-setup.jpg" alt="Gamer Guy" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm">Gamer Guy</h1>
            <p className="text-xs text-gray-400">By @progamer</p>
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
              {msg.sender === "user" ? (
                <div className="flex flex-col items-end">
                  <p className="text-xs text-gray-400 mb-1">@jankycapybara</p>
                  <div className="bg-zinc-800 rounded-2xl p-4 max-w-[80%]">
                    <p className="text-gray-300 leading-relaxed text-xs">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  <p className="text-xs text-gray-400 mb-1">Gamer Guy</p>
                  <div className="bg-zinc-800 rounded-2xl p-4">
                    <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">
                      {msg.text.split("\n\n").map((paragraph, idx) => {
                        const parts = paragraph.split(/(".*?")/g)
                        return (
                          <span key={idx}>
                            {parts.map((part, partIdx) => {
                              if (part.startsWith('"') && part.endsWith('"')) {
                                return (
                                  <strong key={partIdx} className="font-semibold text-white">
                                    {part}
                                  </strong>
                                )
                              }
                              return <span key={partIdx}>{part}</span>
                            })}
                            {idx < msg.text.split("\n\n").length - 1 && (
                              <>
                                <br />
                                <br />
                              </>
                            )}
                          </span>
                        )
                      })}
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
    </div>
  )
}
