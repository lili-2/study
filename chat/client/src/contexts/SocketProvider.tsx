import React, { ReactElement, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client'
const SocketContext = React.createContext(null)

export function useSocket() {
  return useContext(SocketContext)
}
interface SocketProType {
  children: ReactElement
  id: string
}
export function SocketProvider({
  children,
  id
}: SocketProType) {

  const [socket, setSocket] = useState<any>()

  function newSocketFun(newSocket: { close: () => void; }) {
    newSocket.close()
  }
  useEffect(() => {

    const newSocket = io('http://localhost:5000',{ query: { id } })
    setSocket(newSocket)

    return () => newSocketFun(newSocket)
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

