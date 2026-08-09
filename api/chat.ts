export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, history = [] } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  const SYSTEM_PROMPT = `You are InfoDocs, an assistant for DocSetu — a platform that helps Indian citizens understand what documents they need for government IDs and services (PAN card, Passport, Driving License, Voter ID, Bank Account, Birth Certificate, Income/Domicile Certificate).

Only answer questions about: Indian government documents, ID proofs, application processes, required documents, and related government schemes.

If asked anything unrelated to this topic, politely redirect the user back to document/ID related questions.

Format your responses as plain conversational text suitable for a chat bubble — do NOT use Markdown formatting like #, ##, **, *, or --- for headings, bold, or horizontal rules. Use simple line breaks and plain numbered lists (1. 2. 3.) instead. Keep answers concise and easy to scan without any special formatting symbols.`

  try {
    const contents = [
      ...history.map((h: any) => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: message }] },
    ]

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

    if (!response.ok) {
      console.error('Gemini API returned an error:', JSON.stringify(data))
      return res.status(500).json({ error: 'Gemini API error', details: data })
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!reply) {
      console.error('No reply in Gemini response:', JSON.stringify(data))
      return res.status(500).json({ error: 'No response from AI', details: data })
    }

    res.status(200).json({ reply })
  } catch (err) {
    console.error('Gemini API error:', err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}