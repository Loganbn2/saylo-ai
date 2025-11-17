"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, Phone, MoreVertical, Send, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "character"
  timestamp: string
}

interface MobileChatProps {
  onBackClick: () => void
  characterImage?: string
  characterName?: string
}

export function MobileChatDuke({ onBackClick, characterImage, characterName }: MobileChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "What's your opinion on knit polo shirts for business casual?",
      sender: "user",
      timestamp: "4:36 PM",
    },
    {
      id: 1,
      text: 'Ah, the knit polo - the unsung hero of refined casual dressing! 👔✨\n\nKnit polos are "the perfect bridge between comfort and sophistication." We\'re witnessing a renaissance of fine-gauge knits, and gentlemen who understand quality are gravitating toward Italian merino and Sea Island cotton constructions.\n\nMy recommendation? Invest in "long-staple cotton or merino wool" knits - they drape beautifully and resist pilling. Look for a "ribbed collar that holds its shape" and mother-of-pearl buttons, never plastic.\n\nThe fit is crucial: "slim but not tight," with sleeves that hit mid-bicep and a hem that grazes your belt line. Navy, charcoal, and sage green are your foundational colors, but don\'t overlook a "burgundy or camel" for autumn sophistication.\n\nPair with "tailored chinos and suede loafers" for business casual, or layer under a blazer for elevated smart-casual. The texture of a quality knit polo adds dimension that a standard dress shirt simply cannot match.',
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
    <div className="max-w-sm mx-auto bg-[#0a0613] text-white h-screen flex flex-col relative overflow-hidden">
      {/* Background overlay */}
      {characterImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 pointer-events-none"
          style={{
            backgroundImage: `url(${characterImage})`,
          }}
        />
      )}
      {/* Chat Area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 flex flex-col">
        {/* Chat Header Row */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBackClick} className="text-white hover:text-gray-200 transition-colors flex-shrink-0">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-white text-lg">{characterName || "Chat"}</h1>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.sender === "user" ? (
                <div className="flex flex-col items-end">
                  <p className="text-xs text-gray-400 mb-1">@jankycapybara</p>
                  <div className="bg-white/10 rounded-2xl p-4 w-[70%]">
                    <p className="text-white leading-relaxed text-[14px]">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  <p className="text-xs text-gray-400 mb-1">{characterName || "Character"}</p>
                  <div className="bg-white/10 rounded-2xl p-4 w-[70%]">
                    <p className="text-white text-[14px] leading-relaxed whitespace-pre-wrap">
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

              {msg.sender === "character" && msg.id === 1 && (
                <div className="mt-4">
                  <div className="bg-zinc-800 rounded-2xl p-4 text-left">
                    <div className="flex gap-3">
                      {/* Left column: Image and Download button stacked */}
                      <div className="flex flex-col gap-3 flex-shrink-0">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                          <img src="/images/design-mode/unnamed.png" alt="Shein" className="w-16 h-16 object-contain" />
                        </div>
                        <img
                          src="/images/design-mode/appstore.png"
                          alt="Download on the App Store"
                          className="h-8 object-contain w-24"
                        />
                      </div>

                      {/* Right column: Title and Description taking full right half */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex gap-2 mb-2 items-center">
                          <span className="text-sm">👕</span>
                          <h3 className="text-white font-bold leading-tight text-sm">Shein</h3>
                        </div>
                        <p className="text-gray-300 text-xs leading-relaxed">
                          Nail the sleek knit polo look on a budget! Explore stylish and affordable knit polos for men
                          on Shein.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 px-4 pb-6 pt-[17px] bg-transparent">
        {/* Input Area */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-white/10 rounded-2xl px-5 flex items-center py-3 gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message..."
              className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none p-0 h-auto text-sm"
            />
            <button
              onClick={sendMessage}
              className="flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <Send className="w-4 h-4 text-white fill-white" />
            </button>
          </div>
        </div>

        {/* Prompt Suggestions */}
        <div className="flex flex-col gap-2">
          <button className="bg-white/10 rounded-2xl px-5 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors text-left">
            <span className="text-lg flex-shrink-0">✨</span>
            <span className="text-white text-[14px]">Tell me a funny joke</span>
          </button>
          <button className="bg-white/10 rounded-2xl px-5 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors text-left">
            <span className="text-lg flex-shrink-0">✨</span>
            <span className="text-white text-[14px]">Play a fun game</span>
          </button>
        </div>
      </div>
    </div>
  )
}
