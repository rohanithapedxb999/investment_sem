import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {WithChildren} from '../../../../_metronic/helpers'
import {useLocation} from 'react-router-dom'
import Swal from 'sweetalert2'
import {logoutUser} from './_requests'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: Function
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = (logOutMessage: string) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')
    if (isLoggedIn) {
      // Set the flag to true to indicate logout API call in progress
      Swal.fire({
        icon: 'warning',
        title: logOutMessage,
        heightAuto: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading()
        },
      })
      logoutUser().then((res) => {
        if (res.statusCode === 200) {
          setTimeout(() => {
            saveAuth(undefined)
            setCurrentUser(undefined)
            sessionStorage.removeItem('currentUserRole')
            sessionStorage.removeItem('isLoggedIn')
            sessionStorage.removeItem('isUserLoggedOut')
            sessionStorage.removeItem('isSessionTimeOut')
            Swal.close()
          }, 900)
        }
      })
    }
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const location = useLocation()
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          let data = JSON.parse(window.atob(apiToken.split('.')[1]))
          if (data) {
            data = auth
            setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth && auth.accessToken) {
      requestUser(auth.accessToken)
    } else {
      if (
        location.pathname !== '/auth' &&
        location.pathname !== '/auth/forgot-password' &&
        location.pathname !== 'auth/reset-password'
      ) {
        logout()
      }

      setShowSplashScreen(false)
    }
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
