"use client"

import { useState } from "react"
import { Home, Scan, ListOrdered, User } from "lucide-react"
import HomeTab from "./HomeTab"
import ScanFeature from "./ScanFeature"
import OrdersTab from "./OrdersTab"
import ProfileTab from "./ProfileTab"

type Tab = "home" | "scan" | "orders" | "profile"

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home")

  return (
    <div className="flex flex-col h-full w-full bg-background transition-colors duration-300 relative">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === "home" && <HomeTab onNavigateToScan={() => setActiveTab("scan")} />}
        {activeTab === "scan" && <ScanFeature onBack={() => setActiveTab("home")} />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "profile" && <ProfileTab />}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="absolute bottom-0 w-full border-t border-border bg-card/80 backdrop-blur-md px-6 py-4 flex justify-between items-center z-50">
        <button 
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "home" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button 
          onClick={() => setActiveTab("scan")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "scan" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
        >
          <div className={`p-3 rounded-full -mt-8 shadow-lg transition-transform hover:scale-105 active:scale-95 ${activeTab === "scan" ? "bg-emerald-500 text-white" : "bg-emerald-600 text-white"}`}>
            <Scan className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-medium">Scan</span>
        </button>

        <button 
          onClick={() => setActiveTab("orders")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "orders" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
        >
          <ListOrdered className="h-6 w-6" />
          <span className="text-[10px] font-medium">Listings</span>
        </button>

        <button 
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "profile" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
        >
          <User className="h-6 w-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </div>
  )
}
