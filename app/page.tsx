"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Leaf, Loader2, ImageIcon, X, Clock, AlertTriangle, CheckCircle2, XCircle, Lightbulb } from "lucide-react"

interface AnalysisResult {
  rating: number
  consumeStatus: "YES" | "NO" | "PROCEED WITH CAUTION"
  shelfLife: string
  verdict: string
  alternativeUses: string[]
  fruitType: string
}

async function rescaleImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        reject(new Error("Could not get canvas context"))
        return
      }

      const maxWidth = 600
      let width = img.width
      let height = img.height

      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height

      ctx.drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.6)
      resolve(dataUrl)
    }

    img.onerror = () => {
      reject(new Error("Failed to load image"))
    }

    img.src = URL.createObjectURL(file)
  })
}

function getRatingColor(rating: number): { bg: string; bar: string; text: string } {
  if (rating >= 7) return { bg: "bg-emerald-50", bar: "bg-emerald-500", text: "text-emerald-700" }
  if (rating >= 4) return { bg: "bg-amber-50", bar: "bg-amber-500", text: "text-amber-700" }
  return { bg: "bg-red-50", bar: "bg-red-500", text: "text-red-700" }
}

function getStatusConfig(status: string): { icon: React.ReactNode; color: string; bg: string } {
  switch (status) {
    case "YES":
      return {
        icon: <CheckCircle2 className="h-4 w-4" />,
        color: "text-emerald-700",
        bg: "bg-emerald-100 border-emerald-200",
      }
    case "NO":
      return {
        icon: <XCircle className="h-4 w-4" />,
        color: "text-red-700",
        bg: "bg-red-100 border-red-200",
      }
    default:
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        color: "text-amber-700",
        bg: "bg-amber-100 border-amber-200",
      }
  }
}

function RatingGauge({ rating }: { rating: number }) {
  const colors = getRatingColor(rating)

  return (
    <div className={`rounded-xl p-6 ${colors.bg}`}>
      <div className="mb-2 text-sm font-medium text-muted-foreground">Freshness Rating</div>
      <div className="flex items-baseline gap-1">
        <span className={`text-5xl font-bold ${colors.text}`}>{rating}</span>
        <span className="text-2xl text-muted-foreground">/10</span>
      </div>
      <div className="mt-4">
        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${i < rating ? colors.bar : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config = getStatusConfig(status)

  return (
    <div className={`flex items-center gap-2 rounded-lg border px-4 py-3 ${config.bg}`}>
      <span className={config.color}>{config.icon}</span>
      <div>
        <div className="text-xs font-medium text-muted-foreground">Safe to Consume</div>
        <div className={`font-semibold ${config.color}`}>{status}</div>
      </div>
    </div>
  )
}

function QuickGlanceCard({ analysis }: { analysis: AnalysisResult }) {
  const colors = getRatingColor(analysis.rating)
  const showAlternatives = analysis.rating < 7 || analysis.consumeStatus !== "YES"

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className={`px-6 py-4 ${colors.bg}`}>
        <div className="flex items-center gap-2">
          <Leaf className={`h-5 w-5 ${colors.text}`} />
          <span className={`font-semibold ${colors.text}`}>{analysis.fruitType}</span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <RatingGauge rating={analysis.rating} />

          <div className="flex flex-col gap-4">
            <StatusBadge status={analysis.consumeStatus} />

            <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-xs font-medium text-muted-foreground">Shelf Life</div>
                <div className="font-semibold text-foreground">{analysis.shelfLife}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border bg-muted/20 p-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Honest Verdict
          </div>
          <p className="text-sm leading-relaxed text-foreground">{analysis.verdict}</p>
        </div>

        {showAlternatives && analysis.alternativeUses.length > 0 && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                Alternative Uses
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.alternativeUses.map((use, index) => (
                <Badge key={index} variant="secondary" className="border-amber-200 bg-white text-amber-800">
                  {use}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    setError(null)
    setAnalysis(null)

    try {
      const rescaledImage = await rescaleImage(file)
      setImage(rescaledImage)
    } catch (err) {
      setError("Failed to process image")
      console.error(err)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  const analyzeImage = async () => {
    if (!image) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image")
      }

      const analysisText = data.analysis
      const cleanedText = analysisText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim()
      const parsedAnalysis: AnalysisResult = JSON.parse(cleanedText)
      setAnalysis(parsedAnalysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const clearImage = () => {
    setImage(null)
    setAnalysis(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <Leaf className="h-6 w-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">TerraLoop</h1>
          </div>
          <p className="text-muted-foreground">Instant fruit freshness analysis powered by AI</p>
        </div>

        <Card className="mb-6 border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Upload Fruit Image</CardTitle>
            <CardDescription>Drag and drop or click to upload</CardDescription>
          </CardHeader>
          <CardContent>
            {!image ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-muted-foreground/20 hover:border-emerald-400 hover:bg-muted/30"
                }`}
              >
                <Upload
                  className={`mb-3 h-8 w-8 ${isDragging ? "text-emerald-500" : "text-muted-foreground/40"}`}
                />
                <p className="text-sm text-muted-foreground">
                  {isDragging ? "Drop image here" : "Click or drag to upload"}
                </p>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl">
                <img src={image} alt="Uploaded fruit" className="w-full object-cover" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 shadow-lg"
                  onClick={clearImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </CardContent>
        </Card>

        {image && (
          <Button
            onClick={analyzeImage}
            disabled={isLoading}
            className="mb-6 w-full bg-emerald-600 py-6 text-base font-semibold hover:bg-emerald-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-5 w-5" />
                Analyze Freshness
              </>
            )}
          </Button>
        )}

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="flex items-center gap-3 pt-6">
              <XCircle className="h-5 w-5 text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </CardContent>
          </Card>
        )}

        {analysis && <QuickGlanceCard analysis={analysis} />}
      </div>
    </div>
  )
}
