import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function InputForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    income: '',
    expenses: '',
    savings: '',
    debt: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://finpulse-backend-tj8s.onrender.com/api/calculate', formData)
      navigate('/result', { state: response.data })
    } catch (error) {
      console.log(error)
    }
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
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
          💰 Enter Your Details
        </h2>

        {['income', 'expenses', 'savings', 'debt'].map((field) => (
          <div key={field} style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', textTransform: 'capitalize' }}>
              Monthly {field} (₹)
            </label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '15px',
            borderRadius: '50px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Calculate My Score →
        </button>
      </div>
    </div>
  )
}

export default InputForm