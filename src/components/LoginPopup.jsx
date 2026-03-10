import { useState } from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'


const LoginPopup = ({ onClose, onSignupClick }) => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const handleSubmit=(e)=>{
    e.preventDefault()
    try {
      login(email, password)
      onClose()
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <div className="popupContainer">
      <div className="popup">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Login</button>
        <p>No account? <span onClick={onSignupClick}>Signup</span></p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default LoginPopup