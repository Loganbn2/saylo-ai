"use client"

import { useState, useEffect } from "react"

export default function BlackjackGame({
  characterImage,
  characterName,
}: {
  characterImage: string
  characterName: string
}) {
  const suits = ["♠", "♥", "♦", "♣"]
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
  const dealerMessages = [
    "Let's play, shall we?",
    "I do hope you can keep up...",
    "Show me what you've got, love.",
    "How delightful... your turn, dear.",
  ]

  const getCardValue = (rank: string): number => {
    if (rank === "A") return 11
    if (["J", "Q", "K"].includes(rank)) return 10
    return parseInt(rank)
  }

  const [playerHand, setPlayerHand] = useState<string[]>([])
  const [dealerHand, setDealerHand] = useState<string[]>([])
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerScore, setDealerScore] = useState(0)
  const [gameStatus, setGameStatus] = useState<"betting" | "playing" | "ended">("betting")
  const [message, setMessage] = useState("Place your bet to start")
  const [bet, setBet] = useState(0)
  const [dealerMessage, setDealerMessage] = useState("")
  const [showTyping, setShowTyping] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

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

  const calculateScore = (hand: string[]) => {
    let score = 0
    let aces = 0
    for (const card of hand) {
      const rank = card.split("")[0]
      if (rank === "A") aces++
      score += getCardValue(rank)
    }
    while (score > 21 && aces > 0) {
      score -= 10
      aces--
    }
    return score
  }

  const startGame = (amount: number) => {
    if (amount <= 0) return
    setBet(amount)

    const newPlayerHand = [getRandomCard(), getRandomCard()]
    const newDealerHand = [getRandomCard(), getRandomCard()]

    setPlayerHand(newPlayerHand)
    setDealerHand(newDealerHand)
    setPlayerScore(calculateScore(newPlayerHand))
    setDealerScore(calculateScore([newDealerHand[0]]))
    setGameStatus("playing")
    setMessage("Hit or Stand?")

    const randomGreeting = dealerMessages[Math.floor(Math.random() * dealerMessages.length)]
    setDealerMessage(randomGreeting)
    setShowTyping(true)
  }

  const getRandomCard = () => {
    const suit = suits[Math.floor(Math.random() * suits.length)]
    const rank = ranks[Math.floor(Math.random() * ranks.length)]
    return rank + suit
  }

  const hit = () => {
    const newCard = getRandomCard()
    const newHand = [...playerHand, newCard]
    setPlayerHand(newHand)
    const newScore = calculateScore(newHand)
    setPlayerScore(newScore)

    if (newScore > 21) {
      setGameStatus("ended")
      setMessage("Bust! You lose!")
    }
  }

  const stand = () => {
    let newDealerHand = [...dealerHand]
    let dealerTotal = calculateScore(newDealerHand)

    while (dealerTotal < 17) {
      newDealerHand.push(getRandomCard())
      dealerTotal = calculateScore(newDealerHand)
    }

    setDealerHand(newDealerHand)
    setDealerScore(dealerTotal)

    determineWinner(playerScore, dealerTotal)
  }

  const determineWinner = (playerFinal: number, dealerFinal: number) => {
    setGameStatus("ended")

    if (dealerFinal > 21) {
      setMessage("Dealer busts! You win!")
    } else if (playerFinal > dealerFinal) {
      setMessage("You win!")
    } else if (dealerFinal > playerFinal) {
      setMessage("Dealer wins!")
    } else {
      setMessage("It's a push!")
    }
  }

  const resetGame = () => {
    setPlayerHand([])
    setDealerHand([])
    setPlayerScore(0)
    setDealerScore(0)
    setGameStatus("betting")
    setMessage("Place your bet to start")
    setBet(0)
  }

  const getCardDisplay = (card: string) => {
    const rank = card.split("")[0]
    const suit = card.split("")[1]
    return rank + suit
  }

  return (
    <div
      className="flex flex-col items-center justify-between h-full p-4 overflow-auto"
      style={{
        background: "linear-gradient(135deg, #2b1a15 0%, #3d2520 50%, #2b1a15 100%)",
      }}
    >
      {/* Dealer Area */}
      {gameStatus !== "betting" && (
        <div className="flex items-start gap-3 mb-4 w-full max-w-md">
          <img
            src={characterImage}
            alt={characterName}
            className="w-14 h-14 rounded-full object-cover border-4 border-amber-700 flex-shrink-0 shadow-lg"
          />

          {(showTyping || showMessage) && (
            <div className="relative bg-gradient-to-r from-amber-900 to-amber-800 text-amber-50 px-5 py-3 rounded-2xl rounded-tl-sm shadow-xl border border-amber-700">
              {showTyping ? (
                <div className="flex gap-2 items-center h-5">
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              ) : (
                <p className="text-sm font-semibold">{dealerMessage}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Dealer's Cards */}
      <div className="text-center mb-3">
        <p className="text-amber-200 font-bold text-sm mb-2">Dealer</p>
        <div className="flex gap-2 justify-center flex-wrap mb-1">
          {dealerHand.map((card, idx) => (
            <div
              key={idx}
              className="w-16 h-24 rounded-xl border-3 border-amber-600 shadow-xl flex items-center justify-center font-bold text-xl"
              style={{
                backgroundColor: "#8B4513",
              }}
            >
              <span className="text-white drop-shadow-lg">{gameStatus === "playing" && idx === 1 ? "?" : getCardDisplay(card)}</span>
            </div>
          ))}
        </div>
        {gameStatus !== "betting" && (
          <p className="text-amber-100 text-xs">
            Score: {gameStatus === "playing" && dealerHand.length > 1 ? "?" : dealerScore}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="text-amber-100 text-center mb-3 min-h-6 font-bold font-sans text-lg drop-shadow-lg">{message}</div>

      {/* Baba Casino CTA */}
      {gameStatus === "playing" && (
        <div className="relative mx-4 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-4 px-3 mb-4 w-full max-w-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img
                src="https://storage.googleapis.com/simula-public/assets/mockups/baba-casino.png"
                alt="Baba Casino"
                className="h-[94px] w-[94px] rounded-xl"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <h3 className="text-white font-bold text-sm">Baba Casino</h3>
              <p className="text-gray-300 text-xs leading-4">Experience the thrill of premium casino gaming.</p>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-between py-1 rounded-sm px-2.5">
                <span className="text-xs">Keep Playing</span>
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Player's Cards */}
      <div className="text-center mb-4">
        <p className="text-amber-200 font-bold text-sm mb-2">Your Hand {bet > 0 ? `(Bet: $${bet})` : ""}</p>
        <div className="flex gap-2 justify-center flex-wrap mb-1">
          {playerHand.map((card, idx) => (
            <div
              key={idx}
              className="w-16 h-24 rounded-xl border-3 border-amber-600 shadow-xl flex items-center justify-center font-bold text-xl"
              style={{
                backgroundColor: "#8B4513",
              }}
            >
              <span className="text-white drop-shadow-lg">{getCardDisplay(card)}</span>
            </div>
          ))}
        </div>
        {gameStatus !== "betting" && (
          <p className="text-amber-100 text-xs">Score: {playerScore}</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-2 w-full max-w-sm">
        {gameStatus === "betting" && (
          <div className="flex gap-2 flex-wrap justify-center">
            {[10, 25, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => startGame(amount)}
                className="bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 font-semibold text-sm rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 transition transform hover:scale-105 border border-amber-600 drop-shadow-lg px-4 py-2"
              >
                ${amount}
              </button>
            ))}
          </div>
        )}

        {gameStatus === "playing" && (
          <div className="flex gap-2">
            <button
              onClick={hit}
              className="flex-1 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 font-semibold text-sm rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 transition transform hover:scale-105 border border-amber-600 drop-shadow-lg py-2"
            >
              Hit
            </button>
            <button
              onClick={stand}
              className="flex-1 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 font-semibold text-sm rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 transition transform hover:scale-105 border border-amber-600 drop-shadow-lg py-2"
            >
              Stand
            </button>
          </div>
        )}

        {gameStatus === "ended" && (
          <button
            onClick={resetGame}
            className="w-full px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 font-bold text-base rounded-xl shadow-xl hover:from-amber-600 hover:to-amber-700 transition transform hover:scale-105 border border-amber-600"
          >
            ♛ New Game ♛
          </button>
        )}
      </div>
    </div>
  )
}
