"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Wheat, CheckCircle2 } from "lucide-react"

interface RoleSelectProps {
  onComplete: (role: string) => void
}

const ROLES = [
  {
    id: "buyer",
    title: "Buyer",
    description: "Find fresh, affordable produce in your neighborhood.",
    icon: ShoppingCart,
    color: "from-emerald-400 to-emerald-600",
    bg: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-500",
  },
  {
    id: "seller",
    title: "Grocer / Seller",
    description: "Sell surplus produce easily and connect with local buyers.",
    icon: Wheat,
    color: "from-amber-400 to-amber-600",
    bg: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-500",
  },
]

export default function RoleSelect({ onComplete }: RoleSelectProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleContinue = () => {
    if (selectedRole) {
      onComplete(selectedRole)
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-background transition-colors duration-300 px-6 py-12 overflow-y-auto no-scrollbar pb-8">
      <div className="flex flex-1 flex-col items-center justify-center max-w-md mx-auto w-full">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            How will you use Terraloop?
          </h1>
          <p className="text-base text-muted-foreground">
            Choose your primary role. You can switch later.
          </p>
        </div>

        {/* Roles */}
        <div className="flex w-full flex-col gap-5 mb-10">
          {ROLES.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id
            const baseColorClass = role.color.split('-')[1] // emerald, amber
            
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border-2 p-8 text-center transition-all duration-300 active:scale-[0.98] ${
                  isSelected 
                    ? `border-${baseColorClass}-500 bg-${baseColorClass}-500/10 shadow-lg` 
                    : "border-border bg-card hover:border-border/80 shadow-sm"
                }`}
              >
                {/* Active check indicator */}
                {isSelected && (
                  <div className="absolute right-4 top-4">
                    <CheckCircle2 className={`h-6 w-6 text-${baseColorClass}-600 dark:text-${baseColorClass}-400`} />
                  </div>
                )}

                <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-${baseColorClass}-500 shadow-md shadow-black/10 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-10 w-10 text-white" />
                </div>
                
                <div>
                  <h3 className={`text-2xl font-bold mb-2 ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                    {role.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground px-4 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Action Button */}
        <div className="w-full mt-auto sm:mt-0">
          <Button 
            onClick={handleContinue}
            disabled={!selectedRole}
            className="h-14 w-full rounded-xl bg-emerald-600 text-primary-foreground text-lg font-semibold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all mt-2 disabled:opacity-50 disabled:shadow-none"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}
