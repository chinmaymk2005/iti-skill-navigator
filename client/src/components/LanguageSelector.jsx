import { Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageSelector({ compact = false }) {
  const { language, setLanguage } = useLanguage()
  return (
    <label className={`language-select ${compact ? 'language-select-compact' : ''}`}>
      {!compact && <Languages size={16} aria-hidden="true" />}
      <span className="sr-only">Select language</span>
      <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Select language">
        <option>English</option>
        <option>हिंदी</option>
        <option>मराठी</option>
      </select>
    </label>
  )
}
