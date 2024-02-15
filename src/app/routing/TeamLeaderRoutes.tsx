import React, { FC, Suspense, useContext } from 'react'
import { RoleContextValue } from '../../types/OtherTypes'
import roleContext from '../../context/roleContext'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { checkRole } from '../../_metronic/helpers/AssetHelpers'
import { WithChildren } from '../../_metronic/helpers'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils/DomHelpers'
import TopBarProgress from 'react-topbar-progress-indicator'
import InvestmentDashboard from '../modules/investment/InvestmentDashboard'
import ProspectTab from '../modules/investment/prospect/prospect_tabs/ProspectTab'
import Sales from '../modules/investment/sales/Sales'
import MyClient from '../modules/investment/MyClient'

const TeamLeaderRoutes = () => {
    let roleState: RoleContextValue = useContext(roleContext)

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/team-leader/dashboard' />} />
        {checkRole(['my_prospects' ], roleState.features) ? (
          <Route
            path='team-leader/prospects'
            element={
              <SuspensedView>
                < ProspectTab/>
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}
        {checkRole(['my_sales'], roleState.features) ? (
          <Route
            path='team-leader/sales'
            element={
              <SuspensedView>
                <Sales/>
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}
        {checkRole(['my_clients'], roleState.features) ? (
          <Route
            path='team-leader/clients'
            element={
              <SuspensedView>
                < MyClient/>
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}

        <Route path='team-leader/dashboard' element={<InvestmentDashboard />} />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}
const SuspensedView: FC<WithChildren> = ({children}) => {
    const baseColor = getCSSVariableValue('--kt-primary')
    TopBarProgress.config({
      barColors: {
        '0': baseColor,
      },
      barThickness: 1,
      shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
  }

export default TeamLeaderRoutes