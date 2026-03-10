import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ChatContainer from '../components/ChatContainer'
import LoginPopup from '../components/LoginPopup'
import Signuppopup from '../components/Signuppopup'
import useAuth from '../hooks/UseAuth'

const ChatPage = () => {
  const { logout } = useAuth() // auth logout
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false) // show login popup
  const [showSignup, setShowSignup] = useState(false) // show signup popup

  return (
    <div className="chat-page">
      {/* Navbar with login, signup, logout */}
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        onLogout={() => { logout(); navigate('/') }}
      />

      {/* Chat area */}
      <ChatContainer onLoginClick={() => setShowLogin(true)} />

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

export default ChatPage