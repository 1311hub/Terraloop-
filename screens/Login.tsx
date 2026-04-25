"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, ArrowRight, Phone, Mail, ShieldCheck, User } from "lucide-react"

interface LoginProps {
  onComplete: (name: string) => void
}

export default function Login({ onComplete }: LoginProps) {
  const [step, setStep] = useState<"contact" | "otp" | "name">("contact")
  const [contact, setContact] = useState("")
  const [otp, setOtp] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact.trim()) {
      setError("Please enter a valid phone or email.")
      return
    }
    setError("")
    setStep("otp")
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 4) {
      setError("Please enter a valid OTP.")
      return
    }
    setError("")
    setStep("name")
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please enter your name.")
      return
    }
    setError("")
    onComplete(name)
  }

  return (
    <div className="flex h-full w-full flex-col bg-background px-6 py-12 transition-colors duration-300 overflow-y-auto no-scrollbar pb-8">
      {/* Back Button / Header area */}
      {step === "otp" && (
        <button 
          onClick={() => setStep("contact")}
          className="self-start text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back
        </button>
      )}

      <div className="flex flex-1 flex-col items-center justify-center max-w-sm mx-auto w-full">
        {/* Logo & Tagline */}
        <div className="mb-10 w-full text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
            Welcome to Terraloop
          </h1>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 py-2 px-4 rounded-full inline-block">
            Closing the loop between buyers & growers
          </p>
        </div>

        {/* Forms */}
        <div className="w-full bg-card p-8 rounded-3xl shadow-xl shadow-black/5 border border-border">
          {step === "contact" ? (
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact" className="text-foreground font-semibold ml-1">
                  Phone or Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    {contact.includes("@") ? <Mail className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                  </div>
                  <Input
                    id="contact"
                    type="text"
                    placeholder="Enter your details"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="h-14 pl-10 rounded-xl bg-muted/50 border-border focus-visible:ring-emerald-500 text-lg"
                  />
                </div>
                {error && <p className="text-destructive text-xs font-medium ml-1 mt-1">{error}</p>}
              </div>

              <Button 
                type="submit"
                className="h-14 w-full rounded-xl bg-emerald-600 text-primary-foreground text-lg font-semibold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all mt-2"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          ) : step === "otp" ? (
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
              <div className="mb-2">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" /> Verify it's you
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We sent a code to <span className="font-semibold text-foreground">{contact}</span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="otp" className="text-foreground font-semibold ml-1">
                  One-Time Password (OTP)
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="e.g. 1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  className="h-14 rounded-xl bg-muted/50 border-border focus-visible:ring-emerald-500 text-center text-2xl tracking-widest font-bold"
                />
                {error && <p className="text-destructive text-xs font-medium ml-1 mt-1">{error}</p>}
              </div>

              <Button 
                type="submit"
                className="h-14 w-full rounded-xl bg-emerald-600 text-primary-foreground text-lg font-semibold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all mt-2"
              >
                Verify
              </Button>
            </form>
          ) : (
            <form onSubmit={handleNameSubmit} className="flex flex-col gap-5">
              <div className="mb-2">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-500" /> What should we call you?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Personalize your experience.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-foreground font-semibold ml-1">
                  Your Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 rounded-xl bg-muted/50 border-border focus-visible:ring-emerald-500 text-lg"
                />
                {error && <p className="text-destructive text-xs font-medium ml-1 mt-1">{error}</p>}
              </div>

              <Button 
                type="submit"
                className="h-14 w-full rounded-xl bg-emerald-600 text-primary-foreground text-lg font-semibold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all mt-2"
              >
                Complete Setup
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
