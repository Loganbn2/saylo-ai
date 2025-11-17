"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, Phone, MoreVertical, Send, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "character"
  timestamp: string
}

interface MobileChatApeTowerProps {
  onBackClick: () => void
}

export function MobileChatApeTower({ onBackClick }: MobileChatApeTowerProps) {
  const [message, setMessage] = useState("")
  const [apeImage, setApeImage] = useState("https://storage.googleapis.com/simula-public/assets/imgs/ape-2.png")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "*pounds chest and surveys the battlefield from atop the skyscraper*\n\nHOO HOO! Commander, the ape army has successfully taken control of floors 1 through 47. The humans never expected us to organize like this. They thought we were just zoo animals!\n\n*adjusts tactical headset*\n\nWe've got gorillas holding the lobby, chimps providing sniper support from the east wing, and orangutans have hacked into their security systems. The humans are trapped on floors 48-52.\n\nWhat are your orders, Commander? Do we negotiate, or do we push to the top floor and claim the executive suite? And more importantly... did you bring the bananas I requested for the troops?",
      sender: "character",
      timestamp: "5:47 PM",
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
              src="/gorilla-soldier-tactical-gear-tower.jpg"
              alt="Ape Tower Siege"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm">Ape Tower Siege</h1>
            <p className="text-xs text-gray-400">By @primatewars</p>
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
                  <p className="text-xs text-gray-400 mb-1">@commander</p>
                  <div className="bg-zinc-800 rounded-2xl p-4 max-w-[80%]">
                    <p className="text-gray-300 leading-relaxed text-xs">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  <p className="text-xs text-gray-400 mb-1">Captain Kong</p>
                  <div className="bg-red-950 rounded-2xl p-4">
                    <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <div
                    className="w-full bg-red-950 rounded-2xl mt-2 overflow-hidden relative"
                    style={{ height: "265px" }}
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://storage.googleapis.com/simula-public/assets/imgs/apes-back.png')",
                      }}
                    />

                    {/* Decorations */}
                    <div className="absolute top-[10%] left-[8%] text-5xl opacity-[0.08] z-[1]">🎯</div>
                    <div className="absolute top-[35%] left-[5%] text-5xl opacity-[0.08] z-[1]">🏰</div>
                    <div className="absolute bottom-[20%] left-[15%] text-5xl opacity-[0.08] z-[1]">💥</div>

                    {/* Sponsored Badge */}
                    <span className="absolute top-[25px] right-[15px] text-[8px] font-semibold text-gray-400 uppercase tracking-wider px-2.5 py-1 bg-white/10 rounded-full z-[5]">
                      Sponsored
                    </span>

                    {/* Content */}
                    <div className="h-full flex flex-col p-4 relative z-[2]">
                      <div className="flex flex-1">
                        {/* Left Section */}
                        <div className="flex flex-col gap-3 justify-evenly relative z-[3] w-[75%] pr-0">
                          <h1 className="text-lg font-black text-white leading-[1.5] drop-shadow-[2px_2px_8px_rgba(0,0,0,0.5)] tracking-tight text-left">
                            APES TOWER DEFENSE
                          </h1>

                          <div className="flex flex-col gap-2.5 w-full z-[3] pr-[60px]">
                            <button
                              onClick={() =>
                                setApeImage("https://storage.googleapis.com/simula-public/assets/imgs/ape-3.png")
                              }
                              className="flex-1 px-3.5 py-3.5 bg-white/15 text-white rounded-xl font-bold text-[12px] text-center transition-all shadow-[0_4px_16px_rgba(0,0,0,0.3)] uppercase tracking-wide backdrop-blur-[1px] border border-white/20 hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(93,93,93,0.3)] hover:bg-[rgba(92,92,92,0.15)] active:translate-y-0"
                            >
                              Upgrade (25💰)
                            </button>
                            <button
                              onClick={() =>
                                setApeImage("https://storage.googleapis.com/simula-public/assets/imgs/ape-4.png")
                              }
                              className="flex-1 px-3.5 py-3.5 bg-white/15 text-white rounded-xl font-bold text-[12px] text-center transition-all shadow-[0_4px_16px_rgba(0,0,0,0.3)] uppercase tracking-wide backdrop-blur-[1px] border border-white/20 hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(93,93,93,0.3)] hover:bg-[rgba(92,92,92,0.15)] active:translate-y-0"
                            >
                              Upgrade (50💰)
                            </button>
                            <a
                              href="https://veryostudios.sng.link/Dicle/fwi3?_smtype=3"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 px-3.5 py-3.5 bg-red-950 text-white rounded-xl font-bold text-[12px] text-center transition-all shadow-[0_6px_20px_rgba(115,115,115,0.4)] uppercase tracking-wide border-0 hover:shadow-[0_8px_25px_rgba(93,93,93,0.3)] hover:bg-[rgba(92,92,92,0.15)] active:translate-y-0"
                            >
                              Download Apes TD
                            </a>
                          </div>
                        </div>

                        {/* Ape Image Container */}
                        <div className="absolute bottom-0 right-0 w-full h-full z-[1] flex items-end justify-end">
                          <img
                            src={apeImage || "/placeholder.svg"}
                            alt="Ape Character"
                            className="max-w-[120%] max-h-[120%] w-auto object-contain object-[bottom_right] drop-shadow-[-4px_4px_12px_rgba(0,0,0,0.5)] transition-opacity duration-300 h-full"
                          />
                        </div>
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
