const Score = require('../models/Score')
const axios = require('axios')

const ML_API_URL = 'https://finpulse-backend-4bi7.onrender.com/predict'

const calculateScore = async (req, res) => {
  const { income, expenses, savings, debt } = req.body

  try {
    // Call the ML model API
    const mlResponse = await axios.post(ML_API_URL, {
      income, expenses, savings, debt
    })

    const { score, grade, label, color, insights, breakdown } = mlResponse.data

    // Save to database if user is logged in
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
    console.log('ML API error:', err.message)
    res.status(500).json({ message: 'Failed to calculate score. Please try again.' })
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