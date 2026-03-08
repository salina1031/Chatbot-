import { useState, useEffect } from 'react'
import ChatServices from '../services/ChatServices'
import useAuth from '../hooks/UseAuth'

const Sidebar = ({ currentChatId, onChatSelect, onNewChat, refreshKey }) => {
  const { user } = useAuth()
  const [chats, setChats] = useState([])

  // load user's chats
  useEffect(() => {
    if (user) {
      const userChats = ChatServices.getChats(user.id)
      setChats(userChats)
    }
  }, [user, refreshKey])

  return (
    <div className="sidebar">
      <button onClick={onNewChat}>+ New Chat</button>
      <div className="chat-list">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === currentChatId ? 'active' : ''}`}
            onClick={() => onChatSelect(chat)}
          >
            {chat.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar