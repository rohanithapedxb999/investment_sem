import {useContext, useEffect} from 'react'
import {Navigate, Routes} from 'react-router-dom'
import roleContext from '../../../context/roleContext'
import {useAuth} from './core/Auth'

export function Logout() {
  const {logout} = useAuth()
  let roleState:any=useContext(roleContext)
  useEffect(() => {
    logout()
    document.location.reload()
  }, [logout])

  return (
    <Routes>
      <Navigate to='/auth/login' />
    </Routes>
  )
}
