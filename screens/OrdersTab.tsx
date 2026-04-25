"use client"

import { useState, useEffect } from "react"
import { Package, TrendingUp, IndianRupee, Edit2, Trash2, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OrdersTab() {
  const [role, setRole] = useState("buyer")

  useEffect(() => {
    setRole(localStorage.getItem("terraloop_role") || "buyer")
  }, [])

  if (role === "buyer") {
    return (
      <div className="flex flex-col px-6 py-8 h-full">
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Orders</h1>
        <div className="flex flex-1 flex-col items-center justify-center text-center opacity-50">
          <Package className="h-16 w-16 mb-4 text-muted-foreground" />
          <h2 className="text-lg font-medium text-foreground">No orders yet</h2>
          <p className="text-sm text-muted-foreground mt-2">Start exploring local deals to see them here.</p>
        </div>
      </div>
    )
  }

  // Seller Dashboard
  return (
    <div className="flex flex-col px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
          <Plus className="h-4 w-4 mr-1" /> Add Listing
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-4 border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <IndianRupee className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Earnings</span>
          </div>
          <div className="text-2xl font-bold text-foreground">₹4,250</div>
          <div className="text-xs text-emerald-500 font-medium mt-1 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> +12% this week
          </div>
        </Card>
        <Card className="p-4 border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Active</span>
          </div>
          <div className="text-2xl font-bold text-foreground">8 Items</div>
          <div className="text-xs text-muted-foreground font-medium mt-1">
            2 pending orders
          </div>
        </Card>
      </div>

      <h2 className="text-lg font-bold text-foreground mb-4">Your Listings</h2>
      <div className="flex flex-col gap-4">
        {[
          { id: 1, name: "Organic Tomatoes", price: "₹40/kg", stock: "12 kg", status: "Active" },
          { id: 2, name: "Fresh Spinach", price: "₹20/bunch", stock: "5 bunches", status: "Low Stock" },
        ].map(item => (
          <Card key={item.id} className="p-4 border-border bg-card shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground">{item.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span>{item.price}</span>
                <span>•</span>
                <span className={item.status === "Low Stock" ? "text-amber-500" : ""}>{item.stock}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="h-8 w-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                <Edit2 className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
