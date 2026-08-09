import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const SYSTEM_PROMPT = `You are IndDocs, an assistant for DocSetu — a platform that helps Indian citizens understand what documents they need for government IDs and services (PAN card, Passport, Driving License, Voter ID, Bank Account, Birth Certificate, Income/Domicile Certificate).

Only answer questions about: Indian government documents, ID proofs, application processes, required documents, and related government schemes.

If asked anything unrelated to this topic, politely redirect the user back to document/ID related questions.

Keep answers concise, clear, and practical — like a knowledgeable friend, not a formal document.`

app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    const contents = [
      ...history.map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: message }] },
    ]

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        }),
      },
    )

    const data = await response.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!reply) {
      return res.status(500).json({ error: 'No response from AI' })
    }

    res.json({ reply })
  } catch (err) {
    console.error('Gemini API error:', err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`InfoDocs server running on http://localhost:${PORT}`))