import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

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
        padding: '50px',
        textAlign: 'center',
        maxWidth: '500px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
          💰 FinPulse
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '30px' }}>
          Check your Financial Health Score instantly!
        </p>
        <button
          onClick={() => navigate('/form')}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '50px',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}
        >
          Check My Score →
        </button>
      </div>
    </div>
  )
}

export default Home