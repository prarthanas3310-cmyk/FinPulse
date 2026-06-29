import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      boxSizing: 'border-box'
    }}>
      <h2 onClick={() => navigate('/')} style={{ color: 'white', margin: 0, cursor: 'pointer' }}>
        💰 FinPulse
      </h2>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ color: 'white', fontSize: '0.9rem' }}>👋 {user.name}</span>
            <button onClick={() => navigate('/history')} style={{
              background: 'rgba(255,255,255,0.2)', color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '8px 16px', borderRadius: '20px', cursor: 'pointer'
            }}>History</button>
            <button onClick={handleLogout} style={{
              background: 'white', color: '#667eea',
              border: 'none', padding: '8px 16px',
              borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'
            }}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} style={{
              background: 'rgba(255,255,255,0.2)', color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '8px 16px', borderRadius: '20px', cursor: 'pointer'
            }}>Login</button>
            <button onClick={() => navigate('/signup')} style={{
              background: 'white', color: '#667eea',
              border: 'none', padding: '8px 16px',
              borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'
            }}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar