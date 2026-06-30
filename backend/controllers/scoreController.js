const Score = require('../models/Score')
const axios = require('axios')

const ML_API_URL = 'https://finpulse-backend-4bi7.onrender.com/predict'

const callMLWithRetry = async (payload, retries = 5) => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await axios.post(ML_API_URL, payload, { timeout: 20000 })
    } catch (err) {
      if (i === retries) throw err
      console.log(`ML API attempt ${i + 1} failed, retrying in 10s...`)
      await new Promise(r => setTimeout(r, 10000))
    }
  }
}

const calculateScore = async (req, res) => {
  const { income, expenses, savings, debt } = req.body

  try {
    const mlResponse = await callMLWithRetry({ income, expenses, savings, debt })
    const { score, grade, label, color, insights, breakdown } = mlResponse.data

    if (req.userId) {
      const newScore = new Score({
        userId: req.userId,
        income, expenses, savings, debt,
        score,
        category: label
      })
      await newScore.save()
    }

    res.json({ score, grade, label, color, insights, breakdown })

  } catch (err) {
    console.log('ML API error after retries:', err.message)
    res.status(500).json({ message: 'Score service is waking up, please try again in a moment.' })
  }
}

const getHistory = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(10)
    res.json(scores)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { calculateScore, getHistory }