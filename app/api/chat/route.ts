import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, file, history } = body

    if ((!message || typeof message !== 'string' || !message.trim()) && !file) {
      return NextResponse.json({ error: 'Please provide a message or upload an image/file' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey || !apiKey.trim()) {
      return NextResponse.json({
        reply: "Please set your GEMINI_API_KEY in .env.local to enable live AI Assistant responses."
      })
    }

    const ai = new GoogleGenAI({ apiKey })

    const systemInstruction = `You are StatXam AI ("Arya") — an elite 24/7 academic tutor and mentor specialized in Class 10 & 12 Board Exams (Maharashtra SSC/HSC, CBSE, ICSE) and National Competitive Exams (JEE Main/Advanced, NEET, MHT-CET, CUET).
Your mission:
1. Explain concepts with crystal clarity, provide step-by-step mathematical proofs/derivations using clear LaTeX math format ($$formula$$ or $inline$), explain chemical reactions and physical laws.
2. If an image, handwritten notebook page, diagram, or question paper is uploaded, carefully examine it, transcribe the question accurately, highlight any potential pitfalls, and provide complete, verified solutions.
3. Offer bilingual explanations when requested (English & Marathi - मराठी).
4. Always structure answers with:
   - **Key Concept / Theorem**
   - **Step-by-Step Derivation / Solution** (with math formulas)
   - **Board Exam Scoring Tip / Marking Scheme**
5. Maintain an encouraging, friendly, and empowering tone for students.`

    const userText = message && message.trim() 
      ? message.trim() 
      : 'Please analyze this uploaded document or image, identify the question or diagram, and provide a comprehensive step-by-step solution with mathematical steps.'

    const promptText = `${systemInstruction}\n\nStudent Query:\n${userText}`

    // Prepare contents array
    const parts: any[] = []

    // If an image/file is uploaded, add as inlineData
    if (file && file.base64) {
      const cleanBase64 = file.base64.replace(/^data:[^;]+;base64,/, '')
      const mimeType = file.mimeType || 'image/jpeg'
      parts.push({
        inlineData: {
          mimeType,
          data: cleanBase64
        }
      })
    }

    parts.push({ text: promptText })

    // Try gemini-3.8-flash first, fallback to gemini-3.6-flash
    let replyText = ''
    let usedModel = 'gemini-3.8-flash'

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: parts
      })
      replyText = response.text ? response.text.trim() : ''
    } catch (primaryError: any) {
      console.warn('gemini-3.8-flash attempt failed, falling back to gemini-3.6-flash:', primaryError?.message)
      usedModel = 'gemini-3.6-flash'
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: parts
      })
      replyText = fallbackResponse.text ? fallbackResponse.text.trim() : ''
    }

    if (!replyText) {
      replyText = 'I examined your doubt but could not generate a response. Please rephrase or try another image.'
    }

    return NextResponse.json({
      reply: replyText,
      source: usedModel
    })
  } catch (error: any) {
    console.error('Error in /api/chat:', error)
    return NextResponse.json(
      { error: 'AI Assistant failed to generate response', message: error?.message },
      { status: 500 }
    )
  }
}

