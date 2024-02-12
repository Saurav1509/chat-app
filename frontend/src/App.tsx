import { useEffect, useState } from 'react'
import './App.css'
import socket from './socket'
import { ConnectionState } from './components/ConnectionState'
import { ConnectionManager } from './components/ConnectionManager'
import { ChatMessageEvent } from './components/ChatMessageEvent'

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected)

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
    </div>
  )
}

export default App
