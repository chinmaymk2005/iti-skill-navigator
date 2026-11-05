import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readStore, storageKeys, writeStore } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStore(storageKeys.activeUser, null))

  useEffect(() => {
    writeStore(storageKeys.activeUser, user)
  }, [user])

  const value = useMemo(() => ({
    user,
    registerStudent(student) {
      const students = readStore(storageKeys.students, [])
      const next = { ...student, id: `student-${Date.now()}`, role: 'student' }
      writeStore(storageKeys.students, [...students, next])
      setUser(next)
      return next
    },
    loginStudent(mobile) {
      const student = readStore(storageKeys.students, []).find((item) => item.mobile === mobile)
      if (!student) return false
      setUser({ ...student, role: 'student' })
      return true
    },
    loginDemoStudent() {
      const students = readStore(storageKeys.students, [])
      const student = students[0] || { id: 'demo-1', name: 'Aarav Patil', mobile: '9000000001', trade: 'Diesel Mechanic', iti: 'Government ITI Mulund', year: '2nd Year', language: 'English' }
      setUser({ ...student, role: 'student' })
    },
    loginTeacher() {
      setUser({ id: 'teacher-demo', name: 'ITI Instructor', role: 'teacher', iti: 'Government Industrial Training Institute, Mulund, Mumbai-82' })
    },
    logout() {
      setUser(null)
    },
    setActiveUser: setUser,
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used within AuthProvider')
  return value
}
