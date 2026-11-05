require('dotenv').config({ path: '../../.env' })
const mongoose = require('mongoose')
const User = require('../models/User.model')

async function seedTeacher() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    const existing = await User.findOne({ mobile: '9999999999', role: 'teacher' })
    if (existing) {
      console.log('Teacher account already exists. Skipping.')
      process.exit(0)
    }

    await User.create({
      name: 'ITI Instructor',
      mobile: '9999999999',
      password: 'teacher@123',
      role: 'teacher',
      iti: 'Government Industrial Training Institute, Mulund, Mumbai-82',
    })

    console.log('Teacher account created successfully.')
    console.log('Mobile: 9999999999')
    console.log('Password: teacher@123')
    process.exit(0)
  } catch (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
}

seedTeacher()