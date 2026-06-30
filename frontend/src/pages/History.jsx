import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

function History() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const res = await axios.get('https://finpulse-node-backend.onrender.com/api/history', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setHistory(res.data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const getColor = (score) => {
    if (score >= 75) return '#22c55e'
    if (score >= 50) return '#eab308'
    return '#ef4444'
  }

  const scores = history.map(h => h.score)
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const highScore = scores.length ? Math.max(...scores) : 0
  const lowScore = scores.length ? Math.min(...scores) : 0

  const statCards = [
    { label: 'Average Score', value: avgScore, color: '#667eea' },
    { label: 'Highest Score', value: highScore, color: '#22c55e' },
    { label: 'Lowest Score', value: lowScore, color: '#ef4444' },
    { label: 'Total Checks', value: history.length, color: '#764ba2' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: 'Arial' }}>
      <Navbar />
      <div style={{ padding: '100px 20px 40px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '25px' }}>📊 Score History</h2>

        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>
        ) : history.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
            <p style={{ color: '#888' }}>No history yet! Check your score first.</p>
            <button onClick={() => navigate('/form')} style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white', border: 'none', padding: '12px 30px',
              borderRadius: '50px', cursor: 'pointer', marginTop: '15px'
            }}>Check Score Now</button>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '25px' }}>
              {statCards.map((stat, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: '16px', padding: '18px',
                  textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  animation: `fadeUp 0.4s ease ${i * 0.08}s both`
                }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* History List */}
            {history.map((item, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: '16px',
                padding: '20px', marginBottom: '12px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                animation: `fadeUp 0.4s ease ${(i + statCards.length) * 0.06}s both`
              }}>
                <div>
                  <p style={{ margin: '0 0 5px', color: '#333', fontWeight: 'bold' }}>
                    Income: ₹{item.income} | Expenses: ₹{item.expenses}
                  </p>
                  <p style={{ margin: '0 0 5px', color: '#888', fontSize: '0.85rem' }}>
                    Savings: ₹{item.savings} | Debt: ₹{item.debt}
                  </p>
                  <p style={{ margin: 0, color: '#888', fontSize: '0.8rem' }}>
                    {new Date(item.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    background: getColor(item.score),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 'bold', fontSize: '1.2rem'
                  }}>{item.score}</div>
                  <p style={{ margin: '5px 0 0', fontSize: '0.75rem', color: '#888' }}>{item.category}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default History