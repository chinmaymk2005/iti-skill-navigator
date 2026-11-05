const KEYS = {
  students: 'iti_students',
  activeUser: 'iti_active_user',
  results: 'iti_assessment_results',
  answers: 'iti_assessment_answers',
  progress: 'iti_training_progress',
  chats: 'iti_chat_history',
  modules: 'iti_custom_modules',
}

export const readStore = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch (error) {
    console.error(`Unable to read ${key} from localStorage`, error)
    return fallback
  }
}

export const writeStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Unable to save ${key} to localStorage`, error)
    return false
  }
}

export const storageKeys = KEYS

export function resetDemoData() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key))
}

export function getStudentResults(studentId) {
  const results = readStore(KEYS.results, {})
  return results[studentId] || null
}

export function saveStudentResult(studentId, result) {
  const results = readStore(KEYS.results, {})
  results[studentId] = result
  return writeStore(KEYS.results, results)
}

export function seedDemoStudents() {
  if (readStore(KEYS.students, null)) return
  writeStore(KEYS.students, [
    { id: 'demo-1', name: 'Aarav Patil', mobile: '9000000001', iti: 'Government ITI Mulund', trade: 'Diesel Mechanic', year: '2nd Year', language: 'English' },
    { id: 'demo-2', name: 'Sana Shaikh', mobile: '9000000002', iti: 'Government ITI Mumbai', trade: 'Electrician', year: '2nd Year', language: 'मराठी' },
    { id: 'demo-3', name: 'Rohan Jadhav', mobile: '9000000003', iti: 'Government ITI Thane', trade: 'Fitter', year: '1st Year', language: 'हिंदी' },
    { id: 'demo-4', name: 'Priya More', mobile: '9000000004', iti: 'Government ITI Pune', trade: 'Motor Mechanic Vehicle', year: '2nd Year', language: 'मराठी' },
    { id: 'demo-5', name: 'Imran Khan', mobile: '9000000005', iti: 'Government ITI Mulund', trade: 'Diesel Mechanic', year: '2nd Year', language: 'हिंदी' },
    { id: 'demo-6', name: 'Neha Shinde', mobile: '9000000006', iti: 'Government ITI Nashik', trade: 'Welder', year: '1st Year', language: 'मराठी' },
    { id: 'demo-7', name: 'Vivek Pawar', mobile: '9000000007', iti: 'Government ITI Mumbai', trade: 'Electrician', year: '2nd Year', language: 'English' },
    { id: 'demo-8', name: 'Meera Deshmukh', mobile: '9000000008', iti: 'Government ITI Pune', trade: 'Diesel Mechanic', year: '2nd Year', language: 'English' },
    { id: 'demo-9', name: 'Akash Bhosale', mobile: '9000000009', iti: 'Government ITI Thane', trade: 'Motor Mechanic Vehicle', year: '1st Year', language: 'हिंदी' },
  ])
}
