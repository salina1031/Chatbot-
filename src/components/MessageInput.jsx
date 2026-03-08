import { useState } from 'react'


const MessageInput = ({ onSend, disabled }) => {
  // input text state
  const [text, setText] = useState('') 

  const handleSend = () => {
    if (!text.trim() || disabled) return // do nothing if empty or disabled
    onSend(text) // send message
    setText('') // clear input
  }

  return (
    <div className="input-area">
      <input
        value={text}
        onChange={e => setText(e.target.value)} // update text
        onKeyDown={e => e.key === 'Enter' && handleSend()} // send on Enter
        placeholder="Type a message..."
        disabled={disabled} // disable input if true
      />
      <button onClick={handleSend} disabled={disabled}>Send</button>
    </div>
  )
}

export default MessageInput