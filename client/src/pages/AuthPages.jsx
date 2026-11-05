import { ArrowLeft, ArrowRight, GraduationCap, ShieldCheck, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PublicLayout } from '../components/PageLayout'

const trades = ['Diesel Mechanic', 'Electrician', 'Fitter', 'Welder', 'Motor Mechanic Vehicle', 'Other']

function AuthShell({ children, title, description, type = 'student' }) {
  return (
    <PublicLayout>
      <section className="auth-page"><div className="auth-aside"><div className="auth-aside-content"><Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to home</Link><span className="auth-logo"><GraduationCap size={27} /></span><span className="section-kicker">ITI SKILL NAVIGATOR</span><h1>{type === 'teacher' ? 'Guide the next generation.' : 'Your future is a skill away.'}</h1><p>{type === 'teacher' ? 'See how students are progressing and help connect learning to opportunity.' : 'Start with what you know. Grow toward the work you want.'}</p><div className="auth-aside-quote"><ShieldCheck size={17} /> A learning and career guidance prototype for ITI students across Maharashtra.</div></div><div className="auth-aside-footer">Government Industrial Training Institute, Mulund, Mumbai-82</div></div><div className="auth-form-side"><div className="auth-form-wrap"><span className="auth-form-icon">{type === 'teacher' ? <ShieldCheck size={20} /> : <UserRound size={20} />}</span><h2>{title}</h2><p className="auth-description">{description}</p>{children}</div></div></section>
    </PublicLayout>
  )
}

export function StudentRegister() {
  const { registerStudent } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', mobile: '', iti: 'Government Industrial Training Institute, Mulund, Mumbai-82', trade: 'Diesel Mechanic', year: '2nd Year', language: 'मराठी' })
  const [error, setError] = useState('')
  const update = (event) => setForm((value) => ({ ...value, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    if (form.name.trim().length < 2) {
      setError('Please enter your full name.')
      return
    }
    registerStudent({ ...form, name: form.name.trim() })
    navigate('/student/dashboard')
  }
  return (
    <AuthShell title="Create your student profile" description="A few details help us tailor your learning and career recommendations.">
      <form className="form-stack" onSubmit={submit}>
        <label>Student name<input name="name" value={form.name} onChange={update} placeholder="e.g. Aarav Patil" autoComplete="name" required /></label>
        <label>Mobile number<div className="phone-input"><span>+91</span><input name="mobile" value={form.mobile} onChange={update} placeholder="10-digit mobile number" inputMode="numeric" maxLength="10" autoComplete="tel-national" required /></div></label>
        <label>ITI name<input name="iti" value={form.iti} onChange={update} required /></label>
        <div className="form-row"><label>Trade<select name="trade" value={form.trade} onChange={update}>{trades.map((trade) => <option key={trade}>{trade}</option>)}</select></label><label>Academic year<select name="year" value={form.year} onChange={update}><option>1st Year</option><option>2nd Year</option><option>Passed Out</option></select></label></div>
        <label>Preferred language<select name="language" value={form.language} onChange={update}><option>English</option><option>हिंदी</option><option>मराठी</option></select></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary button-full" type="submit">Create profile & continue <ArrowRight size={17} /></button>
      </form>
      <p className="auth-switch">Already registered? <Link to="/student/login">Sign in</Link></p>
      <div className="auth-demo-note"><ShieldCheck size={15} /> Demo registration only · no OTP or real account required</div>
    </AuthShell>
  )
}

export function StudentLogin() {
  const { loginStudent, loginDemoStudent } = useAuth()
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const submit = (event) => {
    event.preventDefault()
    if (!loginStudent(mobile)) { setError('No demo profile found for this number. Register or use demo access.'); return }
    navigate('/student/dashboard')
  }
  return (
    <AuthShell title="Welcome back" description="Sign in to pick up where you left off.">
      <form className="form-stack" onSubmit={submit}>
        <label>Mobile number<div className="phone-input"><span>+91</span><input value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder="Enter your registered number" inputMode="numeric" maxLength="10" required /></div></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary button-full" type="submit">Continue <ArrowRight size={17} /></button>
      </form>
      <div className="auth-divider"><span>or explore the prototype</span></div>
      <button className="button button-outline button-full" onClick={() => { loginDemoStudent(); navigate('/student/dashboard') }}>Continue with demo student</button>
      <p className="auth-switch">New to Skill Navigator? <Link to="/student/register">Create your profile</Link></p>
      <div className="auth-demo-note"><ShieldCheck size={15} /> Demo access requires no OTP or password</div>
    </AuthShell>
  )
}

export function TeacherLogin() {
  const { loginTeacher } = useAuth()
  const navigate = useNavigate()
  return (
    <AuthShell type="teacher" title="Teacher & institute access" description="Explore the student progress and learning content demo." >
      <div className="teacher-access-card"><div className="teacher-access-icon"><GraduationCap size={21} /></div><div><strong>Government ITI Mulund</strong><span>Teacher dashboard · Demo access</span></div></div>
      <div className="form-stack"><button className="button button-primary button-full" onClick={() => { loginTeacher(); navigate('/teacher/dashboard') }}>Enter teacher dashboard <ArrowRight size={17} /></button></div>
      <p className="auth-switch"><Link to="/"><ArrowLeft size={14} /> Return to public homepage</Link></p>
      <div className="auth-demo-note"><ShieldCheck size={15} /> No real authentication backend is connected</div>
    </AuthShell>
  )
}
