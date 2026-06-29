import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      boxSizing: 'border-box'
    }}>
      <h2 onClick={() => navigate('/')} style={{
        color: 'white',
        margin: 0,
        cursor: 'pointer',
        fontSize: '1.5rem'
      }}>💰 FinPulse</h2>
      <button onClick={() => navigate('/form')} style={{
        background: 'white',
        color: '#667eea',
        border: 'none',
        padding: '8px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>Check Score</button>
    </nav>
  )
}

export default Navbar