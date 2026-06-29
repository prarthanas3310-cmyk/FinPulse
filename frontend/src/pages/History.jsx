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
      const res = await axios.get('https://finpulse-backend-tj8s.onrender.com/api/history', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setHistory(res.data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const getColor = (score) => {
    if (score >= 75) return '#00b894'
    if (score >= 50) return '#fdcb6e'
    return '#d63031'
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: 'Arial' }}>
      <Navbar />
      <div style={{ padding: '100px 20px 40px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>📊 Score History</h2>

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
          history.map((item, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: '16px',
              padding: '20px', marginBottom: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
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
          ))
        )}
      </div>
    </div>
  )
}

export default History