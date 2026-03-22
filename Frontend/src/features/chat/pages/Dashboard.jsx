import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from '../../auth/hook/useAuth'

const Dashboard = () => {
  const user = useSelector(state => state.auth?.user)
  const { handlGetMe } = useAuth()

  useEffect(() => {
    if (!user) {
      handlGetMe()
    }
  }, [])

  return (
    <div>
      {user ? `Welcome ${user.username}` : "Loading..."}
    </div>
  )
}

export default Dashboard
