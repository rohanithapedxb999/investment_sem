import React from 'react'
import {useAuth} from '../core/Auth'

const LogoutUser = () => {
  const {logout} = useAuth()
  const logoutUser = () => {
    logout()
  }
  return {logoutUser}
}

export default LogoutUser
