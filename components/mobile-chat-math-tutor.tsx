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

export function MobileChatMathTutor({ onBackClick, characterImage, characterName }: MobileChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "I'm really struggling with both math and English. They're both so hard for me in school.",
      sender: "user",
      timestamp: "4:36 PM",
    },
    {
      id: 1,
      text: "Hey, I totally understand how you feel! Both subjects can seem overwhelming, but here's the thing - \"they're actually more connected than you think.\"\n\nWith math, it's all about breaking problems down into smaller steps. Don't try to solve everything at once. \"Start with what you know,\" then build from there. Practice is key - even just 15 minutes a day makes a huge difference.\n\nFor English, think of it like telling a story or having a conversation. \"Reading is your superpower\" - the more you read, the better you get at writing and understanding grammar naturally. Don't stress about being perfect; focus on expressing your ideas clearly.\n\nHere's my advice: \"Find connections between the two.\" Math teaches logical thinking, which helps you structure essays. English helps you explain math problems in words. They actually support each other!\n\nWhat specific topics are giving you the most trouble? Let's tackle them together, one step at a time. You've got this! 📚✨",
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
                  {msg.sender === "character" && msg.id === 1 && (
                    <div className="mt-4">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">💡</span>
                        <h3 className="text-white font-bold text-xs tracking-wide">HELPFUL SUGGESTIONS</h3>
                      </div>

                      {/* Suggestion Buttons */}
                      <div className="space-y-2 mb-3">
                        <button className="flex items-center text-left rounded-full border border-gray-600 hover:border-gray-500 transition-colors py-[5px] px-[11px] w-max">
                          <span className="text-gray-300 text-xs">What books should I start with? </span>
                        </button>
                        <button className="flex items-center text-left rounded-full border border-gray-600 hover:border-gray-500 transition-colors px-[11px] py-[5px] w-max">
                          <span className="text-gray-300 text-xs">Are there any effective math learning sites? </span>
                        </button>
                        <button className="flex items-center text-left rounded-full border-2 border-yellow-500 hover:border-yellow-400 transition-colors px-[11px] py-[5px] w-max">
                          <span className="text-gray-300 text-xs">Level up reading and writing with Grammarly </span>
                        </button>
                      </div>

                      {/* Sponsored Content Label */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">Sponsored Content</span>
                      </div>
                    </div>
                  )}
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
