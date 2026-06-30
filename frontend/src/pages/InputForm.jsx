import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

function InputForm() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [formData, setFormData] = useState({ income: '', expenses: '', savings: '', debt: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const fields = [
    { name: 'income', label: 'Monthly Income', icon: '💵', placeholder: 'e.g. 50000' },
    { name: 'expenses', label: 'Monthly Expenses', icon: '🛒', placeholder: 'e.g. 30000' },
    { name: 'savings', label: 'Monthly Savings', icon: '🏦', placeholder: 'e.g. 10000' },
    { name: 'debt', label: 'Monthly Debt/EMI', icon: '💳', placeholder: 'e.g. 5000' }
  ]

  const validate = () => {
    let newErrors = {}
    fields.forEach(f => {
      if (!formData[f.name]) newErrors[f.name] = 'This field is required'
      else if (formData[f.name] < 0) newErrors[f.name] = 'Value cannot be negative'
    })
    return newErrors
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setLoading(true)
    try {
      const response = await axios.post(
        'https://finpulse-node-backend.onrender.com/api/calculate',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/result', { state: response.data })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '80px 20px 20px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '450px', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '8px', fontSize: '1.8rem' }}>📊 Financial Details</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px', fontSize: '0.9rem' }}>Enter your monthly financial data</p>

          {fields.map((field) => (
            <div key={field.name} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', color: '#555', fontWeight: '600', fontSize: '0.9rem' }}>
                {field.icon} {field.label} (₹)
              </label>
              <input
                type="number" name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                style={{
                  width: '100%', padding: '14px', borderRadius: '12px',
                  border: errors[field.name] ? '2px solid #ff6b6b' : '2px solid #eee',
                  fontSize: '1rem', boxSizing: 'border-box'
                }}
              />
              {errors[field.name] && <p style={{ color: '#ff6b6b', fontSize: '0.8rem', margin: '4px 0 0' }}>⚠️ {errors[field.name]}</p>}
            </div>
          ))}

          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white', border: 'none', padding: '16px',
            borderRadius: '50px', fontSize: '1.1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '10px', fontWeight: 'bold'
          }}>
            {loading ? '⏳ Calculating...' : 'Calculate My Score →'}
          </button>

          {!token && (
            <p style={{ textAlign: 'center', marginTop: '15px', color: '#888', fontSize: '0.85rem' }}>
              💡 <span onClick={() => navigate('/login')} style={{ color: '#667eea', cursor: 'pointer' }}>Login</span> to save your score history!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default InputForm