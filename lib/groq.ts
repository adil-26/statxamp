import OpenAI from 'openai'

const TEXT_MODELS = ['qwen/qwen3.8-27b', 'openai/gpt-oss-20b', 'openai/gpt-oss-120b']
const VISION_MODEL = 'qwen/qwen3.8-27b'

const SYSTEM = `You are StatXam AI, a tutor for Class 10 and Class 12 board exams and for JEE, NEET, MHT-CET, and CUET.
Write the way ChatGPT writes a helpful answer. Do not reply with only the final number or a single sentence.
Use this shape, with a blank line between parts:
## What this is asking
One or two plain sentences.
## Idea
A short explanation of the concept, with **bold** on the key terms.
## Step by step
A numbered list. Put each formula on its own line between $$ and $$.
## Answer
The final result in **bold**, then one sentence of what it means.
## How to score
One board-exam tip.
If the student writes in Marathi, keep this same shape in Marathi.
Do not start with "Hello, I am StatXam AI".`

export function hasGroqKey() {
  return Boolean(process.env.GROQ_API_KEY?.trim())
}

function imageDataUrl(file: { base64?: string; mimeType?: string }) {
  const raw = file.base64 || ''
  if (raw.startsWith('data:')) return raw
  const mime = file.mimeType || 'image/jpeg'
  return `data:${mime};base64,${raw.replace(/^data:[^;]+;base64,/, '')}`
}

export async function askStatXam(message: string, file?: { base64?: string; mimeType?: string }) {
  const apiKey = process.env.GROQ_API_KEY?.trim()
  if (!apiKey) return null

  const client = new OpenAI({
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1',
  })

  const hasImage = Boolean(file?.base64)
  const models = hasImage ? [VISION_MODEL] : TEXT_MODELS
  const userContent = hasImage
    ? [
        {
          type: 'text' as const,
          text: `${message}\n\nRead the attached photo. Transcribe the question, then explain and solve it. Do not ask the student to retype it unless the photo is blank or unreadable.`,
        },
        { type: 'image_url' as const, image_url: { url: imageDataUrl(file || {}) } },
      ]
    : message

  let lastError = 'Groq did not respond.'
  for (const model of models) {
    try {
      const completion = await client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: userContent },
        ],
      })
      const reply = completion.choices[0]?.message?.content?.trim()
      if (reply) return { reply, source: model }
    } catch (error) {
      lastError = error instanceof Error ? error.message : lastError
    }
  }

  if (lastError.includes('blocked at the project level')) {
    return {
      reply: 'The Groq key is saved, but chat models are turned off for this project. Enable one at https://console.groq.com/settings/project/limits and ask again.',
      source: 'groq',
    }
  }

  if (/413|too large|entity too large/i.test(lastError)) {
    return {
      reply: 'That photo is too large to read. Crop it to the question and send it again.',
      source: 'groq',
    }
  }

  if (/invalid image|image data/i.test(lastError)) {
    return {
      reply: 'I could not read that file. Send a JPG or PNG photo of the question.',
      source: 'groq',
    }
  }

  return {
    reply: 'StatXam AI could not answer just now. Try the question again in a moment.',
    source: 'groq',
  }
}
