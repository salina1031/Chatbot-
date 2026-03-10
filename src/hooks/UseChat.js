import { useState } from 'react'
import GeminiServices from '../services/GeminiServices'
import ChatServices from '../services/ChatServices'

const useChat = (user, chatId, setChatId, onUpdate) => {
  const [messages, setMessages] = useState([]) // all messages
  const [loading, setLoading] = useState(false)

  // load messages for a specific chat
  const loadChat = (chat) => {
    setMessages(chat.messages || [])
  }

  // create new chat
  const newChat = () => {
    setMessages([])
    if (user) {
      const chat = ChatServices.createChat(user.id)
      setChatId(chat.id)
      onUpdate()
    } else {
      setChatId(null)
    }
  }

  // send message to AI
  const sendMessage = async (text) => {
    const userMsg = { role: 'user', text }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setLoading(true)

    // save user message if logged in
    if (user && chatId) {
      ChatServices.saveMessage(user.id, chatId, userMsg)
    }

    try {
      // send text to GeminiServices
      const reply = await GeminiServices.sendMessage(text)

      // add AI response
      const aiMsg = { role: 'ai', text: reply }
      setMessages(prev => [...prev, aiMsg])

      // save AI response if logged in
      if (user && chatId) {
        ChatServices.saveMessage(user.id, chatId, aiMsg)
        onUpdate()
      }
    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, { role: 'ai', text: 'Something went wrong' }])
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, sendMessage, loadChat, newChat }
}

export default useChat