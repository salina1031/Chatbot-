const chatsKey = "chats"

const ChatServices = {

  // get all chats of a user
  getChats: (userId) => {
    if (!userId) return []   // guest → no history

    const chats = JSON.parse(localStorage.getItem(chatsKey)) || {}
    return chats[userId] || []
  },

  // create new chat
  createChat: (userId) => {
    if (!userId) return null   // guest → do not store

    const chats = JSON.parse(localStorage.getItem(chatsKey)) || {}

    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date().toISOString()
    }

    if (!chats[userId]) chats[userId] = []

    chats[userId].unshift(newChat)

    localStorage.setItem(chatsKey, JSON.stringify(chats))

    return newChat
  },

  // save message
  saveMessage: (userId, chatId, message) => {
    if (!userId) return   // guest → do not store

    const chats = JSON.parse(localStorage.getItem(chatsKey)) || {}

    const userChats = chats[userId] || []
    const chat = userChats.find(c => c.id === chatId)

    if (chat) {
      chat.messages.push(message)

      if (chat.messages.length === 1) {
        chat.title = message.text.slice(0, 30) + "..."
      }
    }

    localStorage.setItem(chatsKey, JSON.stringify(chats))
  },

  // delete chat
  deleteChat: (userId, chatId) => {
    if (!userId) return

    const chats = JSON.parse(localStorage.getItem(chatsKey)) || {}

    chats[userId] = (chats[userId] || []).filter(c => c.id !== chatId)

    localStorage.setItem(chatsKey, JSON.stringify(chats))
  }
}

export default ChatServices