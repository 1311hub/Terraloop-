"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, ShoppingBasket, Leaf, ArrowLeft } from "lucide-react"
import { MarketplaceContent } from "@/components/marketplace/marketplace-content"

type SelectedRole = "none" | "grocer" | "user"

export function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<SelectedRole>("none")

  // If User Marketplace is selected, render the full MarketplaceContent
  if (selectedRole === "user") {
    return (
      <div className="min-h-screen bg-background">
        {/* Back button */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRole("none")}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Role Selector
            </Button>
          </div>
        </div>
        <MarketplaceContent />
      </div>
    )
  }

  // If Grocer Portal is selected, show placeholder message
  if (selectedRole === "grocer") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl text-foreground">Grocer Upload Interface</CardTitle>
            <CardDescription className="text-muted-foreground">
              Already Built - This is where grocers would upload their surplus produce.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-sm text-muted-foreground">
              The grocer upload functionality has been previously implemented. 
              This placeholder confirms the portal selection is working correctly.
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedRole("none")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Role Selector
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Default: Show the Role Selector card
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg border-0 shadow-xl">
        <CardHeader className="text-center pb-2">
          {/* Logo */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Leaf className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            TerraLoop MVP - Choose Your View
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Select how you want to use TerraLoop today
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Grocer Portal Option */}
            <button
              onClick={() => setSelectedRole("grocer")}
              className="group flex flex-col items-center rounded-xl border-2 border-border bg-card p-6 text-center transition-all hover:border-primary hover:bg-accent hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
                <Store className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-foreground">Grocer Portal</h3>
              <p className="text-sm text-muted-foreground">
                Upload and manage surplus produce
              </p>
            </button>

            {/* User Marketplace Option */}
            <button
              onClick={() => setSelectedRole("user")}
              className="group flex flex-col items-center rounded-xl border-2 border-border bg-card p-6 text-center transition-all hover:border-primary hover:bg-accent hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
                <ShoppingBasket className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-foreground">User Marketplace</h3>
              <p className="text-sm text-muted-foreground">
                Browse and purchase discounted produce
              </p>
            </button>
          </div>

          {/* Subtle footer note */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            This is a temporary gateway. Login functionality coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
