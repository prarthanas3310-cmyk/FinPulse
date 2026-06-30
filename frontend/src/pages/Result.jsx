import { useLocation, useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import Navbar from '../components/Navbar'

function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const { score, grade, label, color, insights, breakdown } = location.state || {}

  const pieData = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '80px 20px 20px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '500px', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '5px' }}>Your Financial Health Score</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '20px', fontSize: '0.9rem' }}>Based on your financial data</p>

          <div style={{ position: 'relative', height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270} dataKey="value">
                  <Cell fill={color} />
                  <Cell fill="#f0f0f0" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: color }}>{score}</div>
              <div style={{ fontSize: '0.8rem', color: '#888' }}>out of 100</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <span style={{ background: color, color: 'white', padding: '8px 25px', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 'bold' }}>
              {label} (Grade {grade})
            </span>
          </div>

          {breakdown && (
            <div style={{ display: 'flex', justifyContent: 'space-around', background: '#f8f9fa', borderRadius: '12px', padding: '15px', marginBottom: '20px', fontSize: '0.8rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#888' }}>Savings</div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>{breakdown.savings_rate}%</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#888' }}>Expenses</div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>{breakdown.expense_ratio}%</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#888' }}>Debt</div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>{breakdown.debt_to_income}%</div>
              </div>
            </div>
          )}

          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ color: '#333', marginBottom: '15px', fontSize: '1rem' }}>💡 AI-Powered Insights:</h4>
            {insights && insights.map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', background: '#f8f9fa', borderRadius: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>💡</span>
                <p style={{ color: '#555', margin: 0, fontSize: '0.9rem' }}>{tip}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => navigate('/form')} style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '14px', borderRadius: '50px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
              Check Again
            </button>
            <button onClick={() => navigate('/')} style={{ flex: 1, background: 'transparent', color: '#667eea', border: '2px solid #667eea', padding: '14px', borderRadius: '50px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result