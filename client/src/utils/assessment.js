import { assessmentQuestions } from '../data/questions'

export function calculateAssessment(answers) {
  const sectionScores = { Aptitude: { correct: 0, total: 0 }, Technical: { correct: 0, total: 0 } }
  const topicScores = {}
  assessmentQuestions.forEach((question, index) => {
    const section = sectionScores[question.section]
    section.total += 1
    const correct = answers[index] === question.answer
    if (correct) section.correct += 1
    const topic = topicScores[question.topic] || { correct: 0, total: 0 }
    topic.total += 1
    if (correct) topic.correct += 1
    topicScores[question.topic] = topic
  })
  const correctCount = Object.values(sectionScores).reduce((sum, item) => sum + item.correct, 0)
  const total = assessmentQuestions.length
  const aptitude = Math.round((sectionScores.Aptitude.correct / sectionScores.Aptitude.total) * 100)
  const technical = Math.round((sectionScores.Technical.correct / sectionScores.Technical.total) * 100)
  const overall = Math.round((correctCount / total) * 100)
  const topics = Object.entries(topicScores).map(([name, score]) => ({ name, score: Math.round((score.correct / score.total) * 100), correct: score.correct, total: score.total }))
  const sortedTopics = [...topics].sort((a, b) => b.score - a.score)
  const strengths = sortedTopics.filter((topic) => topic.score >= 60).slice(0, 3)
  const weaknesses = [...topics].filter((topic) => topic.score < 60).sort((a, b) => a.score - b.score).slice(0, 4)
  return { overall, aptitude, technical, correctCount, total, skillGap: 100 - overall, topics, strengths, weaknesses, completedAt: new Date().toISOString() }
}

export function recommendationFor(result) {
  if (!result) return 'Complete your skill assessment to unlock a personalized career recommendation.'
  if (result.technical >= 70 && result.topics.find((item) => item.name === 'OBD diagnostics')?.score >= 50) return 'Automotive Diagnostic Technician'
  if (result.topics.find((item) => item.name === 'EV fundamentals')?.score >= 50 && result.topics.find((item) => item.name === 'Battery technology')?.score >= 50) return 'EV Technician'
  return 'Diesel Service Technician'
}
