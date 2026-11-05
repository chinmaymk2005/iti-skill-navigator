import { Activity, BriefcaseBusiness, BookOpen, ClipboardCheck, LayoutDashboard, Route, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const items = [
  { to: '/student/dashboard', key: 'dashboard', icon: LayoutDashboard, end: true },
  { to: '/student/assessment', key: 'assessment', icon: ClipboardCheck },
  { to: '/student/analysis', key: 'analysis', icon: Activity },
  { to: '/student/careers', key: 'careers', icon: Route },
  { to: '/student/training', key: 'training', icon: BookOpen },
  { to: '/jobs', key: 'jobs', icon: BriefcaseBusiness },
]

export default function Sidebar() {
  const { t } = useLanguage()
  return (
    <aside className="sidebar">
      <div className="sidebar-profile"><span className="sidebar-avatar"><UserRound size={20} /></span><div><strong>Student workspace</strong><small>Career development</small></div></div>
      <nav aria-label="Student navigation">
        {items.map(({ to, key, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'side-link side-active' : 'side-link'}><Icon size={18} /><span>{t(key)}</span></NavLink>)}
      </nav>
      <div className="sidebar-note"><strong>Small steps, big futures.</strong><p>Build skills for the industries of tomorrow.</p></div>
    </aside>
  )
}
