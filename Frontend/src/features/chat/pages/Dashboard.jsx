import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat';
const Dashboard = () => {

  const Chat = useChat() 
   const auth = useSelector((state) => state.auth);
const user = auth?.user; // optional chaining prevents crash
    console.log(user)

    useEffect(()=>{
       Chat.initializeSocketConnection
    },[])
  return (
    <div>
      <h1>hi</h1>
    </div>
  )
}

export default Dashboard
