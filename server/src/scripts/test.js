require('dotenv').config({ path: '../../.env' })
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected')

    const hashed = await bcrypt.hash('teacher@123', 12)
    console.log('bcrypt works:', hashed)

    const userSchema = new mongoose.Schema({
      name: String,
      mobile: { type: String, unique: true },
      password: String,
      role: String,
      iti: String,
    })

    const User = mongoose.model('User', userSchema)

    await User.create({
      name: 'ITI Instructor',
      mobile: '9999999999',
      password: hashed,
      role: 'teacher',
      iti: 'Government ITI Mulund',
    })

    console.log('Teacher created successfully')
    process.exit(0)
  } catch (error) {
    console.error('Full error:', error)
    process.exit(1)
  }
}

test()