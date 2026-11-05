import { Activity, ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ClipboardList, GraduationCap, Plus, Save, Search, ShieldCheck, Trash2, TrendingUp, UsersRound, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAuth } from '../context/AuthContext'
import { TeacherLayout } from '../components/PageLayout'
import { readStore, resetDemoData, seedDemoStudents, storageKeys, writeStore } from '../utils/storage'
import { recommendationFor } from '../utils/assessment'

const demoMetrics = [
  { score: 76, gap: 24, career: 'Diesel Service Technician' },
  { score: 68, gap: 32, career: 'EV Technician' },
  { score: 57, gap: 43, career: 'Workshop Supervisor' },
  { score: 82, gap: 18, career: 'Automotive Diagnostic Technician' },
  { score: 61, gap: 39, career: 'Diesel Service Technician' },
  { score: 72, gap: 28, career: 'Automotive Service Advisor' },
  { score: 54, gap: 46, career: 'EV Technician' },
  { score: 87, gap: 13, career: 'Automotive Diagnostic Technician' },
  { score: 64, gap: 36, career: 'Diesel Service Technician' },
]
const tradeColors = ['#164a85', '#ec9b35', '#3c9b7c', '#9c78c5', '#df6d60', '#63a6b6']

function getStudentsWithMetrics() {
  const students = readStore(storageKeys.students, [])
  const results = readStore(storageKeys.results, {})
  return students.map((student, index) => {
    const result = results[student.id]
    const demo = demoMetrics[index % demoMetrics.length]
    return {
      ...student,
      result: result || null,
      score: result?.overall ?? demo.score,
      gap: result?.skillGap ?? demo.gap,
      career: result ? recommendationFor(result) : demo.career,
      status: result ? 'Assessment complete' : student.id.startsWith('demo-') ? 'Assessment complete' : 'Not started',
      demo: !result,
    }
  })
}

function TeacherPageHeading({ title, description, action }) {
  return <div className="page-heading"><div><span className="section-kicker">TEACHER & INSTITUTE WORKSPACE</span><h1>{title}</h1><p>{description}</p></div>{action}</div>
}

export default function TeacherDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [students, setStudents] = useState(getStudentsWithMetrics)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [notice, setNotice] = useState('')
  const [moduleForm, setModuleForm] = useState({ title: '', videoUrl: '', notes: '' })
  const [customModules, setCustomModules] = useState(() => readStore(storageKeys.modules, []))
  const refreshStudents = () => setStudents(getStudentsWithMetrics())
  const filtered = students.filter((student) => `${student.name} ${student.trade} ${student.iti}`.toLowerCase().includes(search.toLowerCase()))
  const scoreAverage = students.length ? Math.round(students.reduce((sum, student) => sum + student.score, 0) / students.length) : 0
  const needsSupport = students.filter((student) => student.score < 60).length
  const placementReady = students.length ? Math.round((students.filter((student) => student.score >= 70).length / students.length) * 100) : 0
  const byTrade = useMemo(() => Object.entries(students.reduce((data, student) => { data[student.trade] = (data[student.trade] || 0) + 1; return data }, {})).map(([name, count]) => ({ name, count })), [students])
  const scoreBands = [{ name: 'Needs focus', value: students.filter((student) => student.score < 50).length }, { name: 'Developing', value: students.filter((student) => student.score >= 50 && student.score < 70).length }, { name: 'On track', value: students.filter((student) => student.score >= 70).length }]

  const reset = () => {
    if (!window.confirm('Reset all local demo data, including registrations, assessments, lesson progress and chat history?')) return
    resetDemoData()
    seedDemoStudents()
    logout()
    navigate('/')
  }
  const setField = (event) => setModuleForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const saveModule = (event) => {
    event.preventDefault()
    if (!moduleForm.title.trim()) return
    const next = editingId === null
      ? [...customModules, { ...moduleForm, id: `custom-${Date.now()}`, objective: moduleForm.notes || 'Review this teacher-added learning module.', content: moduleForm.notes || 'Ask your instructor for guided practice.' }]
      : customModules.map((module) => module.id === editingId ? { ...module, ...moduleForm, objective: moduleForm.notes || module.objective, content: moduleForm.notes || module.content } : module)
    if (!writeStore(storageKeys.modules, next)) { setNotice('Could not save this module to local storage.'); return }
    setCustomModules(next)
    setModuleForm({ title: '', videoUrl: '', notes: '' })
    setEditingId(null)
    setShowForm(false)
    setNotice(editingId === null ? 'Learning module added.' : 'Learning module updated.')
  }
  const editModule = (module) => {
    setModuleForm({ title: module.title, videoUrl: module.videoUrl || '', notes: module.notes || module.content || '' })
    setEditingId(module.id)
    setShowForm(true)
  }
  const deleteModule = (id) => {
    if (!window.confirm('Delete this teacher-added learning module?')) return
    const next = customModules.filter((module) => module.id !== id)
    if (!writeStore(storageKeys.modules, next)) { setNotice('Could not delete the module from local storage.'); return }
    setCustomModules(next)
    setNotice('Learning module deleted.')
  }

  return (
    <TeacherLayout>
      <div className="teacher-dashboard">
        <TeacherPageHeading title="Institute overview" description="A snapshot of student progress, skill readiness and learning resources at Government ITI Mulund." action={<button className="button button-outline reset-button" onClick={reset}><Trash2 size={15} /> Reset demo data</button>} />
        <div className="teacher-institute-banner"><span className="teacher-banner-icon"><GraduationCap size={22} /></span><div><span className="section-kicker">INSTITUTE DASHBOARD</span><strong>Government Industrial Training Institute, Mulund, Mumbai-82</strong><small>Student growth · skill assessment · career readiness</small></div><span className="prototype-badge"><ShieldCheck size={14} /> DEMO DATA</span></div>
        <div className="teacher-kpi-grid"><TeacherKpi icon={UsersRound} label="Registered students" value={students.length} tint="blue" /><TeacherKpi icon={ClipboardList} label="Assessments completed" value={students.filter((student) => student.status === 'Assessment complete').length} tint="purple" /><TeacherKpi icon={Activity} label="Average skill score" value={`${scoreAverage}%`} tint="orange" /><TeacherKpi icon={TrendingUp} label="Placement readiness" value={`${placementReady}%`} note={`${needsSupport} students may need support`} tint="green" /></div>
        <div className="teacher-chart-grid"><article className="chart-card"><div className="chart-card-heading"><div><h3>Students by trade</h3><p>Current institute learner distribution</p></div></div><div className="chart-container teacher-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={byTrade} margin={{ left: -20, right: 12, top: 10, bottom: 38 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9edf3" /><XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} tick={{ fontSize: 10, fill: '#697586' }} /><YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#697586' }} /><Tooltip /><Bar dataKey="count" name="Students" radius={[5, 5, 0, 0]}>{byTrade.map((item, index) => <Cell key={item.name} fill={tradeColors[index % tradeColors.length]} />)}</Bar></BarChart></ResponsiveContainer></div></article><article className="chart-card"><div className="chart-card-heading"><div><h3>Assessment performance</h3><p>Students grouped by current score</p></div></div><div className="chart-container teacher-pie"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={scoreBands} dataKey="value" nameKey="name" innerRadius={58} outerRadius={83} paddingAngle={4}><Cell fill="#e27a65" /><Cell fill="#eca849" /><Cell fill="#3c9b7c" /></Pie><Tooltip /></PieChart></ResponsiveContainer><div className="pie-center"><strong>{scoreAverage}%</strong><small>average</small></div></div><div className="teacher-score-legend">{scoreBands.map((band, index) => <span key={band.name}><i style={{ backgroundColor: ['#e27a65', '#eca849', '#3c9b7c'][index] }} />{band.name}<b>{band.value}</b></span>)}</div></article></div>
        <section className="student-management"><div className="management-heading"><div><span className="section-kicker">STUDENT MANAGEMENT</span><h2>Student progress</h2><p>Open any learner’s report for an individual progress view.</p></div><label className="management-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students or trade" /></label></div><div className="table-scroll"><table className="student-table"><thead><tr><th>Student</th><th>Trade</th><th>Assessment score</th><th>Skill gap</th><th>Career direction</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((student) => <tr key={student.id}><td><span className="student-table-avatar">{student.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><span className="student-table-name"><strong>{student.name}</strong><small>{student.iti}</small></span></td><td>{student.trade}</td><td><span className="table-score">{student.score}%</span></td><td>{student.gap}%</td><td>{student.career}</td><td><span className={`assessment-status ${student.status === 'Assessment complete' ? 'status-complete' : ''}`}>{student.status}</span></td><td><Link className="table-view-link" to={`/teacher/students/${student.id}`} state={{ student }}>View <ArrowRight size={14} /></Link></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="table-empty">No students match this search.</div>}</div><div className="table-footnote">Assessment scores for seed demo students are illustrative sample data. Student registrations and completed assessments update this dashboard locally.</div></section>
        <section className="module-management"><div className="management-heading"><div><span className="section-kicker">LEARNING CONTENT</span><h2>Learning module library</h2><p>Add or maintain instructor-shared resources for the student programme.</p></div><button className="button button-primary" onClick={() => { setEditingId(null); setModuleForm({ title: '', videoUrl: '', notes: '' }); setShowForm(!showForm) }}><Plus size={17} /> Add learning module</button></div>
          {showForm && <form className="module-form" onSubmit={saveModule}><div className="module-form-heading"><strong>{editingId === null ? 'Add a learning module' : 'Edit learning module'}</strong><button type="button" className="icon-button" onClick={() => setShowForm(false)} aria-label="Close module form"><X size={18} /></button></div><div className="form-row"><label>Module title<input name="title" value={moduleForm.title} onChange={setField} placeholder="e.g. Introduction to EV safety" required /></label><label>Reviewed video URL <input name="videoUrl" type="url" value={moduleForm.videoUrl} onChange={setField} placeholder="Optional · link to reviewed resource" /></label></div><label>Notes and learning information<textarea name="notes" value={moduleForm.notes} onChange={setField} rows="3" placeholder="Share learning objectives or notes for students." /></label><button className="button button-primary" type="submit"><Save size={16} /> Save module</button></form>}
          {customModules.length ? <div className="module-library-grid">{customModules.map((module) => <article className="module-library-card" key={module.id}><span className="module-library-icon"><BookOpen size={19} /></span><span className="custom-module-tag">TEACHER ADDED</span><h3>{module.title}</h3><p>{module.notes || module.content || 'Instructor-shared learning resource.'}</p>{module.videoUrl && <a href={module.videoUrl} target="_blank" rel="noreferrer">Open reviewed resource <ArrowRight size={14} /></a>}<div><button onClick={() => editModule(module)}>Edit</button><button className="module-delete" onClick={() => deleteModule(module.id)}>Delete</button></div></article>)}</div> : <div className="module-empty"><BookOpen size={20} /><span>No additional instructor modules yet. Add a resource to share it with students.</span></div>}
          {notice && <p className="inline-success" role="status">{notice}</p>}
        </section>
      </div>
    </TeacherLayout>
  )
}

function TeacherKpi({ icon: Icon, label, value, note, tint }) {
  return <article className="teacher-kpi"><span className={`stat-icon tint-${tint}`}><Icon size={20} /></span><div><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</div></article>
}

export function StudentDetails() {
  const { id } = useParams()
  const student = readStore(storageKeys.students, []).find((item) => item.id === id)
  const result = student ? readStore(storageKeys.results, {})[student.id] : null
  const fallbackIndex = Math.max(0, readStore(storageKeys.students, []).findIndex((item) => item.id === id))
  const demo = demoMetrics[fallbackIndex % demoMetrics.length]
  if (!student) return <TeacherLayout><div className="detail-not-found"><h2>Student not found</h2><Link to="/teacher/dashboard"><ArrowLeft size={16} /> Back to student list</Link></div></TeacherLayout>
  const score = result?.overall ?? demo.score
  const gap = result?.skillGap ?? demo.gap
  const career = result ? recommendationFor(result) : demo.career
  return (
    <TeacherLayout><div className="student-detail-page"><Link to="/teacher/dashboard" className="back-link"><ArrowLeft size={16} /> Back to institute dashboard</Link><TeacherPageHeading title={`${student.name}’s progress`} description="Individual learner overview · Sample reporting view" /><div className="detail-profile-card"><span className="detail-avatar">{student.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><div><h2>{student.name}</h2><p>{student.trade} · {student.year || 'ITI student'}</p><small>{student.iti}</small></div><span className="prototype-badge"><ShieldCheck size={14} /> {result ? 'STUDENT RESULT' : 'ILLUSTRATIVE DEMO'}</span></div><div className="teacher-kpi-grid detail-kpis"><TeacherKpi icon={Activity} label="Assessment score" value={`${score}%`} tint="blue" /><TeacherKpi icon={TrendingUp} label="Estimated skill gap" value={`${gap}%`} tint="orange" /><TeacherKpi icon={GraduationCap} label="Career direction" value={career} tint="purple" /><TeacherKpi icon={CheckCircle2} label="Assessment status" value={result ? 'Completed' : 'Demo sample'} tint="green" /></div>{result ? <section className="student-report-card"><span className="section-kicker">ASSESSMENT BREAKDOWN</span><h3>Observed topic performance</h3><div className="topic-report-grid">{result.topics.map((topic) => <div key={topic.name}><span>{topic.name}</span><div className="progress-track"><span style={{ width: `${topic.score}%` }} /></div><b>{topic.score}%</b></div>)}</div><p>Assessment completed {new Date(result.completedAt).toLocaleString()} · Use these results as a learning conversation starter, not as the sole basis for placement decisions.</p></section> : <div className="detail-sample-notice"><ShieldCheck size={17} /> This student's score and career direction are illustrative seed data. No individual assessment has been saved yet.</div>}</div></TeacherLayout>
  )
}
