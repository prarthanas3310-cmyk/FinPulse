const express = require('express')
const router = express.Router()
const { calculateScore, getHistory } = require('../controllers/scoreController')
const authMiddleware = require('../middleware/auth')

router.post('/calculate', authMiddleware, calculateScore)
router.get('/history', authMiddleware, getHistory)

module.exports = router