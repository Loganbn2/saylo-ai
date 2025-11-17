"use client"

import { useState, useEffect } from "react"
import { Shuffle } from "lucide-react"

interface UnoGameProps {
  characterImage?: string
  characterName?: string
}

const UnoGame = ({ characterImage = "/images/design-mode/funnybones(2).avif", characterName = "Queen" }: UnoGameProps) => {
  const colors = ["#8b3a1f", "#1e3a5f", "#2d5a2d", "#b8860b"]
  const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Skip", "Reverse", "+2"]

  const createDeck = () => {
    const deck = []
    colors.forEach((color) => {
      values.forEach((value) => {
        deck.push({ color, value, id: Math.random() })
        if (value !== "0") deck.push({ color, value, id: Math.random() })
      })
    })
    for (let i = 0; i < 4; i++) {
      deck.push({ color: "wild", value: "Wild", id: Math.random() })
      deck.push({ color: "wild", value: "Wild+4", id: Math.random() })
    }
    return deck.sort(() => Math.random() - 0.5)
  }

  const [deck, setDeck] = useState(createDeck())
  const [playerHand, setPlayerHand] = useState([])
  const [computerHand, setComputerHand] = useState([])
  const [discardPile, setDiscardPile] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState("player")
  const [direction, setDirection] = useState(1)
  const [message, setMessage] = useState("")
  const [selectedWildColor, setSelectedWildColor] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [waitingForColorChoice, setWaitingForColorChoice] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [gojuMessage, setGojuMessage] = useState("")
  const [userTurnCount, setUserTurnCount] = useState(0)
  const [isQueen, setIsQueen] = useState(false)

  useEffect(() => {
    startGame()
  }, [])

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

  const startGame = () => {
    const newDeck = createDeck()
    const playerCards = newDeck.splice(0, 7)
    const computerCards = newDeck.splice(0, 7)
    const firstCard = newDeck.pop()

    setDeck(newDeck)
    setPlayerHand(playerCards)
    setComputerHand(computerCards)
    setDiscardPile([firstCard])
    setCurrentPlayer("player")
    setDirection(1)
    setMessage("Your turn.")
    setGameOver(false)
    setSelectedWildColor(null)
    setWaitingForColorChoice(false)
    const queenGreetings = [
      "Let's play, shall we?",
      "I do hope you can keep up...",
      "Show me what you've got, love.",
      "How delightful... your turn, dear.",
    ]
    setGojuMessage(queenGreetings[Math.floor(Math.random() * queenGreetings.length)])
    setShowTyping(true)
    setShowMessage(false)
    setUserTurnCount(0)
  }

  const getCardColor = (card) => {
    if (card.color === "wild") return "black"
    return card.color
  }

  const getCardDisplay = (card) => {
    if (card.value === "Wild+4") return "+4"
    if (card.value === "Wild") return "W"
    if (card.value === "Reverse") return "⇄"
    if (card.value === "Skip") return "S"
    return card.value
  }

  const canPlayCard = (card, topCard) => {
    if (card.color === "wild") return true
    if (selectedWildColor && card.color === selectedWildColor) return true
    return card.color === topCard.color || card.value === topCard.value
  }

  const drawCards = (count) => {
    const newDeck = [...deck]
    const drawnCards = []

    for (let i = 0; i < count; i++) {
      if (newDeck.length === 0) {
        const reshuffled = [...discardPile.slice(0, -1)].sort(() => Math.random() - 0.5)
        newDeck.push(...reshuffled)
        setDiscardPile([discardPile[discardPile.length - 1]])
      }
      if (newDeck.length > 0) {
        drawnCards.push(newDeck.pop())
      }
    }

    setDeck(newDeck)
    return drawnCards
  }

  const switchTurn = (toPlayer, delayMs = 1000) => {
    setTimeout(() => {
      setCurrentPlayer(toPlayer)
    }, delayMs)
  }

  const playCard = (card, isPlayer) => {
    if (isPlayer) {
      setUserTurnCount((prev) => {
        const newCount = prev + 1
        if (newCount === 2) {
          const reactions = [
            "You're testing my patience, darling...",
            "Interesting strategy, but I expected better.",
            "My, you're bold, aren't you?",
          ]
          setGojuMessage(reactions[Math.floor(Math.random() * reactions.length)])
          setShowTyping(true)
        }
        return newCount
      })
    }

    const newDiscard = [...discardPile, card]
    setDiscardPile(newDiscard)

    const newPlayerHand = isPlayer ? playerHand.filter((c) => c.id !== card.id) : playerHand
    const newComputerHand = !isPlayer ? computerHand.filter((c) => c.id !== card.id) : computerHand

    setPlayerHand(newPlayerHand)
    setComputerHand(newComputerHand)

    if (newPlayerHand.length === 0) {
      setMessage("🎉 You won!")
      setGameOver(true)
      return
    } else if (newComputerHand.length === 0) {
      setMessage("I win.")
      setGameOver(true)
      return
    }

    if (card.color === "wild") {
      if (isPlayer) {
        if (card.value === "Wild+4") {
          const drawnCards = drawCards(4)
          setComputerHand([...newComputerHand, ...drawnCards])
          setMessage("You drew 4 cards. Choose a color.")
        } else {
          setMessage("Pick a color.")
        }
        setWaitingForColorChoice(true)
        return
      } else {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        setSelectedWildColor(randomColor)

        if (card.value === "Wild+4") {
          const drawnCards = drawCards(4)
          setPlayerHand([...newPlayerHand, ...drawnCards])
          setMessage("Draw four cards. Your turn.")
          switchTurn("computer", 1500)
        } else {
          const colorChoices = [
            "This color suits me better.",
            "I prefer this shade, actually.",
            "More befitting of royalty.",
          ]
          setGojuMessage(colorChoices[Math.floor(Math.random() * colorChoices.length)])
          setShowTyping(true)
          switchTurn("player", 1000)
        }
        return
      }
    }

    setSelectedWildColor(null)

    if (card.value === "Skip") {
      if (isPlayer) {
        const skipMessages = [
          "You're skipped, darling.",
          "How fortunate for me... your turn is over.",
        ]
        setGojuMessage(skipMessages[Math.floor(Math.random() * skipMessages.length)])
        setShowTyping(true)
        setMessage("")
        switchTurn("player", 1000)
      } else {
        setMessage("You were skipped.")
        switchTurn("computer", 1000)
      }
      return
    }

    if (card.value === "Reverse") {
      setDirection(direction * -1)
      if (isPlayer) {
        setMessage("Direction reversed. Your turn again.")
        switchTurn("player", 1000)
      } else {
        const reverseMessages = [
          "The tides have turned... against you.",
          "Everything's backwards now... how fitting.",
        ]
        setGojuMessage(reverseMessages[Math.floor(Math.random() * reverseMessages.length)])
        setShowTyping(true)
        setMessage("")
        switchTurn("computer", 1000)
      }
      return
    }

    if (card.value === "+2") {
      const drawnCards = drawCards(2)
      if (isPlayer) {
        setComputerHand([...newComputerHand, ...drawnCards])
        setMessage("Draw two cards. Your turn again.")
        switchTurn("player", 1000)
      } else {
        setPlayerHand([...newPlayerHand, ...drawnCards])
        setMessage("Draw two cards.")
        switchTurn("computer", 1000)
      }
      return
    }

    if (isPlayer) {
      const queenTurns = [
        "My turn now...",
        "How delightful, my turn.",
        "Step aside, it's my turn.",
      ]
      setGojuMessage(queenTurns[Math.floor(Math.random() * queenTurns.length)])
      setShowTyping(true)
      setMessage("")
      switchTurn("computer", 1000)
    } else {
      setMessage("Your turn.")
      switchTurn("player", 1000)
    }
  }

  const handlePlayerCardClick = (card) => {
    if (currentPlayer !== "player" || gameOver || waitingForColorChoice) return

    const topCard = discardPile[discardPile.length - 1]
    if (canPlayCard(card, topCard)) {
      playCard(card, true)
    } else {
      setMessage("Can't play that card!")
    }
  }

  const handlePlayerDraw = () => {
    if (currentPlayer !== "player" || gameOver || waitingForColorChoice) return
    const card = drawCards(1)[0]
    setPlayerHand([...playerHand, card])
    setMessage("Card drawn.")
    switchTurn("computer", 500)
  }

  const handleWildColorSelect = (color) => {
    setSelectedWildColor(color)
    setWaitingForColorChoice(false)

    const lastCard = discardPile[discardPile.length - 1]
    setMessage("Color chosen.")
    switchTurn("computer", 500)
  }

  useEffect(() => {
    if (currentPlayer === "computer" && !gameOver && !waitingForColorChoice) {
      setTimeout(() => {
        const topCard = discardPile[discardPile.length - 1]
        const playableCards = computerHand.filter((card) => {
          if (!canPlayCard(card, topCard)) return false
          if (card.color === "wild") return false
          if (card.value === "Skip" || card.value === "Reverse" || card.value === "+2") return false
          return true
        })

        if (playableCards.length > 0) {
          const cardToPlay = playableCards[0]
          playCard(cardToPlay, false)
        } else {
          const card = drawCards(1)[0]
          setComputerHand([...computerHand, card])
          setMessage("Card drawn.")
          switchTurn("player", 500)
        }
      }, 1500)
    }
  }, [currentPlayer, gameOver, waitingForColorChoice])

  const topCard = discardPile[discardPile.length - 1]

  return (
    <div
      className="flex flex-col items-center justify-between h-full p-4 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2b1a15 0%, #3d2520 50%, #2b1a15 100%)",
      }}
    >
      {!gameOver && (
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
                  <div
                    className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              ) : (
                <p className="text-sm font-semibold">{gojuMessage}</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 flex-wrap justify-center mb-3">
        {computerHand.map((card, i) => (
          <div key={card.id} className="w-9 h-13 bg-gradient-to-br from-amber-800 to-amber-950 rounded-lg border-2 border-amber-600 shadow-lg" />
        ))}
        <div className="text-amber-200 ml-3 self-center font-bold text-sm drop-shadow-lg">{computerHand.length}</div>
      </div>

      <div className="text-amber-100 text-center mb-3 min-h-6 font-bold font-sans text-lg drop-shadow-lg">{message}</div>

      <div className="flex flex-col items-center mb-4 gap-2 w-full max-w-fit">
        <div className="rounded-3xl p-4 shadow-2xl flex items-center gap-4 bg-gradient-to-r from-amber-900 to-amber-800 border-2 border-amber-700">
          <div
            onClick={handlePlayerDraw}
            className="w-16 h-24 bg-gradient-to-br from-amber-800 to-amber-950 rounded-xl border-3 border-amber-600 shadow-xl flex items-center justify-center cursor-pointer hover:from-amber-700 hover:to-amber-900 transition transform hover:scale-105"
          >
            <Shuffle className="text-amber-400" size={28} />
          </div>

          <img src="https://storage.googleapis.com/simula-public/assets/mockups/uno.png" alt="UNO" className="object-contain size-24 drop-shadow-lg rounded-lg" />

          {topCard && (
            <div
              className="w-16 h-24 rounded-xl border-3 border-amber-600 shadow-xl flex flex-col items-center justify-center font-bold text-3xl border-2"
              style={{
                backgroundColor: selectedWildColor || getCardColor(topCard),
                boxShadow: "0 0 20px rgba(180, 83, 9, 0.4)",
              }}
            >
              <span className="text-white drop-shadow-lg font-black">{getCardDisplay(topCard)}</span>
            </div>
          )}
        </div>

        <button className="w-full px-6 py-2 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 font-semibold text-sm rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 transition transform hover:scale-105 border border-amber-600 drop-shadow-lg">
          Download on App Store
        </button>
      </div>

      {waitingForColorChoice && (
        <div className="flex gap-3 mb-3 bg-amber-900/60 px-4 py-3 rounded-2xl border border-amber-700">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleWildColorSelect(color)}
              className="w-12 h-12 rounded-full border-3 border-amber-600 shadow-lg hover:scale-125 transition transform"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 15px rgba(180, 83, 9, 0.5)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="flex gap-2 flex-wrap justify-center max-w-full mb-2">
        {playerHand.map((card) => (
          <div
            key={card.id}
            onClick={() => handlePlayerCardClick(card)}
            className="w-14 h-20 rounded-lg border-3 border-amber-600 shadow-xl flex flex-col items-center justify-center font-bold text-2xl cursor-pointer hover:scale-110 hover:shadow-2xl transition transform"
            style={{
              backgroundColor: getCardColor(card),
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)",
            }}
          >
            <span className="text-white drop-shadow-lg">{getCardDisplay(card)}</span>
          </div>
        ))}
      </div>

      {gameOver && (
        <button
          onClick={startGame}
          className="px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 font-bold text-base rounded-xl shadow-xl hover:from-amber-600 hover:to-amber-700 transition transform hover:scale-105 border border-amber-600"
        >
          ♛ New Game ♛
        </button>
      )}
    </div>
  )
}

export default UnoGame
