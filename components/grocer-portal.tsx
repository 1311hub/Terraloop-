"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Upload, 
  Camera,
  X, 
  Loader2, 
  Package, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Leaf,
  Plus,
  Trash2,
  RotateCcw
} from "lucide-react"

interface ImageSlot {
  id: string
  label: string
  file: string | null
}

interface ProductListing {
  id: string
  name: string
  images: string[]
  category: string
  originalPrice: number
  discountedPrice: number
  quantity: number
  freshnessScore: number | null
  status: "analyzing" | "active" | "sold"
  expiresIn: string
}

// Sample existing listings
const SAMPLE_LISTINGS: ProductListing[] = [
  {
    id: "1",
    name: "Fresh Organic Apples",
    images: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop"],
    category: "Fruits",
    originalPrice: 4.99,
    discountedPrice: 2.49,
    quantity: 50,
    freshnessScore: 92,
    status: "active",
    expiresIn: "3 days",
  },
  {
    id: "2",
    name: "Ripe Bananas Bundle",
    images: ["https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop"],
    category: "Fruits",
    originalPrice: 2.99,
    discountedPrice: 1.29,
    quantity: 30,
    freshnessScore: 78,
    status: "active",
    expiresIn: "1 day",
  },
  {
    id: "3",
    name: "Crisp Green Lettuce",
    images: ["https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop"],
    category: "Vegetables",
    originalPrice: 3.49,
    discountedPrice: 1.99,
    quantity: 20,
    freshnessScore: 85,
    status: "active",
    expiresIn: "2 days",
  },
]

const INITIAL_IMAGE_SLOTS: ImageSlot[] = [
  { id: "front", label: "Front", file: null },
  { id: "back", label: "Back", file: null },
  { id: "left", label: "Left Side", file: null },
  { id: "right", label: "Right Side", file: null },
]

export function GrocerPortal() {
  const [listings, setListings] = useState<ProductListing[]>(SAMPLE_LISTINGS)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>(INITIAL_IMAGE_SLOTS)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<number | null>(null)
  const [analysisStatus, setAnalysisStatus] = useState<string>("")
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    originalPrice: "",
    discountedPrice: "",
    quantity: "",
  })

  // Calculate stats
  const totalListings = listings.length
  const totalSold = 156 // Mock data
  const expiringSoon = listings.filter(l => l.expiresIn.includes("1 day")).length
  const totalRevenue = 1248 // Mock data

  const uploadedCount = imageSlots.filter(slot => slot.file !== null).length

  const handleFileSelect = useCallback((slotId: string, file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageSlots(prev => prev.map(slot => 
          slot.id === slotId ? { ...slot, file: e.target?.result as string } : slot
        ))
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const removeImage = (slotId: string) => {
    setImageSlots(prev => prev.map(slot => 
      slot.id === slotId ? { ...slot, file: null } : slot
    ))
    // Reset analysis if images change
    setAnalysisResult(null)
    setAnalysisStatus("")
  }

  const runAIAnalysis = () => {
    const uploadedImages = imageSlots.filter(slot => slot.file !== null)
    if (uploadedImages.length === 0) return

    setIsAnalyzing(true)
    setAnalysisResult(null)
    setAnalysisStatus("Analyzing images...")

    // Simulate AI processing with progress updates
    setTimeout(() => {
      setAnalysisStatus("Detecting produce quality...")
    }, 800)

    setTimeout(() => {
      setAnalysisStatus("Calculating freshness score...")
    }, 1600)

    setTimeout(() => {
      // Generate score based on number of images (more images = potentially higher accuracy)
      const baseScore = 70
      const bonusPerImage = 5
      const randomVariation = Math.floor(Math.random() * 10)
      const score = Math.min(99, baseScore + (uploadedImages.length * bonusPerImage) + randomVariation)
      
      setAnalysisResult(score)
      setAnalysisStatus("")
      setIsAnalyzing(false)
    }, 2500)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmitListing = () => {
    const uploadedImages = imageSlots.filter(slot => slot.file !== null).map(slot => slot.file as string)
    if (uploadedImages.length === 0 || !formData.name || !formData.category) return

    const newListing: ProductListing = {
      id: Date.now().toString(),
      name: formData.name,
      images: uploadedImages,
      category: formData.category,
      originalPrice: parseFloat(formData.originalPrice) || 0,
      discountedPrice: parseFloat(formData.discountedPrice) || 0,
      quantity: parseInt(formData.quantity) || 0,
      freshnessScore: analysisResult,
      status: "active",
      expiresIn: "5 days",
    }

    setListings(prev => [newListing, ...prev])
    resetForm()
  }

  const resetForm = () => {
    setShowUploadForm(false)
    setImageSlots(INITIAL_IMAGE_SLOTS)
    setAnalysisResult(null)
    setAnalysisStatus("")
    setFormData({
      name: "",
      category: "",
      originalPrice: "",
      discountedPrice: "",
      quantity: "",
    })
  }

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(l => l.id !== id))
  }

  const getFreshnessColor = (score: number) => {
    if (score >= 90) return "bg-primary text-primary-foreground"
    if (score >= 75) return "bg-amber-500 text-white"
    return "bg-destructive text-destructive-foreground"
  }

  const getFreshnessLabel = (score: number) => {
    if (score >= 90) return "Excellent condition"
    if (score >= 75) return "Good condition"
    return "Fair condition"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">TerraLoop</h1>
              <p className="text-xs text-muted-foreground">Grocer Dashboard</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowUploadForm(true)}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            New Listing
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-bold text-foreground">{totalListings}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Items Sold</p>
                <p className="text-2xl font-bold text-foreground">{totalSold}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold text-foreground">{expiringSoon}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-foreground">${totalRevenue}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Add New Produce Listing</CardTitle>
                <CardDescription>
                  Upload images from multiple angles for accurate AI freshness analysis
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Left Column: Multi-Angle Image Upload */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">
                      Multi-Angle Photo Capture
                    </Label>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Upload photos from 4 different angles for best accuracy
                    </p>
                  </div>

                  {/* 2x2 Image Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {imageSlots.map((slot) => (
                      <div key={slot.id} className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          {slot.label}
                        </Label>
                        {slot.file ? (
                          <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-primary/30 bg-muted">
                            <img
                              src={slot.file}
                              alt={`${slot.label} view`}
                              className="h-full w-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute right-2 top-2 h-8 w-8"
                              onClick={() => removeImage(slot.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div
                            onClick={() => fileInputRefs.current[slot.id]?.click()}
                            className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50"
                          >
                            <input
                              ref={(el) => { fileInputRefs.current[slot.id] = el }}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileSelect(slot.id, file)
                              }}
                            />
                            <Camera className="h-8 w-8 text-muted-foreground" />
                            <span className="mt-2 text-xs text-muted-foreground">
                              Click to upload
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Upload Progress */}
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      Images uploaded: <span className="font-medium text-foreground">{uploadedCount}/4</span>
                    </span>
                    {uploadedCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setImageSlots(INITIAL_IMAGE_SLOTS)}
                        className="gap-1 text-xs"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Reset All
                      </Button>
                    )}
                  </div>

                  {/* AI Analysis Section */}
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Leaf className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">AI Freshness Analysis</h4>
                          
                          {!isAnalyzing && !analysisResult && (
                            <div className="mt-2">
                              <p className="mb-3 text-sm text-muted-foreground">
                                {uploadedCount === 0 
                                  ? "Upload at least one image to analyze" 
                                  : `${uploadedCount} image(s) ready for analysis`
                                }
                              </p>
                              <Button
                                onClick={runAIAnalysis}
                                disabled={uploadedCount === 0}
                                className="gap-2"
                                size="sm"
                              >
                                <Upload className="h-4 w-4" />
                                Analyze Freshness
                              </Button>
                            </div>
                          )}

                          {isAnalyzing && (
                            <div className="mt-2 flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin text-primary" />
                              <span className="text-sm text-muted-foreground">
                                {analysisStatus}
                              </span>
                            </div>
                          )}

                          {analysisResult && !isAnalyzing && (
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <Badge className={`text-base px-4 py-1 ${getFreshnessColor(analysisResult)}`}>
                                <Leaf className="mr-1.5 h-4 w-4" />
                                {analysisResult}% {getFreshnessLabel(analysisResult)}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={runAIAnalysis}
                                className="gap-1 text-xs"
                              >
                                <RotateCcw className="h-3 w-3" />
                                Re-analyze
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column: Product Details Form */}
                <div className="space-y-5">
                  <div>
                    <Label className="text-base font-medium">Product Details</Label>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fill in the listing information
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Fresh Organic Apples"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fruits">Fruits</SelectItem>
                          <SelectItem value="Vegetables">Vegetables</SelectItem>
                          <SelectItem value="Grains">Grains</SelectItem>
                          <SelectItem value="Dairy">Dairy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="originalPrice">Original Price ($)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          step="0.01"
                          placeholder="4.99"
                          value={formData.originalPrice}
                          onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="discountedPrice">Discounted Price ($)</Label>
                        <Input
                          id="discountedPrice"
                          type="number"
                          step="0.01"
                          placeholder="2.49"
                          value={formData.discountedPrice}
                          onChange={(e) => handleInputChange("discountedPrice", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity Available</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="50"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={resetForm} className="flex-1">
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitListing}
                      disabled={uploadedCount === 0 || !formData.name || !formData.category || isAnalyzing}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Create Listing"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Active Listings</CardTitle>
            <CardDescription>Manage your surplus produce listings</CardDescription>
          </CardHeader>
          <CardContent>
            {listings.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                  <div 
                    key={listing.id} 
                    className="group relative overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={listing.images[0]}
                        alt={listing.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      {/* Freshness Badge */}
                      {listing.freshnessScore && (
                        <Badge 
                          className={`absolute left-2 top-2 ${getFreshnessColor(listing.freshnessScore)}`}
                        >
                          <Leaf className="mr-1 h-3 w-3" />
                          {listing.freshnessScore}%
                        </Badge>
                      )}
                      {/* Status Badge */}
                      <Badge 
                        variant="secondary"
                        className="absolute right-2 top-2"
                      >
                        {listing.status === "active" ? "Active" : listing.status}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-medium text-foreground">{listing.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{listing.category}</p>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-primary">
                            ${listing.discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${listing.originalPrice.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Qty: {listing.quantity}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t pt-3">
                        <span className="text-xs text-amber-600">
                          Expires in {listing.expiresIn}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => deleteListing(listing.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground">No listings yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Click &quot;New Listing&quot; to add your first produce item
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
