const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  income: { type: Number, required: true },
  expenses: { type: Number, required: true },
  savings: { type: Number, required: true },
  debt: { type: Number, required: true },
  score: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Score', scoreSchema)