import { useLocation, useNavigate } from 'react-router-dom'

function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const { score, category } = location.state || { score: 0, category: 'Unknown' }

  const getColor = () => {
    if (score >= 75) return '#00b894'
    if (score >= 50) return '#fdcb6e'
    return '#d63031'
  }

  const getTips = () => {
    if (score >= 75) return [
      '✅ Great job! Keep saving consistently',
      '✅ Consider investing your surplus',
      '✅ Build an emergency fund of 6 months expenses'
    ]
    if (score >= 50) return [
      '⚠️ Try to reduce your monthly expenses',
      '⚠️ Increase your savings by at least 10%',
      '⚠️ Avoid taking new loans'
    ]
    return [
      '🔴 Urgently reduce your debt',
      '🔴 Cut unnecessary expenses immediately',
      '🔴 Seek financial counseling'
    ]
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        width: '400px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Your Financial Health Score</h2>

        <div style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: getColor(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: `0 0 30px ${getColor()}`
        }}>
          <span style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold' }}>{score}</span>
        </div>

        <h3 style={{ color: getColor(), fontSize: '1.5rem', marginBottom: '20px' }}>{category}</h3>

        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <h4 style={{ color: '#333', marginBottom: '10px' }}>💡 Tips to Improve:</h4>
          {getTips().map((tip, index) => (
            <p key={index} style={{ color: '#555', marginBottom: '8px' }}>{tip}</p>
          ))}
        </div>

        <button
          onClick={() => navigate('/form')}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '50px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Check Again
        </button>
      </div>
    </div>
  )
}

export default Result