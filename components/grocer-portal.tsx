"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Loader2, 
  Package, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Leaf,
  Plus,
  Trash2,
  Edit,
  Eye
} from "lucide-react"

interface ProductListing {
  id: string
  name: string
  image: string
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
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    category: "Vegetables",
    originalPrice: 3.49,
    discountedPrice: 1.99,
    quantity: 20,
    freshnessScore: 85,
    status: "active",
    expiresIn: "2 days",
  },
]

export function GrocerPortal() {
  const [listings, setListings] = useState<ProductListing[]>(SAMPLE_LISTINGS)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    originalPrice: "",
    discountedPrice: "",
    quantity: "",
    description: "",
  })

  // Calculate stats
  const totalListings = listings.length
  const totalSold = 156 // Mock data
  const expiringSoon = listings.filter(l => l.expiresIn.includes("1 day")).length
  const totalRevenue = 1248 // Mock data

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        // Simulate AI analysis
        simulateAIAnalysis()
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const simulateAIAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisResult(null)
    // Simulate AI processing time
    setTimeout(() => {
      const score = Math.floor(Math.random() * 25) + 75 // Random score 75-99
      setAnalysisResult(score)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmitListing = () => {
    if (!uploadedImage || !formData.name || !formData.category) return

    const newListing: ProductListing = {
      id: Date.now().toString(),
      name: formData.name,
      image: uploadedImage,
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
    setUploadedImage(null)
    setAnalysisResult(null)
    setFormData({
      name: "",
      category: "",
      originalPrice: "",
      discountedPrice: "",
      quantity: "",
      description: "",
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

        {/* Upload Form Modal */}
        {showUploadForm && (
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Add New Produce Listing</CardTitle>
                <CardDescription>Upload an image for AI freshness analysis</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Image Upload Section */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Product Image</Label>
                  
                  {!uploadedImage ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
                        isDragging 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileSelect(file)
                        }}
                      />
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="mt-4 text-sm font-medium text-foreground">
                        Drop your image here, or click to browse
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Image Preview */}
                      <div className="relative overflow-hidden rounded-xl border">
                        <img
                          src={uploadedImage}
                          alt="Uploaded produce"
                          className="aspect-video w-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => {
                            setUploadedImage(null)
                            setAnalysisResult(null)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* AI Analysis Result */}
                      <Card className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <Leaf className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">
                                AI Freshness Analysis
                              </p>
                              {isAnalyzing ? (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Analyzing image...
                                </div>
                              ) : analysisResult ? (
                                <div className="flex items-center gap-2">
                                  <Badge className={getFreshnessColor(analysisResult)}>
                                    Score: {analysisResult}%
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {analysisResult >= 90 ? "Excellent condition" : 
                                     analysisResult >= 75 ? "Good condition" : "Fair condition"}
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
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

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Add any additional details about the produce..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={resetForm} className="flex-1">
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitListing}
                      disabled={!uploadedImage || !formData.name || !formData.category || isAnalyzing}
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
                        src={listing.image}
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
                      <h3 className="font-semibold text-foreground">{listing.name}</h3>
                      <p className="text-sm text-muted-foreground">{listing.category}</p>
                      
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-lg font-bold text-primary">
                          ${listing.discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${listing.originalPrice.toFixed(2)}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Qty: {listing.quantity}
                        </span>
                        <span className="flex items-center gap-1 text-amber-600">
                          <Clock className="h-3 w-3" />
                          {listing.expiresIn}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteListing(listing.id)}
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-3 w-3" />
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
                  Upload your first surplus produce to get started
                </p>
                <Button 
                  onClick={() => setShowUploadForm(true)}
                  className="mt-4 gap-2 bg-primary text-primary-foreground"
                >
                  <Plus className="h-4 w-4" />
                  Add First Listing
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
