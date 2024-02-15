import {Route, Routes, Outlet} from 'react-router-dom'
import {Error500} from './components/Error500'
import {Error404} from './components/Error404'
import {useEffect} from 'react'
import { Error403 } from './components/Error403'

const ErrorsLayout = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `none`
    return () => {

    }
  }, [])

  return <Outlet />
}

const ErrorsPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route path='404' element={<Error404 />} />
      <Route path='500' element={<Error500 />} />
      <Route path='403' element={<Error403 />} />
      <Route index element={<Error404 />} />
    </Route>
  </Routes>
)

export {ErrorsPage}
