import { ArrowDown, ArrowRight, Award, BatteryCharging, BookOpenCheck, BrainCircuit, BriefcaseBusiness, CheckCircle2, GraduationCap, IndianRupee, Layers3, MapPin, ScanLine, ShieldCheck, Sparkles, Target, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PublicLayout } from '../components/PageLayout'
import { useLanguage } from '../context/LanguageContext'

const featureCards = [
  { icon: BrainCircuit, title: 'Know your strengths', body: 'A practical assessment maps your aptitude and trade knowledge into a clear starting point.' },
  { icon: Target, title: 'Build the right skills', body: 'Get a focused learning path for modern automotive technologies and industry readiness.' },
  { icon: BriefcaseBusiness, title: 'Find your next step', body: 'Explore career pathways and sample opportunities that connect your training to work.' },
]
const steps = ['Register', 'Assess', 'Learn', 'Get guidance', 'Explore jobs']

export default function LandingPage() {
  const { t } = useLanguage()
  return (
    <PublicLayout>
      <section className="hero-section">
        <div className="hero-grid-pattern" />
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> SEVA First Innovation Challenge · Maharashtra Zone</div>
            <h1>Your skills.<br /><span>Your future.</span><br />Your career starts here.</h1>
            <p className="hero-subtitle">An AI-powered career guidance and skill development platform designed to empower ITI students for tomorrow’s industries.</p>
            <div className="hero-actions">
              <Link className="button button-primary button-large" to="/student/register">{t('startAssessment')} <ArrowRight size={18} /></Link>
              <Link className="button button-outline-light button-large" to="/jobs">{t('exploreJobs')}</Link>
            </div>
            <div className="hero-trust"><ShieldCheck size={17} /> Built for ITI students · Free demo · Marathi, Hindi & English</div>
          </div>
          <div className="hero-visual" aria-label="Career skills overview illustration">
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <div className="hero-visual-top"><div className="mini-brand"><span className="mini-brand-icon"><GraduationCap size={19} /></span><span>ITI SKILL<br /><b>NAVIGATOR</b></span></div><span className="live-tag"><span /> YOUR NEXT STEP</span></div>
            <div className="hero-visual-center"><div className="hero-student-graphic"><div className="graphic-sun" /><div className="graphic-person"><span className="graphic-head" /><span className="graphic-body" /></div><div className="graphic-gear">✳</div><div className="graphic-book"><BookOpenCheck size={22} /></div></div><div className="hero-score-card"><span className="score-check"><CheckCircle2 size={16} /></span><span><b>Career-ready skills</b><small>Your journey, your pace</small></span><ArrowRight size={16} /></div></div>
            <div className="hero-floating-card float-card-one"><span className="float-icon float-orange"><Wrench size={17} /></span><span><small>Trade skills</small><b>Diesel · EV · BS6</b></span></div>
            <div className="hero-floating-card float-card-two"><span className="float-icon float-blue"><Award size={17} /></span><span><small>Personalized</small><b>Career roadmap</b></span></div>
            <div className="hero-bottom-note"><span className="hero-avatar-stack"><i>A</i><i>S</i><i>R</i></span><span>For the next generation of skilled India</span></div>
          </div>
        </div>
        <a className="hero-scroll" href="#impact"><span>Explore the platform</span><ArrowDown size={16} /></a>
      </section>

      <section className="impact-section" id="impact"><div className="container impact-grid">
        {[['1,10,000+', 'ITI students across Maharashtra', GraduationCap], ['500+', 'students reached every year', Award], ['15 days', 'focused skill programme', BookOpenCheck], ['3 languages', 'English · हिंदी · मराठी', Layers3]].map(([value, label, Icon]) => <div className="impact-item" key={value}><span className="impact-icon"><Icon size={20} /></span><div><strong>{value}</strong><span>{label}</span></div></div>)}
      </div></section>

      <section className="section-pad" id="about"><div className="container problem-layout">
        <div className="section-heading left-heading"><span className="section-kicker">WHY SKILL NAVIGATOR</span><h2>Training should lead to <span>opportunity.</span></h2><p>ITI students have the talent. The missing link is often access to current industry knowledge, clear guidance and a bridge to work.</p><Link className="text-link" to="/student/register">Start your journey <ArrowRight size={17} /></Link></div>
        <div className="problem-cards"><div className="problem-card"><span className="problem-number">01</span><div><h3>Technology is moving fast</h3><p>BS6 systems, EVs and digital diagnostics are reshaping automotive work.</p></div></div><div className="problem-card"><span className="problem-number">02</span><div><h3>Career paths aren’t always clear</h3><p>Students need help finding strengths, identifying gaps and choosing what to learn next.</p></div></div><div className="solution-card"><Sparkles size={21} /><div><h3>A guided path from classroom to career</h3><p>One place to assess, learn, get guidance and discover opportunities.</p></div></div></div>
      </div></section>

      <section className="section-pad features-section" id="features"><div className="container"><div className="section-heading centered-heading"><span className="section-kicker">ONE PLATFORM. PRACTICAL PROGRESS.</span><h2>Make your next move <span>with confidence.</span></h2><p>Designed around the way ITI students learn, grow and prepare for work.</p></div><div className="feature-grid">{featureCards.map(({ icon: Icon, title, body }, index) => <article className="feature-card" key={title}><span className={`feature-icon feature-icon-${index}`}><Icon size={23} /></span><span className="feature-index">0{index + 1}</span><h3>{title}</h3><p>{body}</p><Link to={index === 2 ? '/jobs' : '/student/register'}>Explore <ArrowRight size={15} /></Link></article>)}</div></div></section>

      <section className="section-pad workflow-section"><div className="container"><div className="section-heading centered-heading"><span className="section-kicker">YOUR JOURNEY</span><h2>From ITI student to <span>industry-ready.</span></h2></div><div className="journey-steps">{steps.map((step, index) => <div className="journey-step" key={step}><span className="journey-number">{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>{index < steps.length - 1 && <span className="journey-arrow"><ArrowRight size={17} /></span>}</div>)}</div></div></section>

      <section className="technology-section"><div className="container technology-layout"><div><span className="section-kicker">TOMORROW’S WORKSHOP STARTS TODAY</span><h2>Learn the technologies<br />reshaping the industry.</h2><p>Build familiarity with the systems employers increasingly expect technicians to understand.</p><Link className="button button-primary" to="/student/training">Explore the 15-day programme <ArrowRight size={17} /></Link></div><div className="tech-cards"><div className="tech-card"><span className="tech-icon saffron"><Layers3 size={22} /></span><span><b>BS6</b><small>Cleaner emission systems</small></span></div><div className="tech-card"><span className="tech-icon green"><BatteryCharging size={22} /></span><span><b>Electric Vehicles</b><small>EV fundamentals & safety</small></span></div><div className="tech-card"><span className="tech-icon blue"><ScanLine size={22} /></span><span><b>OBD Diagnostics</b><small>Scan, interpret, verify</small></span></div><div className="tech-stat"><IndianRupee size={19} /><span><b>Skills that keep you moving</b><small>Learn safely. Practice with guidance.</small></span></div></div></div></section>

      <section className="institute-section"><div className="container institute-inner"><div className="institute-icon"><MapPin size={24} /></div><div><span className="section-kicker">ROOTED IN MULUND · BUILT FOR MAHARASHTRA</span><h2>Government Industrial Training Institute</h2><p>Mulund, Mumbai-82 · An initiative for students across Maharashtra</p></div><Link className="button button-white" to="/teacher/login">Explore the teacher dashboard <ArrowRight size={17} /></Link></div></section>

      <footer className="site-footer"><div className="container footer-inner"><Link to="/" className="brand footer-brand"><span className="brand-mark"><GraduationCap size={22} /></span><span className="brand-copy"><strong>ITI Skill Navigator</strong><small>Learn · Grow · Succeed</small></span></Link><p>Empowering ITI students for tomorrow’s industries.</p><div className="footer-links"><Link to="/student/login">Student login</Link><Link to="/teacher/login">Teacher login</Link><Link to="/jobs">Sample job board</Link></div></div><div className="container footer-bottom"><span>© 2026 ITI Skill Navigator · Prototype for SEVA First Innovation Challenge</span><span>Demonstration project · Sample data only</span></div></footer>
    </PublicLayout>
  )
}
