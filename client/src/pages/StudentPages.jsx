import { Activity, ArrowRight, Award, BatteryCharging, BookOpen, BookOpenCheck, BriefcaseBusiness, Check, CheckCircle2, ChevronLeft, ChevronRight, CircleHelp, ClipboardCheck, Clock3, Download, FileText, Flag, Gauge, Lightbulb, MapPin, MessageCircle, RotateCcw, ScanLine, Search, ShieldCheck, Sparkles, Target, TrendingUp, UsersRound, Wrench, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { careers } from '../data/careers'
import { assessmentQuestions } from '../data/questions'
import { sampleJobs } from '../data/sampleJobs'
import { trainingModules } from '../data/trainingModules'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { StudentLayout, PublicLayout } from '../components/PageLayout'
import { readStore, saveStudentResult, storageKeys, writeStore } from '../utils/storage'
import { calculateAssessment, recommendationFor } from '../utils/assessment'

const chartColors = ['#164a85', '#ec9b35', '#3c9b7c', '#9c78c5', '#df6d60', '#63a6b6']

function PageHeading({ kicker, title, description, action }) {
  return <div className="page-heading"><div><span className="section-kicker">{kicker}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>
}

function StatTile({ icon: Icon, label, value, note, tint = 'blue' }) {
  return <article className="stat-tile"><span className={`stat-icon tint-${tint}`}><Icon size={20} /></span><div><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</div></article>
}

function getMyResult(user) {
  return user ? readStore(storageKeys.results, {})[user.id] || null : null
}

export function StudentDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const result = getMyResult(user)
  const progressMap = readStore(storageKeys.progress, {})
  const completedLessons = progressMap[user?.id] || []
  const score = result?.overall
  const careerName = recommendationFor(result)
  const modules = trainingModules
  const nextModule = modules.find((module) => !completedLessons.includes(module.id)) || modules[0]
  return (
    <StudentLayout>
      <div className="dashboard-page">
        <div className="welcome-panel"><div className="welcome-copy"><span className="welcome-kicker"><span className="welcome-kicker-dot" /> STUDENT CAREER WORKSPACE</span><h1>{t('welcome')}, {user?.name?.split(' ')[0] || 'Student'}.</h1><p>Your next opportunity begins with what you learn today. Keep building skills for the industries ahead.</p><div className="welcome-tags"><span><GraduationCapIcon /> {user?.trade || 'ITI Student'}</span><span><MapPin size={14} /> {user?.iti?.split(',')[0] || 'Government ITI Mulund'}</span></div></div><div className="welcome-art"><span className="welcome-art-sun" /><span className="welcome-art-gear">✳</span><div className="welcome-art-card"><span className="mini-check"><Check size={14} /></span><span><b>{score != null ? `${score}% skill score` : 'Your future is in progress'}</b><small>{score != null ? 'Assessment complete' : 'Take your first assessment'}</small></span></div><div className="welcome-art-person"><span /><i /></div></div></div>
        <div className="stats-row">
          <StatTile icon={Target} label={t('overallScore')} value={score != null ? `${score}%` : 'Not assessed'} note={score != null ? `Skill gap: ${result.skillGap}%` : 'Take the 20-question assessment'} tint="blue" />
          <StatTile icon={BookOpenCheck} label={t('learningProgress')} value={`${completedLessons.length} / 15 days`} note={completedLessons.length ? 'Keep your learning streak going' : 'Start the guided programme'} tint="green" />
          <StatTile icon={TrendingUp} label={t('careerRecommendation')} value={result ? careerName : 'Discover your fit'} note={result ? 'Based on your latest assessment' : 'Complete your assessment to personalize'} tint="orange" />
        </div>
        <div className="section-row-title"><div><h2>{t('careerToolkit')}</h2><p>{t('toolkitSummary')}</p></div><Link className="text-link" to="/student/careers">{t('viewRoadmap')} <ArrowRight size={16} /></Link></div>
        <div className="toolkit-grid">
          <Link className="toolkit-card toolkit-primary-card" to="/student/assessment"><span className="toolkit-card-icon"><ClipboardCheck size={21} /></span><span className="toolkit-card-label">START HERE · 20 QUESTIONS</span><h3>{result ? t('retakeAssessment') : t('assessmentCard')}</h3><p>Understand your aptitude, technical strengths and next learning priorities.</p><span className="toolkit-arrow"><ArrowRight size={17} /></span></Link>
          <Link className="toolkit-card" to="/student/analysis"><span className="toolkit-card-icon toolkit-icon-green"><Activity size={21} /></span><h3>{t('analysisCard')}</h3><p>Explore your performance across key skill areas.</p><span className="toolkit-arrow"><ArrowRight size={17} /></span></Link>
          <Link className="toolkit-card" to="/student/careers"><span className="toolkit-card-icon toolkit-icon-orange"><Target size={21} /></span><h3>{t('careersCard')}</h3><p>See possible directions and the skills to build.</p><span className="toolkit-arrow"><ArrowRight size={17} /></span></Link>
          <Link className="toolkit-card" to="/student/training"><span className="toolkit-card-icon toolkit-icon-purple"><BookOpen size={21} /></span><h3>{t('trainingCard')}</h3><p>Learn modern automotive systems one day at a time.</p><span className="toolkit-arrow"><ArrowRight size={17} /></span></Link>
          <button className="toolkit-card toolkit-card-button" onClick={() => document.querySelector('.chat-launcher')?.click()}><span className="toolkit-card-icon toolkit-icon-sky"><MessageCircle size={21} /></span><h3>{t('mentorCard')}</h3><p>Ask a demo mentor about skills, career paths or interviews.</p><span className="toolkit-arrow"><ArrowRight size={17} /></span></button>
          <Link className="toolkit-card" to="/jobs"><span className="toolkit-card-icon toolkit-icon-rose"><BriefcaseBusiness size={21} /></span><h3>{t('jobsCard')}</h3><p>Browse clearly labelled sample opportunities in Maharashtra.</p><span className="toolkit-arrow"><ArrowRight size={17} /></span></Link>
        </div>
        <div className="dashboard-bottom-grid"><article className="next-step-card"><div className="next-step-icon"><BookOpenCheck size={21} /></div><div><span className="section-kicker">YOUR NEXT LEARNING STEP</span><h3>Day {nextModule.id}: {nextModule.title}</h3><p>{nextModule.objective}</p><Link className="button button-outline" to={`/student/training?day=${nextModule.id}`}>Continue learning <ArrowRight size={16} /></Link></div></article><article className="readiness-card"><span className="section-kicker">CAREER READINESS</span><div className="readiness-meter"><div className="readiness-ring" style={{ '--progress': `${score || 0}%` }}><span>{score != null ? `${score}%` : '—'}</span></div><p>{score != null ? 'Keep growing your skills with focused practice.' : 'Your personalized progress appears after assessment.'}</p></div><Link to="/student/assessment" className="text-link">{result ? 'Review assessment' : 'Begin assessment'} <ArrowRight size={15} /></Link></article></div>
      </div>
    </StudentLayout>
  )
}

function GraduationCapIcon() {
  return <span aria-hidden="true">✦</span>
}

export function SkillAssessment() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [answers, setAnswers] = useState(() => readStore(storageKeys.answers, {})[user?.id] || {})
  const [marked, setMarked] = useState([])
  const [current, setCurrent] = useState(0)
  const [seconds, setSeconds] = useState(20 * 60)
  const question = assessmentQuestions[current]
  const answeredCount = Object.values(answers).filter((value) => value !== undefined && value !== null).length

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [])
  useEffect(() => {
    const saved = readStore(storageKeys.answers, {})
    saved[user?.id] = answers
    writeStore(storageKeys.answers, saved)
  }, [answers, user?.id])

  const setAnswer = (optionIndex) => setAnswers((value) => ({ ...value, [current]: optionIndex }))
  const toggleReview = () => setMarked((value) => value.includes(current) ? value.filter((index) => index !== current) : [...value, current])
  const submit = () => {
    if (answeredCount < assessmentQuestions.length && !window.confirm(`You have answered ${answeredCount} of ${assessmentQuestions.length} questions. Submit anyway?`)) return
    if (answeredCount === assessmentQuestions.length && !window.confirm('Submit your assessment and view your personalized results?')) return
    const result = calculateAssessment(answers)
    if (!saveStudentResult(user.id, { ...result, answers })) {
      window.alert('Your result could not be saved in this browser. Please check local storage availability and try again.')
      return
    }
    navigate('/student/analysis')
  }
  const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <StudentLayout>
      <div className="assessment-page">
        <PageHeading kicker="SKILL ASSESSMENT · 20 QUESTIONS" title="Discover your strengths." description="A quick check-in across aptitude and automotive fundamentals. Take your time and answer honestly." action={<div className={`timer-pill ${seconds < 120 ? 'timer-warning' : ''}`}><Clock3 size={17} /><span>{time}</span></div>} />
        <div className="assessment-progress"><div><span>Overall progress</span><b>{answeredCount} of 20 answered</b></div><div className="progress-track"><span style={{ width: `${(answeredCount / 20) * 100}%` }} /></div><div className="assessment-section-tabs"><span className={current < 10 ? 'section-tab-active' : ''}><span>01</span> Aptitude <small>10 questions</small></span><span className={current >= 10 ? 'section-tab-active' : ''}><span>02</span> Technical <small>10 questions</small></span></div></div>
        <div className="quiz-layout"><section className="quiz-card"><div className="quiz-card-top"><span className={`question-type ${question.section === 'Technical' ? 'type-technical' : ''}`}>{question.section}</span><span className="question-count">Question {current + 1} <span>of 20</span></span></div><h2>{question.question}</h2><span className="question-topic"><Sparkles size={14} /> {question.topic}</span><div className="answer-options">{question.options.map((option, index) => <button key={option} onClick={() => setAnswer(index)} className={`answer-option ${answers[current] === index ? 'answer-selected' : ''}`}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{answers[current] === index && <CheckCircle2 className="option-check" size={19} />}</button>)}</div><div className="quiz-card-footer"><button className={`button button-review ${marked.includes(current) ? 'review-marked' : ''}`} onClick={toggleReview}><Flag size={16} /> {marked.includes(current) ? 'Marked for review' : 'Mark for review'}</button><div className="quiz-nav-buttons"><button className="button button-outline" onClick={() => setCurrent((value) => Math.max(0, value - 1))} disabled={current === 0}><ChevronLeft size={17} /> Previous</button>{current < assessmentQuestions.length - 1 ? <button className="button button-primary" onClick={() => setCurrent((value) => value + 1)}>Next <ChevronRight size={17} /></button> : <button className="button button-primary" onClick={submit}>Submit assessment <Check size={17} /></button>}</div></div></section>
          <aside className="question-nav-card"><div className="question-nav-heading"><div><h3>Question navigator</h3><p>Jump to any question</p></div><CircleHelp size={18} /></div><div className="question-grid">{assessmentQuestions.map((item, index) => <button key={index} aria-label={`Go to question ${index + 1}${answers[index] !== undefined ? ', answered' : ''}${marked.includes(index) ? ', marked for review' : ''}`} className={`${index === current ? 'q-current' : ''} ${answers[index] !== undefined ? 'q-answered' : ''} ${marked.includes(index) ? 'q-marked' : ''}`} onClick={() => setCurrent(index)}>{index + 1}</button>)}</div><div className="quiz-legend"><span><i className="legend-answered" /> Answered</span><span><i className="legend-current" /> Current</span><span><i className="legend-marked" /> Review</span></div><button className="button button-primary button-full" onClick={submit}>Submit assessment <ArrowRight size={16} /></button><p className="quiz-submit-note">You can review your answers before final submission.</p></aside></div>
      </div>
    </StudentLayout>
  )
}

export function SkillAnalysis() {
  const { user } = useAuth()
  const result = getMyResult(user)
  const topicData = result?.topics || []
  const pieData = result ? [{ name: 'Correct', value: result.overall }, { name: 'To improve', value: result.skillGap }] : []
  const recommendation = result ? recommendationFor(result) : ''
  return (
    <StudentLayout>
      <div className="analysis-page">
        <PageHeading kicker="YOUR PERSONALIZED REPORT" title="My skill analysis" description="A clear picture of where you are today—and what to focus on next." action={result && <span className="report-date">Last assessed {new Date(result.completedAt).toLocaleDateString()}</span>} />
        {!result ? <div className="empty-state-card"><span className="empty-state-icon"><Activity size={28} /></span><h2>Your analysis starts with one assessment.</h2><p>Complete the 20-question assessment to see your personal aptitude, technical performance and skill priorities.</p><Link className="button button-primary" to="/student/assessment">Take skill assessment <ArrowRight size={17} /></Link></div> : <>
          <div className="analysis-summary"><div className="score-main"><span className="section-kicker">OVERALL SKILL SCORE</span><strong>{result.overall}<small>%</small></strong><span className="score-caption">{result.correctCount} of {result.total} answers correct</span></div><div className="score-split"><div className="split-score"><span className="split-icon aptitude-icon"><BrainCircuitIcon /></span><div><small>Aptitude</small><strong>{result.aptitude}%</strong></div><div className="mini-progress"><i style={{ width: `${result.aptitude}%` }} /></div></div><div className="split-score"><span className="split-icon technical-icon"><Wrench size={17} /></span><div><small>Technical</small><strong>{result.technical}%</strong></div><div className="mini-progress"><i className="progress-orange" style={{ width: `${result.technical}%` }} /></div></div></div><div className="score-gap"><span>Estimated skill gap</span><div className="gap-ring" style={{ '--progress': `${result.skillGap}%` }}><strong>{result.skillGap}%</strong></div><small>Focus areas identified from your answers</small></div></div>
          <div className="analysis-chart-grid"><article className="chart-card"><div className="chart-card-heading"><div><h3>Skill area performance</h3><p>Your results by topic</p></div><span className="chart-legend-dot" /> <small>Score</small></div><div className="chart-container chart-tall"><ResponsiveContainer width="100%" height="100%"><BarChart data={topicData} margin={{ left: -18, right: 12, top: 10, bottom: 45 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9edf3" /><XAxis dataKey="name" angle={-28} textAnchor="end" interval={0} tick={{ fontSize: 10, fill: '#697586' }} /><YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#697586' }} /><Tooltip formatter={(value) => [`${value}%`, 'Score']} /><Bar dataKey="score" radius={[5, 5, 0, 0]}>{topicData.map((item, index) => <Cell key={item.name} fill={item.score < 60 ? '#e5a044' : chartColors[index % chartColors.length]} />)}</Bar></BarChart></ResponsiveContainer></div></article>
            <article className="chart-card gap-chart-card"><div className="chart-card-heading"><div><h3>Readiness snapshot</h3><p>Opportunity to grow</p></div></div><div className="chart-container pie-container"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} dataKey="value" innerRadius={69} outerRadius={91} paddingAngle={4} startAngle={90} endAngle={-270}><Cell fill="#164a85" /><Cell fill="#edf0f4" /></Pie><Tooltip formatter={(value) => `${value}%`} /></PieChart></ResponsiveContainer><div className="pie-center"><strong>{result.overall}%</strong><small>ready today</small></div></div><div className="pie-legend"><span><i /> Current strengths <b>{result.overall}%</b></span><span><i /> Growth opportunity <b>{result.skillGap}%</b></span></div></article></div>
          <div className="analysis-insights"><article className="insight-card strengths-card"><div className="insight-heading"><span><Award size={18} /></span><div><h3>Your strengths</h3><p>Areas where you are building confidence</p></div></div>{result.strengths.length ? result.strengths.map((item) => <div className="insight-row" key={item.name}><CheckCircle2 size={16} /><span>{item.name}</span><b>{item.score}%</b></div>) : <div className="insight-empty">Keep practicing to build your first standout strength.</div>}</article><article className="insight-card focus-card"><div className="insight-heading"><span><Lightbulb size={18} /></span><div><h3>Recommended focus</h3><p>Small, practical steps to close your skill gap</p></div></div>{result.weaknesses.length ? result.weaknesses.map((item) => <div className="insight-row" key={item.name}><Target size={16} /><span>{item.name}</span><b>{item.score}%</b></div>) : <div className="insight-empty">Strong performance across all topics—keep revising and applying your knowledge.</div>}</article></div>
          <div className="personalized-action"><div className="action-sparkle"><Sparkles size={21} /></div><div><span className="section-kicker">YOUR RECOMMENDED NEXT STEP</span><h3>Focus on {result.weaknesses.length ? result.weaknesses.slice(0, 2).map((item) => item.name).join(' and ') : 'hands-on practice and industry exposure'}.</h3><p>Suggested career direction: <strong>{recommendation}</strong>. This is a learning recommendation, not a job guarantee.</p></div><Link className="button button-primary" to="/student/training">Build these skills <ArrowRight size={16} /></Link></div>
        </>}
      </div>
    </StudentLayout>
  )
}

function BrainCircuitIcon() {
  return <Activity size={17} />
}

const careerSkills = {
  'Diesel Service Technician': ['Diesel engine service', 'Fuel systems', 'Workshop safety', 'BS6 after-treatment', 'Diagnostic workflow'],
  'Automotive Diagnostic Technician': ['OBD scanner use', 'Sensors and ECU', 'Systematic troubleshooting', 'Live-data interpretation', 'Electrical diagnosis'],
  'EV Technician': ['Electrical fundamentals', 'Safety procedures', 'Battery systems', 'High-voltage isolation', 'BMS and motor controls'],
  'Workshop Supervisor': ['Repair quality', 'Team coordination', 'Customer communication', 'Job-card planning', 'Digital service tools'],
  'Automotive Service Advisor': ['Vehicle basics', 'Communication', 'Customer care', 'Estimation and documentation', 'Service software'],
  'Garage Entrepreneur': ['Hands-on repair', 'Customer trust', 'Planning', 'Business basics', 'Digital diagnostics and records'],
}

function readinessForCareer(title, result) {
  if (!result) return 0
  const matching = result.topics.filter((topic) => careerSkills[title]?.some((skill) => skill.toLowerCase().includes(topic.name.toLowerCase().split(' ')[0]) || topic.name.toLowerCase().includes(skill.toLowerCase().split(' ')[0])))
  return Math.min(95, Math.max(25, Math.round((matching.length ? matching.reduce((sum, item) => sum + item.score, 0) / matching.length : result.overall) * 0.75 + 15)))
}

export function CareerRoadmap() {
  const { user } = useAuth()
  const result = getMyResult(user)
  const recommended = recommendationFor(result)
  return (
    <StudentLayout>
      <div className="careers-page">
        <PageHeading kicker="PLAN YOUR NEXT MOVE" title="Career roadmap" description="Explore possible careers, understand the skills behind them and choose a practical next step." />
        <div className="roadmap-path"><span className="section-kicker">A POSSIBLE JOURNEY</span><div className="roadmap-stages">{['ITI student', 'Skill development', 'Industry training', 'Entry-level job', 'Advanced technician', 'Supervisor / entrepreneur'].map((step, index) => <div className="roadmap-stage" key={step}><span>{index + 1}</span><strong>{step}</strong>{index < 5 && <i />}</div>)}</div></div>
        <div className="career-rec-banner"><span className="career-rec-icon"><Sparkles size={20} /></span><div><span className="section-kicker">PERSONALIZED DIRECTION</span><h2>{result ? recommended : 'Your career match is waiting.'}</h2><p>{result ? `Suggested from your ${result.overall}% assessment score. Your result is a starting point for exploration—not a fixed decision.` : 'Complete your skill assessment to see a career direction based on your current skills.'}</p></div>{!result && <Link className="button button-primary" to="/student/assessment">Take assessment <ArrowRight size={16} /></Link>}</div>
        <div className="career-grid">{careers.map((career, index) => {
          const readiness = readinessForCareer(career.title, result)
          const isRecommended = result && career.title === recommended
          const needToImprove = career.skills.slice(3)
          return <article className={`career-card ${isRecommended ? 'career-recommended' : ''}`} key={career.title}><div className="career-card-top"><span className={`career-icon career-icon-${index}`}><CareerIcon title={career.title} /></span>{isRecommended && <span className="recommended-pill"><Sparkles size={12} /> Suggested for you</span>}</div><h3>{career.title}</h3><div className="career-readiness"><span>Current skill readiness</span><b>{result ? `${readiness}%` : 'Complete assessment'}</b></div><div className="progress-track"><span style={{ width: `${readiness}%` }} /></div><div className="career-detail-group"><strong>Useful skills</strong><div className="skill-chip-list">{career.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div></div><div className="career-detail-group"><strong>{result ? 'Skills to keep building' : 'Skills to develop'}</strong><p>{needToImprove.join(' · ') || career.skills.slice(0, 2).join(' · ')}</p></div><div className="career-detail-group"><strong>Where you could work</strong><p>{career.demand}</p></div><div className="career-card-bottom"><span><TrendingUp size={14} /> {career.progression}</span><small>{career.salary}</small></div></article>
        })}</div>
        <div className="career-disclaimer"><ShieldCheck size={17} /><span>Career pathways and salary figures are illustrative estimates for exploration. Actual roles, pay and progression vary by employer, location and experience.</span></div>
      </div>
    </StudentLayout>
  )
}

function CareerIcon({ title }) {
  if (title.includes('EV')) return <BatteryCharging size={21} />
  if (title.includes('Diagnostic')) return <ScanLine size={21} />
  if (title.includes('Supervisor')) return <UsersRound size={21} />
  if (title.includes('Advisor')) return <ClipboardCheck size={21} />
  if (title.includes('Entrepreneur')) return <BriefcaseBusiness size={21} />
  return <Wrench size={21} />
}

export function TrainingProgram() {
  const { user } = useAuth()
  const queryDay = Number(new URLSearchParams(window.location.search).get('day'))
  const [selectedId, setSelectedId] = useState(trainingModules.some((item) => item.id === queryDay) ? queryDay : 1)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizResult, setQuizResult] = useState(null)
  const [notice, setNotice] = useState('')
  const customModules = readStore(storageKeys.modules, [])
  const modules = useMemo(() => [...trainingModules, ...customModules.map((item, index) => ({ ...item, id: trainingModules.length + index + 1, objective: item.objective || item.description || 'Review this teacher-added learning module.', content: item.content || item.description || 'Use the shared learning notes and ask your teacher for guided practice.', quiz: trainingModules[0].quiz }))], [customModules])
  const selected = modules.find((item) => item.id === selectedId) || modules[0]
  const progressMap = readStore(storageKeys.progress, {})
  const completed = progressMap[user.id] || []
  const isComplete = completed.includes(selectedId)
  useEffect(() => { setQuizAnswers({}); setQuizResult(null); setNotice('') }, [selectedId])
  const completeLesson = () => {
    const saved = readStore(storageKeys.progress, {})
    saved[user.id] = Array.from(new Set([...(saved[user.id] || []), selectedId]))
    if (writeStore(storageKeys.progress, saved)) setNotice(`Day ${selectedId} marked as complete. Great work!`)
  }
  const downloadNotes = () => {
    const content = `ITI Skill Navigator — Day ${selectedId}: ${selected.title}\n\nLearning objective\n${selected.objective}\n\nTopic notes\n${selected.content}\n\nPrototype learning resource. Follow your instructor and official workshop safety procedures.`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `day-${selectedId}-learning-notes.txt`
    anchor.click()
    URL.revokeObjectURL(url)
    setNotice('Sample lesson notes downloaded.')
  }
  const submitMiniQuiz = () => {
    const correct = selected.quiz.filter((item, index) => quizAnswers[index] === item.answer).length
    setQuizResult(correct)
    if (correct >= 4) completeLesson()
  }

  return (
    <StudentLayout>
      <div className="training-page">
        <PageHeading kicker="LEARN AT YOUR OWN PACE" title="15-day skill development" description="A guided introduction to modern automotive systems, diagnostics and workplace readiness." />
        <div className="training-progress-banner"><span className="training-progress-icon"><BookOpenCheck size={21} /></span><div><strong>{completed.length} of 15 learning days completed</strong><small>Every lesson is a practical step toward your next opportunity.</small></div><div className="training-progress-track"><span style={{ width: `${Math.min(100, (completed.length / 15) * 100)}%` }} /></div></div>
        <div className="training-layout"><aside className="day-list-panel"><div className="day-list-heading"><div><h3>Programme plan</h3><p>15 guided learning days</p></div><span>{completed.length}/15</span></div><div className="day-list">{modules.map((module, index) => <button key={module.id} className={`day-list-item ${module.id === selectedId ? 'day-list-active' : ''} ${completed.includes(module.id) ? 'day-list-complete' : ''}`} onClick={() => setSelectedId(module.id)}><span className="day-list-number">{completed.includes(module.id) ? <Check size={15} /> : String(index + 1).padStart(2, '0')}</span><span className="day-list-copy"><small>DAY {String(index + 1).padStart(2, '0')}</small><strong>{module.title}</strong></span><ChevronRight size={15} /></button>)}</div></aside>
          <section className="lesson-panel"><div className="lesson-title-row"><div><span className="section-kicker">DAY {String(selectedId).padStart(2, '0')} · GUIDED LESSON</span><h2>{selected.title}</h2></div>{isComplete && <span className="completed-pill"><CheckCircle2 size={15} /> Completed</span>}</div><div className="lesson-objective"><Target size={18} /><div><strong>Learning objective</strong><p>{selected.objective}</p></div></div><article className="lesson-content"><h3>Today’s learning</h3><p>{selected.content}</p><p>Take notes as you go, connect the concepts to workshop demonstrations and ask your instructor before attempting any unfamiliar procedure.</p></article><div className="demo-video-card"><span className="demo-video-icon"><BookOpen size={22} /></span><div><span className="demo-video-label">LEARNING MEDIA</span><h3>Instructor-led video resource</h3><p>Video lesson placeholder · This prototype does not embed unverified videos. Ask your instructor to add a reviewed learning resource.</p></div><span className="demo-video-badge">DEMO RESOURCE</span></div><button className="button button-outline notes-button" onClick={downloadNotes}><Download size={16} /> Download sample lesson notes</button>
            <div className="mini-quiz-card"><div className="mini-quiz-heading"><span className="quiz-mark"><ClipboardCheck size={19} /></span><div><span className="section-kicker">QUICK KNOWLEDGE CHECK</span><h3>5-question mini quiz</h3><p>Check what you understood from today’s lesson.</p></div></div><div className="mini-quiz-questions">{selected.quiz.map((item, questionIndex) => <div className="mini-question" key={`${selectedId}-${questionIndex}`}><strong>{questionIndex + 1}. {item.question}</strong><div>{item.options.map((option, optionIndex) => <label key={option} className={quizAnswers[questionIndex] === optionIndex ? 'mini-option-selected' : ''}><input type="radio" name={`mini-${selectedId}-${questionIndex}`} checked={quizAnswers[questionIndex] === optionIndex} onChange={() => setQuizAnswers((value) => ({ ...value, [questionIndex]: optionIndex }))} /><span>{option}</span></label>)}</div></div>)}</div><div className="mini-quiz-footer"><button className="button button-primary" onClick={submitMiniQuiz} disabled={Object.keys(quizAnswers).length < selected.quiz.length}>Check answers <ArrowRight size={16} /></button>{quizResult !== null && <span className={`quiz-result ${quizResult >= 4 ? 'quiz-result-pass' : ''}`}>{quizResult}/5 correct {quizResult >= 4 ? '· Lesson completed!' : '· Review the lesson and try again.'}</span>}</div></div>
            <div className="lesson-complete-row"><div><strong>Finished this lesson?</strong><small>Mark the day complete to track your learning progress.</small></div><button className={`button ${isComplete ? 'button-completed' : 'button-primary'}`} onClick={completeLesson} disabled={isComplete}>{isComplete ? <><Check size={16} /> Day completed</> : <>Mark as completed <Check size={16} /></>}</button></div>
            {notice && <p className="inline-success" role="status">{notice}</p>}
          </section></div>
      </div>
    </StudentLayout>
  )
}

export function JobBoard() {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('All locations')
  const [trade, setTrade] = useState('All trades')
  const [selectedJob, setSelectedJob] = useState(null)
  const jobs = sampleJobs.filter((job) => {
    const matchesText = `${job.title} ${job.company} ${job.skills.join(' ')}`.toLowerCase().includes(query.toLowerCase())
    return matchesText && (location === 'All locations' || job.location === location) && (trade === 'All trades' || job.trade === trade)
  })
  const page = <div className="jobs-page"><PageHeading kicker="INDUSTRY CONNECT · SAMPLE LISTINGS" title="Find your next opportunity." description="Explore illustrative automotive and technical roles around Maharashtra. Always verify a vacancy directly with the employer." />
    <div className="jobs-sample-banner"><ShieldCheck size={17} /><span><strong>Prototype listings:</strong> These sample job posts are not verified vacancies. Salary ranges are illustrative, not guaranteed.</span></div>
    <div className="jobs-toolbar"><label className="job-search"><Search size={17} /><input placeholder="Search role, company or skill..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><label className="filter-select"><span className="sr-only">Filter by location</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option>All locations</option><option>Mumbai</option><option>Thane</option><option>Pune</option></select></label><label className="filter-select"><span className="sr-only">Filter by trade</span><select value={trade} onChange={(event) => setTrade(event.target.value)}><option>All trades</option>{['Diesel Mechanic', 'Electrician', 'Fitter', 'Welder', 'Motor Mechanic Vehicle'].map((value) => <option key={value}>{value}</option>)}</select></label></div>
    <div className="jobs-results-heading"><h2>Opportunities to explore <span>{jobs.length}</span></h2><span>Sample demo listings · Maharashtra</span></div>
    {jobs.length ? <div className="jobs-grid">{jobs.map((job) => <article className="job-card" key={job.id}><div className="job-company-row"><span className="job-company-mark"><BriefcaseBusiness size={19} /></span><span className="sample-tag">SAMPLE</span></div><span className="job-company">{job.company}</span><h3>{job.title}</h3><div className="job-location"><MapPin size={14} /> {job.location} <i /> {job.experience}</div><div className="job-details-line"><span>Qualification</span><strong>{job.qualification}</strong></div><div className="job-skills">{job.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="job-card-footer"><span className="job-salary">{job.salary}</span><button className="button button-outline" onClick={() => setSelectedJob(job)}>View details <ArrowRight size={15} /></button></div></article>)}</div> : <div className="empty-search"><Search size={25} /><h3>No matching sample listings</h3><p>Try changing your search terms or filters.</p><button className="button button-outline" onClick={() => { setQuery(''); setLocation('All locations'); setTrade('All trades') }}>Clear filters <RotateCcw size={15} /></button></div>}
    {selectedJob && <div className="modal-backdrop" onClick={() => setSelectedJob(null)}><section className="job-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="job-modal-title"><button className="modal-close" onClick={() => setSelectedJob(null)} aria-label="Close job details"><X size={20} /></button><span className="sample-tag">SAMPLE LISTING</span><span className="job-company">{selectedJob.company}</span><h2 id="job-modal-title">{selectedJob.title}</h2><div className="job-location"><MapPin size={14} /> {selectedJob.location} <i /> {selectedJob.experience}</div><p>{selectedJob.detail}</p><div className="job-modal-info"><div><span>Qualification</span><strong>{selectedJob.qualification}</strong></div><div><span>Illustrative pay range</span><strong>{selectedJob.salary}</strong></div><div><span>Skills</span><strong>{selectedJob.skills.join(' · ')}</strong></div></div><a className="button button-primary button-full" href={`https://wa.me/919876543210?text=${encodeURIComponent(`DEMO ENQUIRY — ${selectedJob.title} (${selectedJob.company}). I understand this is a sample listing and will verify vacancies directly.`)}`} target="_blank" rel="noreferrer">Contact demo number on WhatsApp <ArrowRight size={16} /></a><small className="demo-contact-note">Demo contact only: +91 98765 43210 · Not an employer contact.</small></section></div>}
    </div>
  return user?.role === 'student' ? <StudentLayout>{page}</StudentLayout> : <PublicLayout>{page}</PublicLayout>
}
