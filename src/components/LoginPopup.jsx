import { useState } from 'react'
import useAuth from '../hooks/UseAuth'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginPopup = ({ onClose, onSignupClick }) => {
  // auth hook bata login liyauxa
  const { login } = useAuth()
  const navigate=useNavigate()
  // form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // form submit
  const handleSubmit = () => {
    try {
      login(email, password)
      onClose() // popup band garxa
      navigate('/chat')//navigate to chat
    } catch (err) {
      setError(err.message) // error dekhauxa
    }
  }

  return (
    <div className="popupContainer">
      <div className="popup">
        <h2>Login</h2>
        {/* error message */}
        {error && <p className="error">{error}</p>}
        <input placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
         />
        <input placeholder="Password"
         type="password" 
         value={password}
          onChange={(e) => setPassword(e.target.value)} 
          />
        <button onClick={handleSubmit}>Login</button>
        {/* signup redirect to */}
        <p>No account? <span onClick={onSignupClick}>Signup</span></p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default LoginPopup