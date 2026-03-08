import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* home page */}
        <Route path="/" element={<Home />} />
        {/* chat page — login pachhi */}
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)

export default App
