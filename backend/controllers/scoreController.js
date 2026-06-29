const calculateScore = (req, res) => {
  const { income, expenses, savings, debt } = req.body

  // Calculate score out of 100
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

  res.json({ score, category })
}

module.exports = { calculateScore }