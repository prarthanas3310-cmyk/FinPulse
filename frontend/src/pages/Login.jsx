import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('https://finpulse-node-backend.onrender.com/api/auth/login', formData)
      login(res.data.user, res.data.token)
      navigate('/form')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '40px',
        width: '100%', maxWidth: '400px', boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        animation: 'fadeUp 0.5s ease'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '8px' }}>👋 Welcome Back!</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>Login to your FinPulse account</p>

        {error && <p style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: '15px' }}>⚠️ {error}</p>}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#555', fontWeight: '600' }}>📧 Email</label>
          <input type="email" placeholder="Enter your email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #eee', fontSize: '1rem', boxSizing: 'border-box', transition: 'border 0.3s' }}
            onFocus={e => e.target.style.border = '2px solid #667eea'}
            onBlur={e => e.target.style.border = '2px solid #eee'}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#555', fontWeight: '600' }}>🔒 Password</label>
          <input type="password" placeholder="Enter your password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #eee', fontSize: '1rem', boxSizing: 'border-box', transition: 'border 0.3s' }}
            onFocus={e => e.target.style.border = '2px solid #667eea'}
            onBlur={e => e.target.style.border = '2px solid #eee'}
          />
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white', border: 'none', padding: '16px', borderRadius: '50px',
          fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold',
          transition: 'transform 0.2s'
        }}
          onMouseDown={e => e.target.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.target.style.transform = 'scale(1)'}
        >
          {loading ? '⏳ Logging in...' : 'Login →'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} style={{ color: '#667eea', cursor: 'pointer', fontWeight: 'bold' }}>Sign Up</span>
        </p>
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

export default Login