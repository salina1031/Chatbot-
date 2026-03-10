import { useState, useEffect, useRef } from 'react'

import useAuth from '../hooks/UseAuth'
import useChat from '../hooks/UseChat'
import ChatServices from '../services/ChatServices'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import Sidebar from './Sidebar'
const ChatContainer = ({ onLoginClick }) => {
  const { user } = useAuth()
  const [chatId, setChatId] = useState(null) // current chat id
  const [refreshKey, setRefreshKey] = useState(0) // force slidebar refresh
  const bottomRef = useRef(null) // scroll to bottom

  const { messages, loading, sendMessage, loadChat, newChat } = useChat(
    user, chatId, setChatId, () => setRefreshKey(k => k + 1)
  )

  // scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // handle sending a message
  const handleSend = async (text) => {
    let id = chatId
    // create new chat automatically if logged in and no chat exists
    if (user && !id) {
      const chat = ChatServices.createChat(user.id)
      setChatId(chat.id)
      id = chat.id
      setRefreshKey(k => k + 1)
    }
    await sendMessage(text)
  }

  // select a chat from slidebar
  const handleChatSelect = (chat) => {
    setChatId(chat.id)
    loadChat(chat)
  }

  return (
    <div className="chat-body">
      {user && (
        <Sidebar
          currentChatId={chatId}
          onChatSelect={handleChatSelect}
          onNewChat={newChat}
          refreshKey={refreshKey}
        />
      )}

      <div className="chat-container">
        {/* guest mode banner */}
        {!user && (
          <div className="guest-banner">
            <span>Guest mode</span>
            
          </div>
        )}

        {/* chat messages */}
        <div className="messages">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
          {loading && <p className="typing">AI is typing...</p>}
          <div ref={bottomRef} /> {/* scroll target */}
        </div>

        {/* message input */}
        <MessageInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  )
}

export default ChatContainer