import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Initialize the Google Generative AI client with v1 endpoint
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the model - using gemini-2.5-flash-lite (stable 2026 model)
    const model = genAI.getGenerativeModel(
      { model: "gemini-2.5-flash-lite" },
      { apiVersion: "v1" }
    );

    // Extract base64 data from data URL
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    // Prepare the image part for the API
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    };

    // The expert grocer prompt - returns structured JSON
    const prompt = `You are an expert grocer. Analyze the fruit in the image. Provide a 1-10 freshness rating, a definitive consumption verdict, estimated remaining shelf life, and 2-3 alternative uses if it is overripe. Format the response strictly as a JSON object so the frontend can parse it into the new UI components.

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
{
  "rating": <number 1-10>,
  "consumeStatus": "<YES | NO | PROCEED WITH CAUTION>",
  "shelfLife": "<duration string like '2-3 Days' or '1 Week'>",
  "verdict": "<brief honest assessment of the fruit's current state>",
  "alternativeUses": ["<use 1>", "<use 2>", "<use 3>"],
  "fruitType": "<detected fruit type>"
}`;

    // Generate content with the image
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze image" },
      { status: 500 }
    );
  }
}
