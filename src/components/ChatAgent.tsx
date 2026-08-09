import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SendIcon, SparklesIcon } from 'lucide-react'
import ReactMarkdown, { type Components } from 'react-markdown'


type Message = {
  role: 'user' | 'model'
  text: string
}

export function ChatAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi, I'm IndDocs. Ask me about any government ID or document — what it's for, how to apply, or what you'll need." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const newMessages: Message[] = [...messages, { role: 'user', text: trimmed }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      })
      const data = await res.json()
      setMessages((current) => [...current, { role: 'model', text: data.reply ?? 'Sorry, something went wrong.' }])
    } catch {
      setMessages((current) => [...current, { role: 'model', text: 'Could not reach the server. Is it running?' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <section id="help" className="w-full px-5 py-20">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Ask IndDocs
        </motion.h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Your guide to Indian government documents and schemes.
        </p>

        <div className="mt-8 flex h-[535px] flex-col rounded-2xl border border-slate-900/10 bg-white/60 backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-saffron text-ink'
                      : 'bg-slate-900/5 text-slate-800 dark:bg-white/10 dark:text-slate-200'
                  }`}
                >
                  {msg.role === 'model' && i === 0 && (
                    <span className="mb-1 flex items-center gap-1 text-xs font-medium text-saffron">
                      <SparklesIcon size={12} />
                      IndDocs
                    </span>
                  )}
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                      ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2 last:mb-0">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-2 last:mb-0">{children}</ol>,
                      li: ({ children }) => <li>{children}</li>,
                      h1: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
                      h2: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
                      h3: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
                      hr: () => null,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-900/5 px-4 py-2.5 text-sm text-slate-500 dark:bg-white/10 dark:text-slate-400">
                  Typing...
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-slate-900/10 p-3 dark:border-white/10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a document or scheme..."
              className="flex-1 rounded-full border border-slate-900/10 bg-white/80 px-4 py-2 text-sm outline-none focus:border-saffron/60 dark:border-white/10 dark:bg-white/5"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-saffron text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <SendIcon size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}