import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { BriefcaseBusiness, LayoutDashboard, School } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function StudentLayout({ children }) {
  return <><Navbar /><div className="workspace"><Sidebar /><main className="workspace-content">{children}</main></div></>
}

export function PublicLayout({ children }) {
  return <><Navbar /><main>{children}</main></>
}

export function TeacherLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="workspace teacher-workspace">
        <aside className="sidebar teacher-sidebar">
          <div className="sidebar-profile">
            <span className="sidebar-avatar"><School size={20} /></span>
            <div><strong>Institute workspace</strong><small>Teacher & administration</small></div>
          </div>
          <nav aria-label="Teacher navigation">
            <NavLink to="/teacher/dashboard" className={({ isActive }) => isActive ? 'side-link side-active' : 'side-link'}><LayoutDashboard size={18} /><span>Institute overview</span></NavLink>
            <NavLink to="/jobs" className="side-link"><BriefcaseBusiness size={18} /><span>Sample job board</span></NavLink>
          </nav>
          <div className="sidebar-note"><strong>Every learner matters.</strong><p>Use assessment results as a starting point for supportive guidance.</p></div>
        </aside>
        <main className="workspace-content">{children}</main>
      </div>
    </>
  )
}
