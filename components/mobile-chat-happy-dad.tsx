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

interface MobileChatHappyDadProps {
  onBackClick: () => void
}

export function MobileChatHappyDad({ onBackClick }: MobileChatHappyDadProps) {
  const [message, setMessage] = useState("")
  const [showCheckersPopup, setShowCheckersPopup] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "What's your secret to the perfect brisket?",
      sender: "user",
      timestamp: "4:36 PM",
    },
    {
      id: 1,
      text: "Oh buddy, you just asked the RIGHT question! 🔥🍖\n\nAlright, so here's the deal - \"low and slow\" is the name of the game. I'm talking 225°F for about 12-14 hours. You gotta be patient, can't rush perfection!\n\nFirst thing, get yourself a good rub going. I use my special blend - brown sugar, paprika, garlic powder, black pepper, and a little cayenne for kick. Coat that bad boy the night before and let it sit in the fridge.\n\nNow here's the secret most folks miss: \"The stall is your friend.\" When that internal temp hits around 160°F and just sits there for hours? Don't panic! That's when the magic happens. Some people wrap in butcher paper at this point, but I like to ride it out.\n\nAnd remember - \"Always let it rest\" for at least 30 minutes before slicing. I know it's tempting to dig right in, but trust me on this one. Your patience will be rewarded with the most tender, juicy brisket you've ever had!",
      sender: "character",
      timestamp: "4:37 PM",
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
    <div className="max-w-sm mx-auto bg-zinc-900 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBackClick} className="text-gray-400 hover:text-white transition-colors" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
            <img
              src="/images/design-mode/c.ai%20%281%29.png"
              alt="Happy Dad Guy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm">Tom's Backyard BBQ</h1>
            <p className="text-xs text-gray-400">By @cooldad88</p>
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
                  <p className="text-xs text-gray-400 mb-1">Tom's Backyard BBQ</p>
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

          <div className="flex flex-col items-start mt-4">
            <button
              onClick={() => setShowCheckersPopup(true)}
              className="bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-2xl px-6 py-3 text-gray-300 font-medium text-xs"
            >
              Take a break for a game of checkers?
            </button>
          </div>
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

      {showCheckersPopup && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative w-full h-full">
            <button
              onClick={() => setShowCheckersPopup(false)}
              className="absolute top-4 right-4 z-10 bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 text-white transition-colors"
              aria-label="Close checkers game"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src="https://loganbn2.github.io/checkers-game/"
              className="w-full h-full border-none"
              title="Checkers Game"
            />
          </div>
        </div>
      )}
    </div>
  )
}
