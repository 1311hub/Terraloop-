"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Leaf, Users, Recycle, HeartHandshake } from "lucide-react"

interface OnboardingProps {
  onComplete: () => void
}

const ONBOARDING_STEPS = [
  {
    title: "Reconnect with Local, Sustainable Living",
    description: "Discover fresh, locally sourced produce while supporting sustainable farming practices in your community.",
    icon: Leaf,
    color: "from-emerald-400 to-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Meet the People Behind Your Food",
    description: "Connect directly with local farmers and grocers. Know exactly where your food comes from.",
    icon: Users,
    color: "from-amber-400 to-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "For the People, By the People",
    description: "Join a community-driven marketplace that prioritizes fair trade and mutual growth.",
    icon: HeartHandshake,
    color: "from-purple-400 to-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Zero Waste. Smart Buying.",
    description: "Help reduce food waste by purchasing surplus produce at affordable prices. Good for you, good for the planet.",
    icon: Recycle,
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-50",
  },
]

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const step = ONBOARDING_STEPS[currentStep]
  const Icon = step.icon

  return (
    <div className="flex h-full w-full flex-col bg-background transition-colors duration-300 overflow-y-auto no-scrollbar pb-8">
      {/* Skip Button */}
      <div className="flex justify-end p-6">
        <button 
          onClick={handleSkip}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
        {/* Dynamic Card */}
        <div 
          className={`relative flex w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-3xl p-8 text-center shadow-xl shadow-black/5 dark:shadow-none border border-border transition-all duration-500 bg-card`}
        >
          <div className="absolute inset-0 opacity-10 dark:opacity-20 transition-all duration-500 bg-current" style={{ color: `var(--${step.bg.split('-')[1]}-500)` }}></div>
          <div className={`relative z-10 mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-lg shadow-black/10`}>
            <Icon className="h-16 w-16 text-white" />
          </div>
          
          <h2 className="relative z-10 mb-4 text-2xl font-bold tracking-tight text-foreground">
            {step.title}
          </h2>
          <p className="relative z-10 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      </div>

      {/* Footer Area */}
      <div className="flex flex-col items-center p-8 pt-0">
        {/* Progress Dots */}
        <div className="mb-8 flex gap-2">
          {ONBOARDING_STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? "w-8 bg-emerald-600" 
                  : "w-2 bg-emerald-200 dark:bg-emerald-950"
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleNext}
          className="h-14 w-full max-w-sm rounded-2xl bg-emerald-600 text-primary-foreground text-lg font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-[0.98]"
        >
          {currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
