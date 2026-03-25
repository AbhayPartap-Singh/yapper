import React from 'react'
import { useSelector } from 'react-redux'
const Dashboard = () => {
   const auth = useSelector((state) => state.auth);
const user = auth?.user; // optional chaining prevents crash
    console.log(user)
  return (
    <div>
      <h1>hi</h1>
    </div>
  )
}

export default Dashboard
