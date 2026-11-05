import { createContext, useContext, useMemo, useState } from 'react'
import { readStore, writeStore } from '../utils/storage'

const LanguageContext = createContext(null)
const dictionary = {
  English: { home: 'Home', about: 'About', features: 'Features', studentLogin: 'Student Login', teacherLogin: 'Teacher Login', dashboard: 'Dashboard', assessment: 'Skill Assessment', analysis: 'My Skill Analysis', careers: 'Career Roadmap', training: '15-Day Training', jobs: 'Explore Jobs', welcome: 'Welcome back', startAssessment: 'Start skill assessment', exploreJobs: 'Explore career opportunities', overallScore: 'Overall skill score', learningProgress: 'Learning progress', careerRecommendation: 'Career recommendation', careerToolkit: 'Your career toolkit', toolkitSummary: 'Everything you need to move forward, in one place.', assessmentCard: 'Take your skill assessment', retakeAssessment: 'Retake your skill assessment', analysisCard: 'My skill analysis', careersCard: 'Career roadmap', trainingCard: '15-day training', mentorCard: 'AI Career Mentor', jobsCard: 'Explore jobs', viewRoadmap: 'View career roadmap', save: 'Save', completed: 'Completed', reset: 'Reset Demo Data', logout: 'Log out' },
  हिंदी: { home: 'होम', about: 'परिचय', features: 'विशेषताएँ', studentLogin: 'विद्यार्थी लॉगिन', teacherLogin: 'शिक्षक लॉगिन', dashboard: 'डैशबोर्ड', assessment: 'कौशल आकलन', analysis: 'मेरा कौशल विश्लेषण', careers: 'करियर रोडमैप', training: '15-दिवसीय प्रशिक्षण', jobs: 'नौकरियाँ देखें', welcome: 'वापसी पर स्वागत है', startAssessment: 'कौशल आकलन शुरू करें', exploreJobs: 'करियर अवसर देखें', overallScore: 'कुल कौशल स्कोर', learningProgress: 'सीखने की प्रगति', careerRecommendation: 'करियर सुझाव', careerToolkit: 'आपका करियर टूलकिट', toolkitSummary: 'आगे बढ़ने के लिए ज़रूरी सब कुछ, एक ही जगह।', assessmentCard: 'अपना कौशल आकलन करें', retakeAssessment: 'कौशल आकलन फिर से करें', analysisCard: 'मेरा कौशल विश्लेषण', careersCard: 'करियर रोडमैप', trainingCard: '15-दिवसीय प्रशिक्षण', mentorCard: 'AI करियर मेंटर', jobsCard: 'नौकरियाँ देखें', viewRoadmap: 'करियर रोडमैप देखें', save: 'सहेजें', completed: 'पूर्ण', reset: 'डेमो डेटा रीसेट करें', logout: 'लॉग आउट' },
  मराठी: { home: 'मुख्यपृष्ठ', about: 'आमच्याबद्दल', features: 'वैशिष्ट्ये', studentLogin: 'विद्यार्थी लॉगिन', teacherLogin: 'शिक्षक लॉगिन', dashboard: 'डॅशबोर्ड', assessment: 'कौशल्य मूल्यमापन', analysis: 'माझे कौशल्य विश्लेषण', careers: 'करिअर रोडमॅप', training: '१५-दिवसीय प्रशिक्षण', jobs: 'नोकऱ्या पहा', welcome: 'पुन्हा स्वागत आहे', startAssessment: 'कौशल्य मूल्यमापन सुरू करा', exploreJobs: 'करिअरच्या संधी पहा', overallScore: 'एकूण कौशल्य गुण', learningProgress: 'शिकण्याची प्रगती', careerRecommendation: 'करिअर शिफारस', careerToolkit: 'तुमचे करिअर टूलकिट', toolkitSummary: 'पुढे जाण्यासाठी आवश्यक सर्व काही, एकाच ठिकाणी.', assessmentCard: 'कौशल्य मूल्यमापन करा', retakeAssessment: 'कौशल्य मूल्यमापन पुन्हा करा', analysisCard: 'माझे कौशल्य विश्लेषण', careersCard: 'करिअर रोडमॅप', trainingCard: '१५-दिवसीय प्रशिक्षण', mentorCard: 'AI करिअर मार्गदर्शक', jobsCard: 'नोकऱ्या पहा', viewRoadmap: 'करिअर रोडमॅप पहा', save: 'जतन करा', completed: 'पूर्ण', reset: 'डेमो डेटा रीसेट करा', logout: 'लॉग आउट' },
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => readStore('iti_language', 'English'))
  const setLanguage = (next) => {
    setLanguageState(next)
    writeStore('iti_language', next)
  }
  const value = useMemo(() => ({ language, setLanguage, t: (key) => dictionary[language]?.[key] || dictionary.English[key] || key }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used within LanguageProvider')
  return value
}
