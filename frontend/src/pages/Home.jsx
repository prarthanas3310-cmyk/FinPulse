import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {
  const navigate = useNavigate()

  const features = [
    { icon: '📊', title: 'Instant Score', desc: 'Get your financial health score in seconds' },
    { icon: '💡', title: 'Smart Tips', desc: 'Personalized tips to improve your finances' },
    { icon: '🔒', title: 'Secure', desc: 'Your data is safe and never stored' }
  ]

  const steps = [
    { num: '01', title: 'Enter Details', desc: 'Input your income, expenses, savings and debt' },
    { num: '02', title: 'Get Score', desc: 'Our AI calculates your financial health score' },
    { num: '03', title: 'Improve', desc: 'Follow personalized tips to improve your score' }
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />

      {/* Hero Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '0 20px' }}>
        <div>
          <div style={{ fontSize: '4rem', marginBottom: '10px' }}>💰</div>
          <h1 style={{ fontSize: '3.5rem', color: 'white', margin: '0 0 15px', fontWeight: 'bold' }}>FinPulse</h1>
          <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.85)', marginBottom: '10px' }}>
            Know your Financial Health Score instantly!
          </p>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Powered by AI — Get personalized insights to improve your financial wellness
          </p>
          <button onClick={() => navigate('/form')} style={{
            background: 'white',
            color: '#667eea',
            border: 'none',
            padding: '18px 50px',
            borderRadius: '50px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            Check My Score →
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '60px 40px', background: 'rgba(255,255,255,0.05)' }}>
        <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '40px', fontSize: '2rem' }}>Why FinPulse?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px',
              width: '250px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{f.icon}</div>
              <h3 style={{ color: 'white', marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div style={{ padding: '60px 40px' }}>
        <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '40px', fontSize: '2rem' }}>How It Works</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', width: '200px' }}>
              <div style={{
                width: '60px', height: '60px',
                borderRadius: '50%',
                background: 'white',
                color: '#667eea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                margin: '0 auto 15px'
              }}>{s.num}</div>
              <h3 style={{ color: 'white', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
          Built for IDBI Innovate 2026 | Team FinPulse
        </p>
      </div>
    </div>
  )
}

export default Home