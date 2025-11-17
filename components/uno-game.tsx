"use client"

import { useState, useEffect } from "react"
import { Shuffle } from "lucide-react"

const UnoGame = () => {
  const colors = ["red", "blue", "green", "#c4a000"]
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
    setMessage("Your turn!")
    setGameOver(false)
    setSelectedWildColor(null)
    setWaitingForColorChoice(false)
    setGojuMessage("Let's rattle some bones!")
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
          setGojuMessage("I've got a bone to pick with your strategy!")
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
      setMessage("🎉 You win!")
      setGameOver(true)
      return
    } else if (newComputerHand.length === 0) {
      setMessage("Computer wins!")
      setGameOver(true)
      return
    }

    if (card.color === "wild") {
      if (isPlayer) {
        if (card.value === "Wild+4") {
          const drawnCards = drawCards(4)
          setComputerHand([...newComputerHand, ...drawnCards])
          setMessage("Computer draws 4! Choose a color!")
        } else {
          setMessage("Choose a color!")
        }
        setWaitingForColorChoice(true)
        return
      } else {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        setSelectedWildColor(randomColor)

        if (card.value === "Wild+4") {
          const drawnCards = drawCards(4)
          setPlayerHand([...newPlayerHand, ...drawnCards])
          setMessage("You draw 4 cards! Computer goes again!")
          switchTurn("computer", 1500)
        } else {
          setMessage("Computer chose a color! Your turn!")
          switchTurn("player", 1000)
        }
        return
      }
    }

    setSelectedWildColor(null)

    if (card.value === "Skip") {
      if (isPlayer) {
        setMessage("Funny Bones skipped! Your turn again!")
        switchTurn("player", 1000)
      } else {
        setMessage("You were skipped! Funny Bones goes again!")
        switchTurn("computer", 1000)
      }
      return
    }

    if (card.value === "Reverse") {
      setDirection(direction * -1)
      if (isPlayer) {
        setMessage("Direction reversed! Your turn again!")
        switchTurn("player", 1000)
      } else {
        setMessage("Direction reversed! Funny Bones goes again!")
        switchTurn("computer", 1000)
      }
      return
    }

    if (card.value === "+2") {
      const drawnCards = drawCards(2)
      if (isPlayer) {
        setComputerHand([...newComputerHand, ...drawnCards])
        setMessage("Funny Bones draws 2 cards! Your turn again!")
        switchTurn("player", 1000)
      } else {
        setPlayerHand([...newPlayerHand, ...drawnCards])
        setMessage("You draw 2 cards! Funny Bones goes again!")
        switchTurn("computer", 1000)
      }
      return
    }

    if (isPlayer) {
      setMessage("Funny Bones's turn!")
      switchTurn("computer", 1000)
    } else {
      setMessage("Your turn!")
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
    setMessage("Card drawn. Funny Bones's turn!")
    switchTurn("computer", 500)
  }

  const handleWildColorSelect = (color) => {
    setSelectedWildColor(color)
    setWaitingForColorChoice(false)

    const lastCard = discardPile[discardPile.length - 1]
    if (lastCard.value === "Wild+4") {
      setMessage("Color chosen! Funny Bones goes again!")
      switchTurn("computer", 500)
    } else {
      setMessage("Color chosen! Funny Bones's turn!")
      switchTurn("computer", 500)
    }
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
          setMessage("Funny Bones drew a card. Your turn!")
          switchTurn("player", 500)
        }
      }, 1500)
    }
  }, [currentPlayer, gameOver, waitingForColorChoice])

  const topCard = discardPile[discardPile.length - 1]

  return (
    <div
      className="flex flex-col items-center justify-between h-full p-2 overflow-hidden"
      style={{ backgroundColor: "#18181b" }}
    >
      {!gameOver && (
        <div className="flex items-start gap-2 mb-2 w-full max-w-md">
          <img
            src="/images/design-mode/funnybones(2).avif"
            alt="Funny Bones"
            className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700 flex-shrink-0"
          />

          {(showTyping || showMessage) && (
            <div className="relative bg-zinc-800 text-white px-4 py-2 rounded-2xl rounded-tl-sm shadow-lg">
              {showTyping ? (
                <div className="flex gap-1 items-center h-5">
                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
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
                <p className="text-sm font-medium">{gojuMessage}</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-1 flex-wrap justify-center mb-2">
        {computerHand.map((card, i) => (
          <div key={card.id} className="w-8 h-12 bg-gray-800 rounded border-2 border-white shadow-lg" />
        ))}
        <div className="text-white ml-2 self-center font-bold text-sm">{computerHand.length}</div>
      </div>

      <div className="text-white text-center mb-2 min-h-4 font-medium font-sans text-xl">{message}</div>

      <div className="flex flex-col items-center mb-3 gap-1">
        <div className="rounded-2xl p-3 shadow-2xl flex items-center gap-3 border-blue-700 border-0 shadow-lg bg-[rgba(24,24,27,1)]">
          <div
            onClick={handlePlayerDraw}
            className="w-16 h-24 bg-blue-900 rounded-lg border-3 border-white shadow-xl flex items-center justify-center cursor-pointer hover:bg-blue-800 transition"
          >
            <Shuffle className="text-white" size={24} />
          </div>

          <img src="/images/design-mode/7%20%282%29(1).png" alt="UNO! MOBILE" className="object-contain size-24" />

          {topCard && (
            <div
              className="w-16 h-24 rounded-lg border-3 border-white shadow-xl flex flex-col items-center justify-center font-bold text-2xl"
              style={{ backgroundColor: selectedWildColor || getCardColor(topCard) }}
            >
              <span className="text-white drop-shadow-lg">{getCardDisplay(topCard)}</span>
            </div>
          )}
        </div>

        <img
          src="/images/design-mode/7%20%283%29.png"
          alt="Download on the App Store"
          className="cursor-pointer hover:opacity-90 transition h-16"
        />
      </div>

      {waitingForColorChoice && (
        <div className="flex gap-2 mb-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleWildColorSelect(color)}
              className="w-10 h-10 rounded-full border-3 border-white shadow-lg hover:scale-110 transition"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}

      <div className="flex gap-1.5 flex-wrap justify-center max-w-full mb-1">
        {playerHand.map((card) => (
          <div
            key={card.id}
            onClick={() => handlePlayerCardClick(card)}
            className="w-14 h-20 rounded-lg border-3 border-white shadow-xl flex flex-col items-center justify-center font-bold text-2xl cursor-pointer hover:scale-105 transition transform"
            style={{ backgroundColor: getCardColor(card) }}
          >
            <span className="text-white drop-shadow-lg">{getCardDisplay(card)}</span>
          </div>
        ))}
      </div>

      {gameOver && (
        <button
          onClick={startGame}
          className="px-6 py-2 bg-yellow-500 text-black font-bold text-sm rounded-lg shadow-lg hover:bg-yellow-400 transition"
        >
          New Game
        </button>
      )}
    </div>
  )
}

export default UnoGame
