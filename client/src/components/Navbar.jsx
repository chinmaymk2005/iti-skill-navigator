import { GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import LanguageSelector from './LanguageSelector'

export default function Navbar({ transparent = false }) {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const close = () => setOpen(false)
  const links = user?.role === 'teacher'
    ? [{ to: '/teacher/dashboard', label: t('dashboard') }]
    : user?.role === 'student'
      ? [
          { to: '/student/dashboard', label: t('dashboard') },
          { to: '/student/assessment', label: t('assessment') },
          { to: '/student/careers', label: t('careers') },
          { to: '/student/training', label: t('training') },
          { to: '/jobs', label: t('jobs') },
        ]
      : [
          { to: '/', label: t('home') },
          { to: '/#about', label: t('about') },
          { to: '/#features', label: t('features') },
          { to: '/student/login', label: t('studentLogin') },
          { to: '/teacher/login', label: t('teacherLogin') },
        ]

  return (
    <header className={`topbar ${transparent ? 'topbar-transparent' : ''}`}>
      <div className="topbar-inner">
        <Link to="/" className="brand" onClick={close} aria-label="ITI Skill Navigator home">
          <span className="brand-mark"><GraduationCap size={23} strokeWidth={2.2} /></span>
          <span className="brand-copy"><strong>ITI Skill Navigator</strong><small>Learn · Grow · Succeed</small></span>
        </Link>
        <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={close} className={({ isActive }) => link.to.includes('#') ? '' : isActive ? 'nav-active' : ''}>
              {link.label}
            </NavLink>
          ))}
          <LanguageSelector compact />
          {user && (
            <button className="nav-logout" onClick={() => { logout(); navigate('/') ; close() }}>
              {t('logout')}
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
