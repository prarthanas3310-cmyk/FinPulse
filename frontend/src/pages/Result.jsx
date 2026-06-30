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

  const bars = breakdown ? [
    { name: 'Savings Rate', value: breakdown.savings_rate, color: '#22c55e' },
    { name: 'Expense Ratio', value: breakdown.expense_ratio, color: '#f97316' },
    { name: 'Debt to Income', value: breakdown.debt_to_income, color: '#ef4444' },
  ] : []

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '80px 20px 20px' }}>
        <div style={{
          background: 'white', borderRadius: '24px', padding: '40px',
          width: '100%', maxWidth: '520px', boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          animation: 'fadeUp 0.5s ease'
        }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '5px' }}>Your Financial Health Score</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '20px', fontSize: '0.9rem' }}>Based on your financial data</p>

          <div style={{ position: 'relative', height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270} dataKey="value" isAnimationActive={true} animationDuration={1000}>
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

          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <span style={{ background: color, color: 'white', padding: '8px 25px', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 'bold' }}>
              {label} (Grade {grade})
            </span>
          </div>

          {/* Score Breakdown Bars */}
          {bars.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#333', marginBottom: '15px', fontSize: '1rem' }}>📊 Score Breakdown</h4>
              {bars.map((bar, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#555' }}>{bar.name}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#333' }}>{bar.value}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(bar.value, 100)}%`,
                      height: '100%',
                      background: bar.color,
                      borderRadius: '10px',
                      transition: 'width 1s ease'
                    }} />
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', padding: '10px', background: '#f8f9fa', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: '#555' }}>Net Cash Flow</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#22c55e' }}>₹{breakdown.net_cash_flow}</span>
              </div>
            </div>
          )}

          {/* Insights */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ color: '#333', marginBottom: '15px', fontSize: '1rem' }}>💡 AI-Powered Insights</h4>
            {insights && insights.map((tip, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                padding: '10px', background: '#f8f9fa', borderRadius: '10px', marginBottom: '8px',
                animation: `fadeUp 0.4s ease ${i * 0.1}s both`
              }}>
                <span style={{ fontSize: '1.1rem' }}>💡</span>
                <p style={{ color: '#555', margin: 0, fontSize: '0.9rem' }}>{tip}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => navigate('/form')} style={{
              flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white', border: 'none', padding: '14px', borderRadius: '50px',
              fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold'
            }}>
              Check Again
            </button>
            <button onClick={() => navigate('/')} style={{
              flex: 1, background: 'transparent', color: '#667eea',
              border: '2px solid #667eea', padding: '14px', borderRadius: '50px',
              fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold'
            }}>
              Home
            </button>
          </div>
        </div>
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

export default Result