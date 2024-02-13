import { useState } from "react"
import socket from "../socket"
export function ChatMessageEvent() {

  const [message, setMessage] = useState("")

  return <div>
    <input onChange={(e) => {
      setMessage(e.target.value)
    }} placeholder="Enter your message" value={message} />

    <button onClick={() => {
      socket.emit('chat message', message);
      setMessage("");
    }}>Send</button>
  </div>
} 
