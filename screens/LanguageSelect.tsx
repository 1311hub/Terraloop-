"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tractor, ShoppingBag, Wheat, Sprout, Leaf } from "lucide-react"

interface LanguageSelectProps {
  onComplete: (language: string) => void
}

const LANGUAGES = [
  { id: "en", name: "English", icon: Wheat, color: "text-emerald-600", bg: "bg-emerald-100" },
  { id: "hi", name: "Hindi (हिंदी)", icon: Tractor, color: "text-amber-600", bg: "bg-amber-100" },
  { id: "ta", name: "Tamil (தமிழ்)", icon: Sprout, color: "text-purple-600", bg: "bg-purple-100" },
  { id: "bn", name: "Bengali (বাংলা)", icon: Leaf, color: "text-green-600", bg: "bg-green-100" },
  { id: "mr", name: "Marathi (मराठी)", icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-100" },
]

export default function LanguageSelect({ onComplete }: LanguageSelectProps) {
  const [selectedLang, setSelectedLang] = useState<string | null>(null)

  const handleContinue = () => {
    if (selectedLang) {
      onComplete(selectedLang)
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-background transition-colors duration-300 px-6 py-12 overflow-y-auto no-scrollbar pb-8">
      <div className="flex flex-1 flex-col items-center justify-center max-w-md mx-auto w-full">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            Choose Your Language
          </h1>
          <h2 className="text-xl font-medium text-muted-foreground font-sans">
            अपनी भाषा चुनें
          </h2>
          <p className="mt-4 text-sm text-muted-foreground opacity-80">
            You can always change this later in settings.
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
          {LANGUAGES.map((lang) => {
            const Icon = lang.icon
            const isSelected = selectedLang === lang.id
            const baseColorClass = lang.color.split('-')[1] // e.g., 'emerald'
            
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`relative flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200 active:scale-[0.98] ${
                  isSelected 
                    ? `border-${baseColorClass}-500 bg-${baseColorClass}-500/10 shadow-md` 
                    : "border-border bg-card hover:border-border/80 hover:bg-muted/50"
                }`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-${baseColorClass}-500/20`}>
                  <Icon className={`h-6 w-6 text-${baseColorClass}-500 dark:text-${baseColorClass}-400`} />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                    {lang.name}
                  </p>
                </div>
                {/* Radio indicator */}
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected ? `border-${baseColorClass}-500` : "border-muted-foreground/30"
                }`}>
                  {isSelected && <div className={`h-2.5 w-2.5 rounded-full bg-${baseColorClass}-500`} />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Action Button */}
        <div className="w-full mt-auto sm:mt-0">
          <Button 
            onClick={handleContinue}
            disabled={!selectedLang}
            className="h-14 w-full rounded-xl bg-emerald-600 text-primary-foreground text-lg font-semibold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all mt-2 disabled:opacity-50 disabled:shadow-none"
          >
            Continue / आगे बढ़ें
          </Button>
        </div>
      </div>
    </div>
  )
}
