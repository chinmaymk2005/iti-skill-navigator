import { Bot, ChevronDown, MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getMentorReply } from '../utils/chatService'
import { readStore, writeStore } from '../utils/storage'
import { useLanguage } from '../context/LanguageContext'

const starterQuestions = ['What is BS6 technology?', 'How can I become an EV technician?', 'What is an OBD scanner?', 'How can I prepare for an automotive interview?']
const greeting = {
  English: 'Namaste! I’m your Skill Navigator demo mentor. Ask me about automotive skills, careers or interview preparation.',
  हिंदी: 'नमस्ते! मैं Skill Navigator का डेमो मेंटर हूँ। ऑटोमोटिव कौशल, करियर या इंटरव्यू तैयारी के बारे में पूछें।',
  मराठी: 'नमस्कार! मी Skill Navigator चा डेमो मेंटर आहे. ऑटोमोटिव्ह कौशल्ये, करिअर किंवा मुलाखत तयारीबद्दल विचारा.',
}

export default function Chatbot() {
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [history, setHistory] = useState(() => readStore('iti_chat_history', []))
  const endRef = useRef(null)

  useEffect(() => { writeStore('iti_chat_history', history) }, [history])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [history, open, busy])

  const send = async (value) => {
    const prompt = value.trim()
    if (!prompt || busy) return
    const userMessage = { id: Date.now(), role: 'user', text: prompt }
    setHistory((previous) => [...previous, userMessage])
    setText('')
    setBusy(true)
    try {
      const reply = await getMentorReply(prompt, language)
      setHistory((previous) => [...previous, { id: Date.now() + 1, role: 'mentor', text: reply.text, followUps: reply.followUps }])
    } catch (error) {
      console.error('Demo mentor response failed', error)
      setHistory((previous) => [...previous, { id: Date.now() + 1, role: 'mentor', text: 'Sorry, I could not prepare a response. Please try again.' }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button className={`chat-launcher ${open ? 'chat-launcher-open' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Close Skill Navigator mentor' : 'Open Skill Navigator mentor'}>
        {open ? <X size={23} /> : <><MessageCircle size={22} /><span>Ask your mentor</span></>}
      </button>
      {open && (
        <section className="chat-panel" aria-label="Skill Navigator AI Mentor">
          <div className="chat-header">
            <span className="chat-avatar"><Bot size={21} /></span>
            <div><strong>Skill Navigator AI Mentor</strong><small><span className="status-dot" /> Demo mentor · {language}</small></div>
            <button className="icon-button chat-close" onClick={() => setOpen(false)} aria-label="Minimize chat"><ChevronDown size={20} /></button>
          </div>
          <div className="chat-demo-note"><Sparkles size={14} /> Demonstration chatbot · no live AI connection</div>
          <div className="chat-messages">
            {history.length === 0 && <div className="chat-message mentor-message">{greeting[language]}<div className="suggested-list">{starterQuestions.map((question) => <button key={question} onClick={() => send(question)}>{question}</button>)}</div></div>}
            {history.map((message) => (
              <div key={message.id} className={`chat-message ${message.role === 'user' ? 'user-message' : 'mentor-message'}`}>
                {message.text}
                {!!message.followUps?.length && <div className="suggested-list">{message.followUps.map((followUp) => <button key={followUp} onClick={() => send(followUp)}>{followUp}</button>)}</div>}
              </div>
            ))}
            {busy && <div className="chat-message mentor-message typing-indicator">Thinking<span>.</span><span>.</span><span>.</span></div>}
            <div ref={endRef} />
          </div>
          <form className="chat-input" onSubmit={(event) => { event.preventDefault(); send(text) }}>
            <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Ask a career or skills question..." aria-label="Message the mentor" />
            <button type="submit" disabled={!text.trim() || busy} aria-label="Send message"><Send size={17} /></button>
          </form>
        </section>
      )}
    </>
  )
}
