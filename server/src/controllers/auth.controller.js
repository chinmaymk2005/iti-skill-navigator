const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

function signToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

function sendToken(user, statusCode, res) {
  const token = signToken(user._id, user.role)
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      mobile: user.mobile,
      role: user.role,
      iti: user.iti,
      trade: user.trade,
      year: user.year,
      language: user.language,
    },
  })
}

exports.register = async (req, res) => {
  try {
    const { name, mobile, password, iti, trade, year, language } = req.body

    if (!name || !mobile || !password) {
      return res.status(400).json({ success: false, message: 'Name, mobile and password are required.' })
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Enter a valid 10-digit Indian mobile number.' })
    }
    if (password.length < 4) {
      return res.status(400).json({ success: false, message: 'Password must be at least 4 characters.' })
    }

    const existing = await User.findOne({ mobile })
    if (existing) {
      return res.status(409).json({ success: false, message: 'This mobile number is already registered.' })
    }

    const user = await User.create({ name, mobile, password, role: 'student', iti, trade, year, language })
    sendToken(user, 201, res)
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ success: false, message: 'Registration failed. Please try again.' })
  }
}

exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body
    if (!mobile || !password) {
      return res.status(400).json({ success: false, message: 'Mobile and password are required.' })
    }

    const user = await User.findOne({ mobile, role: 'student' })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid mobile number or password.' })
    }

    sendToken(user, 200, res)
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Login failed. Please try again.' })
  }
}

exports.teacherLogin = async (req, res) => {
  try {
    const { password } = req.body
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required.' })
    }
    if (password !== process.env.TEACHER_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Incorrect teacher password.' })
    }

    // Teacher is not stored in DB — return a fixed token
    const token = jwt.sign(
      { id: 'teacher-001', role: 'teacher' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )
    res.status(200).json({
      success: true,
      token,
      user: {
        id: 'teacher-001',
        name: 'ITI Instructor',
        role: 'teacher',
        iti: 'Government Industrial Training Institute, Mulund, Mumbai-82',
      },
    })
  } catch (error) {
    console.error('Teacher login error:', error)
    res.status(500).json({ success: false, message: 'Login failed. Please try again.' })
  }
}

exports.getMe = async (req, res) => {
  try {
    if (req.user.role === 'teacher') {
      return res.status(200).json({
        success: true,
        user: {
          id: 'teacher-001',
          name: 'ITI Instructor',
          role: 'teacher',
          iti: 'Government Industrial Training Institute, Mulund, Mumbai-82',
        },
      })
    }
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' })
    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch user.' })
  }
}