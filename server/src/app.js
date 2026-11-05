require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth.routes')

connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
    
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'ITI Skill Navigator API is running' }))
app.use('/api/auth', authRoutes)

app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found.' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))