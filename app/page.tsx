"use client"

import { useState, useEffect } from "react"
import Onboarding from "@/screens/Onboarding"
import LanguageSelect from "@/screens/LanguageSelect"
import Login from "@/screens/Login"
import RoleSelect from "@/screens/RoleSelect"
import MainApp from "@/screens/MainApp"
import { Loader2 } from "lucide-react"

type ScreenStep = "loading" | "onboarding" | "language" | "login" | "role" | "main"

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<ScreenStep>("loading")

  useEffect(() => {
    // Check if the user is already authenticated/setup
    const isSetup = localStorage.getItem("terraloop_setup_complete") === "true"
    if (isSetup) {
      setCurrentScreen("main")
    } else {
      setCurrentScreen("onboarding")
    }
  }, [])

  const handleOnboardingComplete = () => {
    setCurrentScreen("language")
  }

  const handleLanguageComplete = (language: string) => {
    localStorage.setItem("terraloop_language", language)
    setCurrentScreen("login")
  }

  const handleLoginComplete = (name: string) => {
    localStorage.setItem("terraloop_name", name)
    setCurrentScreen("role")
  }

  const handleRoleComplete = (role: string) => {
    localStorage.setItem("terraloop_role", role)
    localStorage.setItem("terraloop_setup_complete", "true")
    setCurrentScreen("main")
  }

  if (currentScreen === "loading") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  return (
    <main className="flex-1 w-full h-full relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {currentScreen === "onboarding" && <Onboarding onComplete={handleOnboardingComplete} />}
      {currentScreen === "language" && <LanguageSelect onComplete={handleLanguageComplete} />}
      {currentScreen === "login" && <Login onComplete={handleLoginComplete} />}
      {currentScreen === "role" && <RoleSelect onComplete={handleRoleComplete} />}
      {currentScreen === "main" && <MainApp />}
    </main>
  )
}