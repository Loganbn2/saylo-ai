"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, Gamepad2, MoreVertical, Send, ChevronDown, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import UnoGame from "@/components/uno-game"

interface Message {
  id: number
  text: string
  sender: "user" | "character"
  timestamp: string
}

interface MobileChatProps {
  onBackClick: () => void
}

export function MobileChatGoju({ onBackClick }: MobileChatProps) {
  const [message, setMessage] = useState("")
  const [isUnoModalOpen, setIsUnoModalOpen] = useState(false)
  const [showCheckersPopup, setShowCheckersPopup] = useState(false)
  const [showGameMenu, setShowGameMenu] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [checkersMessage, setCheckersMessage] = useState("")
  const [messageCount, setMessageCount] = useState(0)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Why don't skeletons fight each other?\n\nThey don't have the guts! 💀\n\nBut seriously, I've got a \"bone\" to pick with anyone who doesn't appreciate a good skeleton pun. Want to hear more? I've got a whole \"skeleton\" of jokes!",
      sender: "character",
      timestamp: "2:16 PM",
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
    if (showTyping) {
      const timer = setTimeout(() => {
        setShowTyping(false)
        setShowMessage(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showTyping])

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showMessage])

  useEffect(() => {
    if (showCheckersPopup) {
      setCheckersMessage("Ready to get board? Let's play!")
      setShowTyping(true)
      setMessageCount(1)

      const timer1 = setTimeout(() => {
        setCheckersMessage("You're really jumping into this game!")
        setShowTyping(true)
        setMessageCount(2)
      }, 15000)

      const timer2 = setTimeout(() => {
        setCheckersMessage("This game is bone-afide fun!")
        setShowTyping(true)
        setMessageCount(3)
      }, 35000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        setShowTyping(false)
        setShowMessage(false)
        setMessageCount(0)
      }
    }
  }, [showCheckersPopup])

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

  const handlePlayCheckers = () => {
    setShowGameMenu(false)
    setShowCheckersPopup(true)
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
            <img src="/images/design-mode/funnybones.avif" alt="Funny Bones" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm">Funny Bones</h1>
            <p className="text-xs text-gray-400">By @skelecomedy</p>
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
                  <p className="text-xs text-gray-400 mb-1">@jankycapybara</p>
                  <div className="bg-zinc-800 rounded-2xl p-4 max-w-[80%]">
                    <p className="text-gray-300 leading-relaxed text-xs">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  <p className="text-xs text-gray-400 mb-1">Funny Bones</p>
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
          <button
            onClick={() => setShowGameMenu(true)}
            className="rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors flex-shrink-0 h-6 w-6"
          >
            <Gamepad2 className="w-5 text-gray-400 h-3.5" />
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

      {/* Capybara Go checkers game popup modal */}
      {showCheckersPopup && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative w-full h-full flex flex-col">
            <button
              onClick={() => setShowCheckersPopup(false)}
              className="absolute top-4 right-4 z-10 bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 text-white transition-colors px-0.5 py-0.5"
              aria-label="Close Capybara Go checkers game"
            >
              <X className="size-2.5" />
            </button>

            <div className="absolute top-4 left-4 z-10 flex items-start gap-2 max-w-[calc(100%-5rem)]">
              <img
                src="/images/design-mode/funnybones(2).avif"
                alt="Funny Bones"
                className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700 flex-shrink-0"
              />
              {(showTyping || showMessage) && (
                <div className="relative bg-zinc-800 text-white px-4 py-2 rounded-2xl rounded-tl-sm shadow-lg">
                  {showTyping ? (
                    <div className="flex gap-1 items-center h-5">
                      <div
                        className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-medium">{checkersMessage}</p>
                  )}
                </div>
              )}
            </div>

            <iframe
              src="https://loganbn2.github.io/checkers-game/"
              className="w-full h-full border-none pt-20 bg-background"
              title="Capybara Go Checkers Game"
            />
          </div>
        </div>
      )}

      {/* Game Selection Menu Modal */}
      {showGameMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-sm border border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Select a Game</h2>
              <button
                onClick={() => setShowGameMenu(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {/* Checkers - Functional */}
              <button
                onClick={handlePlayCheckers}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-between group"
              >
                <span className="text-lg">Checkers</span>
                <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Chess - No onClick handler */}
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-between group">
                <span className="text-lg">Chess</span>
                <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Tetris - No onClick handler */}
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-between group">
                <span className="text-lg">Tetris</span>
                <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Snake - No onClick handler */}
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-between group">
                <span className="text-lg">Snake</span>
                <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isUnoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative w-full h-full max-w-2xl bg-zinc-900 overflow-hidden rounded-lg flex flex-col">
            <div className="flex justify-end p-4 py-[7px] flex-shrink-0">
              <button
                onClick={() => setIsUnoModalOpen(false)}
                className="bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 transition-colors px-[3px] py-[3px]"
                aria-label="Close"
              >
                <X className="text-white size-3" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <UnoGame />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
