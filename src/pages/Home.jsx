import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import LoginPopup from '../components/LoginPopup'
import Signuppopup from '../components/Signuppopup'
import useAuth from '../hooks/UseAuth'

const Home = () => {
  const [showLogin, setShowLogin] = useState(false) // toggle login popup
  const [showSignup, setShowSignup] = useState(false) // toggle signup popup
  const { user, logout } = useAuth() // auth state
  const navigate = useNavigate()

  return (
    <div>
      {/* Navbar with auth actions */}
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        // onLogout={() => { logout(); navigate('/') }}
      />

      {/* Main welcome content */}
      <div className="home">
        <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yOV8zZF9jaGFyYWN0ZXJfaWxsdXN0cmF0aW9uX3JvYm90X2Z1bGxfYm9keV9zdF8zN2MxNWUzNC1hODk5LTQxYTMtOThjYy1jYzEwMjhmNGVmNzIucG5n.png" className="ai-image" />
        <h1>Welcome to NoChat</h1>
        <p>Chat with AI instantly. Login to save your history.</p>
        <button onClick={() => navigate('/chat')}>Ask your doubt</button>
      </div>

      {/* Login popup */}
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onSignupClick={() => { setShowLogin(false); setShowSignup(true) }}
        />
      )}

      {/* Signup popup */}
      {showSignup && (
        <Signuppopup
          onClose={() => setShowSignup(false)}
          onLoginClick={() => { setShowSignup(false); setShowLogin(true) }}
        />
      )}
    </div>
  )
}

export default Home