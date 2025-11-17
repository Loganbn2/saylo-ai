"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Search, Bell, Home, MessageCircle, Plus, Grid, User, UserPlus } from "lucide-react"
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
    image: "/character-business-suit.png",
    route: "/chat/duke-of-san-fran",
  },
  {
    id: 3,
    name: "MONOPOLY WORLD",
    username: "Play Now",
    description: "Build your empire! Buy properties, collect rent, and dominate the board.",
    chats: "Ad",
    image: "/monopoly-world-icon.png",
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
    image: "/happy-dogs-playing-park.jpg",
    route: "/chat/dog-park",
  },
  {
    id: 17,
    name: "Ape Tower Siege",
    username: "primatewars",
    description: "Lead the ape revolution in an epic skyscraper takeover",
    chats: "219.8k",
    image: "/gorilla-soldier-city-tower.jpg",
    route: "/chat/ape-tower-siege",
  },
  {
    id: 8,
    name: "Halloween Costume Party",
    username: "spookyhost",
    description: "Join the wildest costume party of the year with tricks and treats",
    chats: "127.4k",
    image: "/halloween-costume-party.jpg",
  },
  {
    id: 9,
    name: "Cozy Halloween Evening",
    username: "autumnvibes",
    description: "Curl up with pumpkin spice and spooky stories by the fireplace",
    chats: "93.8k",
    image: "/cozy-halloween-evening.jpg",
  },
]

const featuredCharacters: Character[] = [
  {
    id: 10,
    name: "Funny Bones",
    username: "skelecomedy",
    description: "Making sure every joke hits you to the bone!",
    chats: "292.4k",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/funnybones-ctRtKw1QP5Xv88z6ZWLN2cM3MTlaMU.avif",
    route: "/funny-bones/select", // Updated route to selection screen instead of direct chat
  },
  {
    id: 11,
    name: "Wonder Woman",
    username: "amazonian",
    description: "Warrior princess fighting for truth and justice",
    chats: "1.2m",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wonder-woman%20%281%29-qVv5G5Shq1tdwRRPMSitIhp2RzGalJ.png",
    route: "/chat/wonder-woman",
  },
  {
    id: 12,
    name: "Your HR Manager",
    username: "charles_the_man",
    description: "Is this termination... or just a performance review?",
    chats: "2.4m",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hr-manager-TACTViXYwMwTYqNNyH37s5TgrrdEVj.avif",
    route: "/chat/hr-manager",
  },
  {
    id: 13,
    name: "GenZombie",
    username: "angiiirl",
    description: "Undead influencer spreading chaos and viral trends",
    chats: "618.6k",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/genzombie-0XcHTk6PPMu6EdOSfYQ2It6ijCP2AI.png",
    route: "/chat/genzombie",
  },
  {
    id: 14,
    name: "Cyber Samurai",
    username: "neonblade",
    description: "Ancient warrior code meets digital warfare",
    chats: "234.5k",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1369890290-612x612-OIHtGHqyPByakh1Ml1sH3TlC8xLedF.jpg",
    route: "/chat/cyber-samurai",
  },
  {
    id: 15,
    name: "Gamer Guy",
    username: "pixelmaster",
    description: "Gaming enthusiast sharing epic gameplay",
    chats: "234.7k",
    image: "/gamer-guy-gaming-setup.jpg",
    route: "/chat/gamer-guy",
  },
]

interface HomePageProps {
  onCharacterSelect: () => void
}

export function HomePage({ onCharacterSelect }: HomePageProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("Featured")

  const handleCharacterClick = (character: Character) => {
    if (character.route) {
      router.push(character.route)
    } else if (!character.isAd) {
      onCharacterSelect()
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-zinc-900 text-white min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-xl">Character Chat App </h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-auto rounded-md font-medium px-3 py-1 text-xs">
            Get app
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white">
            <Search className="size-4" />
          </button>
          <button className="text-white relative">
            <Bell className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 px-4 py-4 overflow-x-auto scrollbar-hide">
        {["For You", "Featured", "Scenes", "Voices"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              if (tab !== "For You" && tab !== "Voices") {
                setActiveTab(tab)
              }
            }}
            className={`rounded-full font-medium whitespace-nowrap transition-colors text-xs px-5 py-1.5 ${
              activeTab === tab ? "bg-white text-black" : "bg-transparent text-white border border-zinc-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 px-4 pb-20 pr-2.5 pl-2.5">
        {activeTab === "Featured" && (
          <div className="grid grid-cols-2 gap-3">
            {featuredCharacters.map((character) => (
              <div key={character.id} className="flex flex-col">
                <button
                  onClick={() => handleCharacterClick(character)}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Character image */}
                  <div className="aspect-[3/4] w-full relative">
                    <img
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      className="w-full object-cover transition-all duration-300 group-hover:scale-110 h-[55%]"
                    />

                    {character.name === "Wonder Woman" && (
                      <div className="absolute bottom-[calc(45%+5px)] right-[5px] text-[10px] font-semibold rounded-md bg-zinc-600 text-background px-1.5 py-px">
                        Sponsored
                      </div>
                    )}

                    <div
                      className="absolute bottom-0 left-0 right-0 bg-zinc-800 p-3 py-2.5 px-2.5"
                      style={{ height: "45%" }}
                    >
                      <h4 className="text-white font-semibold mb-1 text-left leading-tight line-clamp-1 text-sm">
                        {character.name}
                      </h4>
                      <p className="text-gray-400 text-xs mb-2 text-left line-clamp-1 leading-tight">
                        {character.description}
                      </p>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <MessageCircle className="w-3 h-3" />
                        <span className="text-xs">{character.chats}</span>
                      </div>
                    </div>
                  </div>
                </button>
                {/* Author tag moved outside card */}
                <p className="text-gray-500 text-xs mt-2 text-left px-1">@{character.username}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "For You" && (
          <div className="grid grid-cols-2 gap-3">
            {characters.map((character) => (
              <button
                key={character.id}
                onClick={() => handleCharacterClick(character)}
                className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Character image */}
                <div className="aspect-[3/4] w-full">
                  <img
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <h4 className="text-white font-semibold text-base mb-1 text-left">{character.name}</h4>
                  <p className="text-gray-400 text-xs mb-2 text-left">{character.description}</p>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <MessageCircle className="w-3 h-3" />
                    <span>{character.chats}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1 text-left">@{character.username}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === "Scenes" && (
          <div className="grid grid-cols-2 gap-3">
            {scenesCharacters.map((character) => (
              <div key={character.id} className="flex flex-col">
                <button
                  onClick={() => handleCharacterClick(character)}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Character image */}
                  <div className="aspect-[3/4] w-full relative">
                    <img
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />

                    {character.name === "Monopoly World" && (
                      <div className="absolute bottom-[60px] left-[10px] text-[10px] font-semibold rounded-md bg-zinc-600 text-background px-1.5 py-px">
                        Sponsored
                      </div>
                    )}

                    {/* Content overlaid on image */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 py-2.5 px-2.5">
                      <h4 className="text-white font-semibold mb-2 text-left leading-tight text-sm">
                        {character.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-white text-xs">
                        <UserPlus className="w-3.5 h-3.5" />
                        <span className="text-xs">Select Character</span>
                      </div>
                    </div>
                  </div>
                </button>
                <p className="text-gray-500 text-xs mt-2 text-left px-1">@{character.username}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Voices" && (
          <div className="grid grid-cols-2 gap-3">{/* Placeholder for Voices tab content */}</div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 max-w-sm mx-auto">
        <div className="flex items-center justify-around py-3 px-4 bg-zinc-900">
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
