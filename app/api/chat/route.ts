import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey || !apiKey.trim()) {
      return NextResponse.json({
        reply: "Please set your GEMINI_API_KEY in .env.local to enable live AI Assistant responses."
      })
    }

    const ai = new GoogleGenAI({ apiKey })

    const systemInstruction = `You are StatXam AI — a world-class academic tutor and mentor specialized in Class 10 & 12 Board Exams (CBSE, ICSE, State Boards) and National Competitive Exams (JEE Main/Advanced, NEET, CUET).
Your goal is to help students understand concepts with crystalline clarity, solve complex mathematical and physical derivations step-by-step, explain chemical mechanisms, and provide high-scoring exam presentation techniques based on the last 10 years of board paper patterns.
Always be encouraging, precise, and use clean markdown formatting with bullet points, bold key terms, and clear formulas.`

    const prompt = `${systemInstruction}\n\nStudent asks:\n"${message.trim()}"\n\nProvide an expert, thorough, and high-scoring explanation:`

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt
    })

    const replyText = response.text ? response.text.trim() : 'I was unable to generate a response at this moment. Please try again.'

    return NextResponse.json({
      reply: replyText,
      source: 'gemini-3.6-flash'
    })
  } catch (error: any) {
    console.error('Error in /api/chat:', error)
    return NextResponse.json(
      { error: 'AI Assistant failed to generate response', message: error?.message },
      { status: 500 }
    )
  }
}
