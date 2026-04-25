"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, MapPin, Leaf, TrendingUp, Award, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface HomeTabProps {
  onNavigateToScan: () => void
}

const DEALS = [
  { id: 1, name: "Organic Tomatoes", price: "₹40/kg", distance: "1.2 km", image: "🍅", eco: "Saved from waste" },
  { id: 2, name: "Fresh Spinach", price: "₹20/bunch", distance: "2.5 km", image: "🥬", eco: "Local farm" },
]

export default function HomeTab({ onNavigateToScan }: HomeTabProps) {
  const { theme, setTheme } = useTheme()
  const [userName, setUserName] = useState("")
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    setUserName(localStorage.getItem("terraloop_name") || "Guest")
    setLanguage(localStorage.getItem("terraloop_language") || "en")
  }, [])

  const getGreeting = () => {
    switch (language) {
      case "hi": return `नमस्ते, ${userName} 🙏`
      case "ta": return `வணக்கம், ${userName} 🙏`
      case "bn": return `নমস্কার, ${userName} 🙏`
      case "mr": return `नमस्कार, ${userName} 🙏`
      default: return `Hi, ${userName} 👋`
    }
  }

  return (
    <div className="flex flex-col px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">Welcome back</p>
          <h1 className="text-2xl font-bold text-foreground">{getGreeting()}</h1>
        </div>
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-all hover:scale-105 active:scale-95"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      {/* Gamification Card */}
      <Card className="mb-8 overflow-hidden border-border bg-card p-5 shadow-lg shadow-black/5 dark:shadow-none relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Award className="h-24 w-24 text-emerald-500" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Waste Warrior Badge</span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-bold text-foreground">450</span>
            <span className="text-sm text-muted-foreground mb-1 font-medium">Eco Points 🌱</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>Progress</span>
              <span>You saved 2.3 kg food this week</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Action Banner */}
      <div 
        onClick={onNavigateToScan}
        className="mb-8 flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 p-5 text-white shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-transform cursor-pointer"
      >
        <div>
          <h3 className="font-bold text-lg mb-1">Scan & Earn</h3>
          <p className="text-emerald-50 text-sm">Get +50 points for every scan</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <ChevronRight className="h-6 w-6" />
        </div>
      </div>

      {/* Nearby Deals */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Nearby Surplus Deals</h2>
        <button className="text-sm font-medium text-emerald-600 dark:text-emerald-400">View all</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x -mx-6 px-6 no-scrollbar">
        {DEALS.map(deal => (
          <Card key={deal.id} className="min-w-[200px] snap-start border-border bg-card p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="flex h-32 items-center justify-center rounded-xl bg-muted/50 mb-4 text-6xl">
              {deal.image}
            </div>
            <div className="mb-2">
              <span className="inline-block rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                {deal.eco}
              </span>
              <h3 className="font-bold text-foreground">{deal.name}</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{deal.price}</span>
              <div className="flex items-center text-xs text-muted-foreground font-medium">
                <MapPin className="h-3 w-3 mr-1" /> {deal.distance}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
