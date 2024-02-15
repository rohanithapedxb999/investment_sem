import 'datatables.net-dt/css/jquery.dataTables.css'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'jquery/dist/jquery.min.js'
import {Suspense, useEffect, useState} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import IdleTimer from '../idel_timer/IdelTimer'
import '../main.css'
import AffixComponent from './components/AffixComponent'
import {AuthInit, useAuth} from './modules/auth'

const App = () => {
  const [isTimeout, setIsTimeout] = useState(false)

  const location = useLocation()
  const timer = new IdleTimer({
    timeout: 600, //expire after 10 minutes
    onTimeout: () => {
      setIsTimeout(true)
    },
    onExpired: () => {
      //do something if expired on load
      setIsTimeout(true)
    },
  })

  const {currentUser, logout} = useAuth()
  const checkTimeOut = () => {
    if (location.pathname !== '/auth') {
      sessionStorage.setItem('isSessionTimeOut', 'true')
      logout('Session timed-out. Logging off.')
      setIsTimeout(false)
      timer.cleanUp()
      timer.startInterval()
    } else {
      setIsTimeout(false)
      timer.cleanUp()
      timer.startInterval()
    }
  }
  if (isTimeout) {
    checkTimeOut()
  }
  useEffect(() => {
    let checkUserSession = sessionStorage.getItem('isSessionTimeOut')
    let isUserLoggedOut = sessionStorage.getItem('isUserLoggedOut')
    if (isUserLoggedOut) {
      logout('Logging out')
    } else if (checkUserSession) {
      checkTimeOut()
    } else {
      if (currentUser == undefined && !isTimeout) {
        timer.startInterval()
      } else {
        checkTimeOut()
      }
    }
  }, [])

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AuthInit>
          <Outlet />
          <MasterInit />
          <AffixComponent />
        </AuthInit>
      </LayoutProvider>
    </Suspense>
  )
}

export {App}
