import { useEffect, useState } from 'react'
import './App.css'
import socket from './socket'
import { ConnectionState } from './components/ConnectionState'
import { ConnectionManager } from './components/ConnectionManager'
import { ChatMessageEvent } from './components/ChatMessageEvent'
import { NewChatDisplay } from './components/NewChatDisplay'

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected)
  const [newChat, setNewChat] = useState<string[]>([])

  //initiate connection with Backend websoket
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("connected")
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat message', (msg: string) => setNewChat(prevChat => [...prevChat, msg]));

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    }
  }, [])

  return (
    <div>
      <ConnectionState isConnected={isConnected} />
      <ChatMessageEvent />
      <ConnectionManager />
      <NewChatDisplay newChat={newChat} />
    </div>
  )
}

export default App
