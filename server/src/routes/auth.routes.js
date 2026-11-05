const express = require('express')
const router = express.Router()
const { register, login, teacherLogin, getMe } = require('../controllers/auth.controller')
const { protect } = require('../middleware/auth.middleware')

router.post('/register', register)
router.post('/login', login)
router.post('/teacher-login', teacherLogin)
router.get('/me', protect, getMe)

module.exports = router 