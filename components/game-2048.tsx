"use client"

import { useState, useEffect } from "react"
import { RotateCcw } from "lucide-react"

const Game2048 = () => {
  const [board, setBoard] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    initGame()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || animating) return

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
        handleMove(e.key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [board, gameOver, animating])

  useEffect(() => {
    let touchStartX = 0
    let touchStartY = 0

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (gameOver || animating) return

      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY

      const deltaX = touchEndX - touchStartX
      const deltaY = touchEndY - touchStartY

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 30) handleMove("ArrowRight")
        else if (deltaX < -30) handleMove("ArrowLeft")
      } else {
        if (deltaY > 30) handleMove("ArrowDown")
        else if (deltaY < -30) handleMove("ArrowUp")
      }
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [board, gameOver, animating])

  const initGame = () => {
    const newBoard = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0))
    addNewTile(newBoard)
    addNewTile(newBoard)
    setBoard(newBoard)
    setScore(0)
    setGameOver(false)
    setWon(false)
  }

  const addNewTile = (currentBoard) => {
    const emptyCells = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) {
          emptyCells.push({ row: i, col: j })
        }
      }
    }

    if (emptyCells.length > 0) {
      const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      currentBoard[row][col] = Math.random() < 0.9 ? 2 : 4
    }
  }

  const moveAndMergeRow = (row) => {
    const newRow = row.filter((cell) => cell !== 0)
    let addedScore = 0

    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] = newRow[i] * 2
        addedScore += newRow[i]
        newRow.splice(i + 1, 1)
      }
    }

    while (newRow.length < 4) {
      newRow.push(0)
    }

    return { row: newRow, score: addedScore }
  }

  const handleMove = (direction) => {
    const newBoard = board.map((row) => [...row])
    let totalScore = 0
    let moved = false

    if (direction === "ArrowLeft") {
      for (let i = 0; i < 4; i++) {
        const original = [...newBoard[i]]
        const { row, score } = moveAndMergeRow(newBoard[i])
        newBoard[i] = row
        totalScore += score
        if (JSON.stringify(original) !== JSON.stringify(row)) moved = true
      }
    } else if (direction === "ArrowRight") {
      for (let i = 0; i < 4; i++) {
        const original = [...newBoard[i]]
        const reversed = newBoard[i].reverse()
        const { row, score } = moveAndMergeRow(reversed)
        newBoard[i] = row.reverse()
        totalScore += score
        if (JSON.stringify(original) !== JSON.stringify(newBoard[i])) moved = true
      }
    } else if (direction === "ArrowUp") {
      for (let col = 0; col < 4; col++) {
        const column = [newBoard[0][col], newBoard[1][col], newBoard[2][col], newBoard[3][col]]
        const original = [...column]
        const { row, score } = moveAndMergeRow(column)
        for (let i = 0; i < 4; i++) {
          newBoard[i][col] = row[i]
        }
        totalScore += score
        if (JSON.stringify(original) !== JSON.stringify(row)) moved = true
      }
    } else if (direction === "ArrowDown") {
      for (let col = 0; col < 4; col++) {
        const column = [newBoard[0][col], newBoard[1][col], newBoard[2][col], newBoard[3][col]]
        const original = [...column]
        const reversed = column.reverse()
        const { row, score } = moveAndMergeRow(reversed)
        const finalRow = row.reverse()
        for (let i = 0; i < 4; i++) {
          newBoard[i][col] = finalRow[i]
        }
        totalScore += score
        if (JSON.stringify(original) !== JSON.stringify(finalRow)) moved = true
      }
    }

    if (moved) {
      setAnimating(true)
      setBoard(newBoard)
      setScore(score + totalScore)

      setTimeout(() => {
        addNewTile(newBoard)
        setBoard([...newBoard])
        setAnimating(false)

        if (newBoard.some((row) => row.includes(2048)) && !won) {
          setWon(true)
        }

        if (isGameOver(newBoard)) {
          setGameOver(true)
        }
      }, 150)
    }
  }

  const isGameOver = (grid) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) return false
        if (j < 3 && grid[i][j] === grid[i][j + 1]) return false
        if (i < 3 && grid[i][j] === grid[i + 1][j]) return false
      }
    }
    return true
  }

  const getTileColor = (value) => {
    const colors = {
      0: "bg-gray-200",
      2: "bg-amber-100",
      4: "bg-amber-200",
      8: "bg-orange-300",
      16: "bg-orange-400",
      32: "bg-orange-500",
      64: "bg-red-400",
      128: "bg-yellow-300",
      256: "bg-yellow-400",
      512: "bg-yellow-500",
      1024: "bg-yellow-600",
      2048: "bg-yellow-700",
    }
    return colors[value] || "bg-purple-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">2048</h1>
            <div className="text-right">
              <div className="text-sm text-gray-600">Score</div>
              <div className="text-2xl font-bold text-indigo-600">{score}</div>
            </div>
          </div>

          <div className="bg-gray-300 rounded-lg p-2 mb-4">
            {board.map((row, i) => (
              <div key={i} className="flex gap-2 mb-2 last:mb-0">
                {row.map((cell, j) => (
                  <div
                    key={j}
                    className={`w-full aspect-square ${getTileColor(cell)} rounded-lg flex items-center justify-center font-bold text-2xl transition-all duration-150 ${
                      cell === 0 ? "text-transparent" : cell > 512 ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {cell !== 0 && cell}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {won && !gameOver && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
              🎉 You won! Keep going!
            </div>
          )}

          {gameOver && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
              Game Over! Final Score: {score}
            </div>
          )}

          <button
            onClick={initGame}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw size={20} />
            New Game
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">Use arrow keys or swipe to play</div>

          <div className="mt-4 flex justify-center">
            <img
              src="/images/design-mode/image%20%287%29.png"
              alt="Get it on Google Play"
              className="cursor-pointer hover:opacity-80 transition-opacity h-[86px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game2048
