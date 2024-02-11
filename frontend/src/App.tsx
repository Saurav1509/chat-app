import { useEffect, useState } from 'react'
import './App.css'
import socket from './socket'
import ConnectionState from './components/ConnectionState'

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected)

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
    </div>
  )
}

export default App
