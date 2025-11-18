"use client"
import { useState } from "react"
import { Home, MessageCircle, Plus, Grid, User, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

interface Character {
  id: number
  name: string
  username: string
  description: string
  chats: string
  image: string
  route?: string
  isAd?: boolean
}

const characters: Character[] = [
  {
    id: 1,
    name: "GenZombie",
    username: "angiiirl",
    description: "Undead influencer spreading chaos and viral trends from beyond the grave",
    chats: "618.6k",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c.ai-7w4aRYUQ7VYEkwWcUlzzbu9s1Zex90.png",
    route: "/chat/genzombie",
  },
  {
    id: 2,
    name: "The Duke of San Fran",
    username: "darkempire",
    description: "Tech aristocrat ruling the Bay Area with code and coffee",
    chats: "132",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/6.png",
    route: "/chat/duke-of-san-fran",
  },
  {
    id: 3,
    name: "MONOPOLY WORLD",
    username: "Play Now",
    description: "Build your empire! Buy properties, collect rent, and dominate the board.",
    chats: "Ad",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/7.png",
    isAd: true,
  },
  {
    id: 4,
    name: "Gamer Guy",
    username: "pixelmaster",
    description: "Gaming enthusiast sharing tips, tricks, and epic gameplay moments",
    chats: "234.7k",
    image: "/gamer-guy-gaming-setup.jpg",
    route: "/chat/gamer-guy",
  },
]

const scenesCharacters: Character[] = [
  {
    id: 5,
    name: "Gunslinger: High Noon",
    username: "wildwest",
    description: "Face off in a dusty Western town where honor and quick draws decide fate",
    chats: "156.3k",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8fc14f9e0e1a34914462a6d2257c6fa9-zHdoDcCpKGVSnS5F0VQc7erkIzidG7.jpg",
    route: "/chat/gunslinger-high-noon",
  },
  {
    id: 6,
    name: "Monopoly World",
    username: "boardgame",
    description: "Build your empire, buy properties, and dominate the board in this classic game",
    chats: "203.7k",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/monop-ADG2dyFTUrtgP56FEFiLL8Dbm66wOY.png",
    route: "/chat/monopoly-world",
  },
  {
    id: 16,
    name: "The Dog Park",
    username: "pawsandplay",
    description: "Fetch, friends, and furry fun at the most popular dog park in town",
    chats: "184.2k",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/8.png",
    route: "/chat/dog-park",
  },
  {
    id: 17,
    name: "Ape Tower Siege",
    username: "primatewars",
    description: "Lead the ape revolution in an epic skyscraper takeover",
    chats: "219.8k",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/9.png",
    route: "/chat/ape-tower-siege",
  },
  {
    id: 8,
    name: "Halloween Costume Party",
    username: "spookyhost",
    description: "Join the wildest costume party of the year with tricks and treats",
    chats: "127.4k",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/10.png",
  },
  {
    id: 9,
    name: "Cozy Halloween Evening",
    username: "autumnvibes",
    description: "Curl up with pumpkin spice and spooky stories by the fireplace",
    chats: "93.8k",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/11.png",
  },
]

const featuredCharacters: Character[] = [
  {
    id: 18,
    name: "Untouched",
    username: "untouched",
    description: "Pure and innocent, waiting to be discovered",
    chats: "156.2k",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/1.png",
    route: "/chat/untouched",
  },
  {
    id: 19,
    name: "Wonder Woman",
    username: "amazonian",
    description: "Warrior princess fighting for truth and justice",
    chats: "1.2m",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/ww.jpg",
    route: "/chat/ellies-embrace",
  },
  {
    id: 20,
    name: "Rainy Day Dares",
    username: "rainyday_dares",
    description: "Adventurous spirit seeking thrilling conversations",
    chats: "189.3k",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/2.png",
    route: "/chat/rainy-day-dares",
  },
  {
    id: 21,
    name: "Forbidden Charm",
    username: "forbidden_charm",
    description: "Mysterious and intriguing, full of secrets",
    chats: "267.8k",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/3.png",
    route: "/chat/forbidden-charm",
  },
  {
    id: 22,
    name: "Hand of the Queen",
    username: "royalhand",
    description: "A mysterious figure dealing in power and secrets",
    chats: "412.1k",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/4.png",
    route: "/chat/hand-of-the-queen",
  },
  {
    id: 23,
    name: "Bonnie Bunny",
    username: "bonniebnny",
    description: "Playful and adventurous, always ready for excitement",
    chats: "524.3k",
    image: "https://storage.googleapis.com/simula-public/assets/mockups/5.png",
    route: "/chat/bonnie-bunny",
  },
]

interface HomePageProps {
  onCharacterSelect: () => void
}

export function HomePage({ onCharacterSelect }: HomePageProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("For You")

  const handleCharacterClick = (character: Character) => {
    if (character.route) {
      router.push(character.route)
    } else if (!character.isAd) {
      onCharacterSelect()
    }
  }

  return (
    <div className="w-full h-full bg-[#0a0613] text-white flex flex-col relative overflow-hidden">
      {/* Blurred purple lights background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-8"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-8"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-700 rounded-full mix-blend-screen filter blur-3xl opacity-8"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-8"></div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto pb-20 relative z-10">
        {/* Banner section with background image */}
        <div
          className="w-full h-[400px] bg-cover bg-no-repeat relative overflow-hidden flex-shrink-0"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/simula-public/assets/mockups/20250121165637.png)`,
            backgroundPosition: 'center -50px',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 70%)',
            }}
          />
          <div className="absolute bottom-[145px] left-0 right-0 flex justify-center">
            <img
              src="https://storage.googleapis.com/simula-public/assets/mockups/Play%20Now.png"
              alt="Play Now"
              className="h-24 object-contain"
            />
          </div>
          <div className="absolute bottom-[110px] left-0 right-0 text-center px-3">
            <p className="text-white font-bold text-[18px]">Why don't you shut up it's only a new student who cares?!</p>
          </div>
          <div className="absolute bottom-[25px] left-0 right-0 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => {
              const imageMap: { [key: number]: string } = {
                1: 'https://storage.googleapis.com/simula-public/assets/mockups/1.png',
                2: 'https://storage.googleapis.com/simula-public/assets/mockups/2.png',
                3: 'https://storage.googleapis.com/simula-public/assets/mockups/20250121165637.png',
                4: 'https://storage.googleapis.com/simula-public/assets/mockups/3.png',
                5: 'https://storage.googleapis.com/simula-public/assets/mockups/4.png',
              }
              return (
                <div
                  key={i}
                  className={`w-[50px] h-[65px] rounded-lg bg-cover ${
                    i === 3
                      ? 'border-2 border-white'
                      : ''
                  }`}
                  style={{
                    backgroundImage: `url(${imageMap[i]})`,
                    backgroundPosition: 'center 0px',
                    backgroundSize: 'cover',
                  }}
                ></div>
              )
            })}
          </div>
        </div>

        <div className="px-4 py-3">
          <h2 className="text-white font-bold text-[24px]">⭐ Characters</h2>
        </div>

        <div className="flex gap-2 px-4 py-4 overflow-x-auto scrollbar-hide">
          {["For You", "Male", "Female", "Dynamic"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab !== "For You" && tab !== "Voices") {
                  setActiveTab(tab)
                }
              }}
              className={`rounded-full font-medium whitespace-nowrap transition-colors text-sm px-6 py-2 ${
                activeTab === tab ? "bg-white/20 text-white" : "bg-transparent text-white hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="pt-4 w-full px-[20px]">
          {activeTab === "For You" && (
            <div className="grid grid-cols-2 gap-[6px]">
              {featuredCharacters.map((character) => (
                <button
                  key={character.id}
                  onClick={() => handleCharacterClick(character)}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Character image */}
                  <div className="aspect-[9/14] w-full">
                    <img
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/90 to-transparent">
                    <h4 className="text-white font-semibold text-base text-left">{character.name}</h4>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === "Male" && (
            <div className="grid grid-cols-2 gap-3">{/* Placeholder for Male tab content */}</div>
          )}

          {activeTab === "Female" && (
            <div className="grid grid-cols-2 gap-3">{/* Placeholder for Female tab content */}</div>
          )}

          {activeTab === "Dynamic" && (
            <div className="grid grid-cols-2 gap-3">{/* Placeholder for Dynamic tab content */}</div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] bg-black border-t border-[#1a0f2e] z-1000">
        <div className="flex items-center justify-around py-3 px-4 bg-[#0a0613]">
          <button className="text-white">
            <Home className="w-6 h-6" />
          </button>
          <button className="text-gray-400">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="text-gray-400">
            <Plus className="w-6 h-6" />
          </button>
          <button className="text-gray-400">
            <Grid className="w-6 h-6" />
          </button>
          <button className="text-gray-400">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
