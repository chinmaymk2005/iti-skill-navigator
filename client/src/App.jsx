import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Chatbot from './components/Chatbot'
import { useAuth } from './context/AuthContext'
import { seedDemoStudents } from './utils/storage'
import LandingPage from './pages/LandingPage'
import { StudentLogin, StudentRegister, TeacherLogin } from './pages/AuthPages'
import { CareerRoadmap, JobBoard, SkillAnalysis, SkillAssessment, StudentDashboard, TrainingProgram } from './pages/StudentPages'
import TeacherDashboard, { StudentDetails } from './pages/TeacherDashboard'

function ProtectedRoute({ role, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to={role === 'teacher' ? '/teacher/login' : '/student/login'} replace />
  if (user.role !== role) return <Navigate to={user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'} replace />
  return children
}

export default function App() {
  useEffect(() => { seedDemoStudents() }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/assessment" element={<ProtectedRoute role="student"><SkillAssessment /></ProtectedRoute>} />
        <Route path="/student/analysis" element={<ProtectedRoute role="student"><SkillAnalysis /></ProtectedRoute>} />
        <Route path="/student/careers" element={<ProtectedRoute role="student"><CareerRoadmap /></ProtectedRoute>} />
        <Route path="/student/training" element={<ProtectedRoute role="student"><TrainingProgram /></ProtectedRoute>} />
        <Route path="/teacher/dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacher/students/:id" element={<ProtectedRoute role="teacher"><StudentDetails /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Chatbot />
    </>
  )
}
