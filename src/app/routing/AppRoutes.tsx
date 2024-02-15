import {FC, useContext} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import roleContext from '../../context/roleContext'
import {App} from '../App'
import {AuthPage, Logout, useAuth} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import ClientSalesForm from '../modules/investment/sales/ClientSalesForm'
import {AdminRoutes} from './AdminRoutes'
import {AdvisorRoutes} from './AdvisorRoutes'
import TeamLeaderRoutes from './TeamLeaderRoutes'

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()
  let roleState: any = useContext(roleContext)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path='error/*' element={<ErrorsPage />} />
            <Route path='logout' element={<Logout />} />

            {currentUser ? (
              <>
                {roleState.state === 'ADMIN' ? (
                  <Route path='/*' element={<AdminRoutes />} />
                ) :roleState.state === 'TEAM_LEADER' ? (
                  <Route path='/*' element={<TeamLeaderRoutes />} />
                ): (
                  <Route path='/*' element={<AdvisorRoutes />} />
                )}
                <Route
                  index
                  element={
                    <Navigate
                      to={`${
                        roleState.state === 'ADMIN' ? '/admin/dashboard' ? roleState.state === 'TEAM_LEADER' : '/team-leader/dashboard':'/advisor/dashboard'
                      }`}
                    />
                  }
                />
              </>
            ) : (
              <>
                <Route path='auth/*' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} />
                <Route path='sales-form/:id' element={<ClientSalesForm />} />
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export {AppRoutes}
