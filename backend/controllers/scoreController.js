const Score = require('../models/Score')

const calculateScore = async (req, res) => {
  const { income, expenses, savings, debt } = req.body

  const savingsRatio = (savings / income) * 100
  const debtRatio = (debt / income) * 100
  const expenseRatio = (expenses / income) * 100

  let score = 100
  if (savingsRatio < 10) score -= 30
  else if (savingsRatio < 20) score -= 15
  if (debtRatio > 50) score -= 30
  else if (debtRatio > 30) score -= 15
  if (expenseRatio > 80) score -= 20
  else if (expenseRatio > 60) score -= 10

  let category = ''
  if (score >= 75) category = 'Good 🟢'
  else if (score >= 50) category = 'Average 🟡'
  else category = 'Poor 🔴'

  // Save to database if user is logged in
  if (req.userId) {
    const newScore = new Score({
      userId: req.userId,
      income, expenses, savings, debt,
      score, category
    })
    await newScore.save()
  }

  res.json({ score, category })
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