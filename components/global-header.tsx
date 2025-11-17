"use client"

import { Search, Bell } from "lucide-react"

export function GlobalHeader() {
  return (
    <div className="sticky top-0 z-50 w-screen flex items-center justify-between px-4 py-2 bg-[#0a0613]/40 backdrop-blur-sm ml-[calc(-50vw+50%)]">
      <div className="flex items-center gap-3">
        <img
          src="https://storage.googleapis.com/simula-public/assets/mockups/sayloImg.png"
          alt="Saylo"
          className="h-8 object-contain"
        />
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
  )
}
