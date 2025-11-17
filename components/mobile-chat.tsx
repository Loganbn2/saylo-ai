"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, Phone, MoreVertical, Send, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "character"
  timestamp: string
}

interface PromptSuggestion {
  emoji: string
  text: string
}

interface MobileChatProps {
  onBackClick: () => void
  characterImage?: string
  characterName?: string
  initialMessage?: string
  promptSuggestions?: PromptSuggestion[]
  adSuggestion?: PromptSuggestion
}

const defaultMessages: Message[] = [
  {
    id: 1,
    text: "Hello! Welcome to GenZombie. Would you like to play a game?",
    sender: "character",
    timestamp: "2023-10-01T12:00:00Z",
  },
  // Add more messages here as needed
]

const defaultPromptSuggestions: PromptSuggestion[] = [
  { emoji: "✨", text: "Tell me a funny joke" },
  { emoji: "✨", text: "Play a fun game" },
]

export function MobileChat({
  onBackClick,
  characterImage,
  characterName,
  initialMessage,
  promptSuggestions = defaultPromptSuggestions,
  adSuggestion,
}: MobileChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(
    initialMessage
      ? [{ id: 1, text: initialMessage, sender: "character", timestamp: new Date().toISOString() }]
      : defaultMessages
  )

  const sendMessage = () => {
    if (message.trim()) {
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
                  <p className="text-xs text-gray-400 mb-1">GenZombie</p>
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
            </div>
          ))}
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
          {promptSuggestions.map((suggestion, idx) => (
            <button key={idx} className="bg-white/10 rounded-2xl px-5 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors text-left">
              <span className="text-lg flex-shrink-0">{suggestion.emoji}</span>
              <span className="text-white text-[14px]">{suggestion.text}</span>
            </button>
          ))}
          {adSuggestion && (
            <button className="bg-yellow-500/20 rounded-2xl px-5 py-3 flex flex-col gap-2 hover:bg-yellow-500/30 transition-colors text-left border border-yellow-500/40">
              <div className="flex items-center gap-3">
                <span className="text-lg flex-shrink-0">{adSuggestion.emoji}</span>
                <span className="text-yellow-100 text-[14px]">{adSuggestion.text}</span>
              </div>
              <span className="text-yellow-300/70 text-xs">Sponsored</span>
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
