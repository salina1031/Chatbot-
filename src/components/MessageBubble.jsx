import React from 'react'
const MessageBubble = ({message}) => {
  return (
    <div className={`bubble ${message.role}`}>
        <p>{message.text}</p>
    </div>
  )
}
export default MessageBubble