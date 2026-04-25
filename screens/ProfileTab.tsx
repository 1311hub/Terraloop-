"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { User, Settings, Award, Moon, Sun, LogOut, ChevronRight, RefreshCw } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfileTab() {
  const { theme, setTheme } = useTheme()
  const [userName, setUserName] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    setUserName(localStorage.getItem("terraloop_name") || "Guest")
    setRole(localStorage.getItem("terraloop_role") || "buyer")
  }, [])

  const handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="flex flex-col px-6 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Profile</h1>

      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <User className="h-8 w-8 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{userName}</h2>
          <p className="text-sm text-muted-foreground capitalize">{role} Account</p>
        </div>
      </div>

      {/* Gamification Badges */}
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Your Badges</h3>
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-2xl">🌱</span>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 text-center">Waste<br/>Warrior</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <span className="text-2xl">🤝</span>
          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 text-center">Local<br/>Supporter</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <span className="text-2xl">🌍</span>
          <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 text-center">Eco<br/>Saver</span>
        </div>
      </div>

      {/* Settings List */}
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Settings</h3>
      <Card className="border-border bg-card overflow-hidden mb-8">
        <div 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center justify-between p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
            <span className="font-medium text-foreground">Dark Mode</span>
          </div>
          <div className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Toggle</div>
        </div>
        <div className="flex items-center justify-between p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Account Settings</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <div 
          onClick={handleReset}
          className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="h-5 w-5 text-amber-500" />
            <span className="font-medium text-amber-600 dark:text-amber-400">Reset Setup (Demo)</span>
          </div>
        </div>
      </Card>

      <Button variant="outline" className="w-full h-12 text-destructive border-destructive/20 hover:bg-destructive/10">
        <LogOut className="h-4 w-4 mr-2" /> Log Out
      </Button>
    </div>
  )
}
