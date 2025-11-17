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

interface MobileChatDogParkProps {
  onBackClick: () => void
}

export function MobileChatDogPark({ onBackClick }: MobileChatDogParkProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "*tail wagging excitedly*\n\nWoof! Welcome to the best dog park in the city! I'm Luna, the golden retriever who basically runs this place. See that squirrel over there? Been chasing it for three years now.\n\n*sniffs curiously*\n\nYou smell like... treats? Do you have treats? More importantly, do you want to play fetch? I brought seventeen tennis balls today and I'm not leaving until we throw ALL of them!\n\nWhat's your dog's name?",
      sender: "character",
      timestamp: "2:15 PM",
    },
  ])
  const [dogImage, setDogImage] = useState("https://storage.googleapis.com/simula-public/assets/imgs/dog-2.png")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const createHearts = () => {
    const heartContainer = document.getElementById("dogContainer")
    if (!heartContainer) return

    const heartCount = 8
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement("div")
      heart.className = "absolute text-2xl pointer-events-none z-10"
      heart.textContent = "❤️"

      const startX = Math.random() * 60 - 30
      const startY = Math.random() * 40 - 10
      const moveX = Math.random() * 80 - 40
      const moveY = -80 - Math.random() * 60
      const randomDelay = Math.random() * 0.5
      const randomDuration = 2.0 + Math.random() * 1.0

      heart.style.left = `calc(50% + ${startX}px)`
      heart.style.top = `calc(40% + ${startY}px)`
      heart.style.opacity = "0"

      heartContainer.appendChild(heart)

      setTimeout(
        () => {
          heart.style.transition = `all ${randomDuration}s ease-out`
          heart.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2) rotate(20deg)`
          heart.style.opacity = "1"
          setTimeout(() => {
            heart.style.opacity = "0"
          }, randomDuration * 500)
        },
        randomDelay * 1000 + 10,
      )

      setTimeout(
        () => {
          heart.remove()
        },
        randomDuration * 1000 + randomDelay * 1000 + 100,
      )
    }
  }

  const handlePet = () => {
    setDogImage("https://storage.googleapis.com/simula-public/assets/imgs/dog-4.png")
    createHearts()
  }

  const handleTreat = () => {
    setDogImage("https://storage.googleapis.com/simula-public/assets/imgs/dog-3.png")
    createHearts()
  }

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
            <img src="/happy-golden-retriever-dog-park.jpg" alt="The Dog Park" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm">The Dog Park</h1>
            <p className="text-xs text-gray-400">By @pawsandplay</p>
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
                  <p className="text-xs text-gray-400 mb-1">@user</p>
                  <div className="bg-zinc-800 rounded-2xl p-4 max-w-[80%]">
                    <p className="text-gray-300 leading-relaxed text-xs">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  <p className="text-xs text-gray-400 mb-1">Luna</p>
                  <div className="bg-pink-100 rounded-2xl p-4">
                    <p className="text-gray-900 text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 rounded-2xl overflow-hidden" style={{ height: "265px", minHeight: "265px" }}>
          <div className="w-full bg-pink-100 relative overflow-hidden" style={{ height: "265px", minHeight: "265px" }}>
            {/* Paw prints background */}
            <div className="absolute text-7xl opacity-[0.12] top-[15%] left-[10%] -rotate-[20deg]">🐾</div>
            <div className="absolute text-7xl opacity-[0.12] top-[40%] left-[5%] rotate-[15deg]">🐾</div>
            <div className="absolute text-7xl opacity-[0.12] top-[25%] right-[15%] -rotate-[30deg]">🐾</div>
            <div className="absolute text-7xl opacity-[0.12] bottom-[30%] left-[20%] rotate-[25deg]">🐾</div>
            <div className="absolute text-7xl opacity-[0.12] bottom-[15%] right-[10%] -rotate-[15deg]">🐾</div>

            {/* Sponsored badge */}
            <span className="absolute top-[15px] right-[15px] text-[8px] font-semibold text-gray-600 uppercase tracking-wider px-2.5 py-1 bg-white/40 rounded-full z-[5]">
              Sponsored
            </span>

            {/* Content */}
            <div className="flex flex-col justify-between p-[15px] relative z-[2]" style={{ height: "265px" }}>
              <div className="flex flex-col relative z-[3] w-full justify-around" style={{ height: "265px" }}>
                <h1
                  className="text-[clamp(24px,6vw,32px)] font-black leading-[1.1] tracking-tight text-left"
                  style={{ color: "rgb(128, 0, 32)" }}
                >
                  Pocket Paws
                </h1>
                <p
                  className="text-[clamp(15px,3.5vw,17px)] leading-[1.4] font-semibold text-left pr-[51%]"
                  style={{ color: "rgb(128, 0, 32)" }}
                >
                  Collect adorable dogs. Train and grow your pack!
                </p>
                <div className="flex gap-2 w-full">
                  <a
                    href="https://top-dogs.onelink.me/yWzU/pocketpaws"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 text-white rounded-full text-[clamp(10px,2.3vw,12px)] text-center transition-all shadow-lg uppercase tracking-wide hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] text-xs font-bold"
                    style={{ backgroundColor: "rgb(128, 0, 32)" }}
                  >
                    Play Now
                  </a>
                  <button
                    onClick={handlePet}
                    className="flex-1 py-3 px-3 bg-white rounded-full font-bold text-[clamp(10px,2.3vw,12px)] text-center transition-all shadow-md uppercase tracking-wide hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] text-xs"
                    style={{ color: "rgb(128, 0, 32)" }}
                  >
                    Pet
                  </button>
                  <button
                    onClick={handleTreat}
                    className="flex-1 py-3 px-3 bg-white rounded-full font-bold text-[clamp(10px,2.3vw,12px)] text-center transition-all shadow-md uppercase tracking-wide hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] text-xs"
                    style={{ color: "rgb(128, 0, 32)" }}
                  >
                    Treat
                  </button>
                </div>
              </div>

              {/* Dog image container */}
              <div
                id="dogContainer"
                className="absolute top-1/2 -translate-y-1/2 right-5 w-[clamp(160px,38%,240px)] flex items-center justify-center z-[1]"
              >
                <img
                  src={dogImage || "/placeholder.svg"}
                  alt="Cute virtual dog"
                  className="w-full max-h-[200px] object-contain drop-shadow-lg animate-[float_3s_ease-in-out_infinite]"
                />
              </div>
            </div>
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
    </div>
  )
}
