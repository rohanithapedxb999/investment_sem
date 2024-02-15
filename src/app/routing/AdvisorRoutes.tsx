import {FC, Suspense, useContext} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren, checkRole} from '../../_metronic/helpers'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import InvestmentTabContent from '../modules/investment/InvestmentTabContent'
import InvestmentDashboard from '../modules/investment/InvestmentDashboard'
import LocationTabs from '../modules/admin/location_tabs/LocationTabs'
import { RoleContextValue } from '../../types/OtherTypes'
import roleContext from '../../context/roleContext'
import UserTabs from '../modules/admin/user_tabs/UserTabs'
import Occupation from '../modules/admin/occupation/Occupation'
import ProspectTab from '../modules/investment/prospect/prospect_tabs/ProspectTab'
import Sales from '../modules/investment/sales/Sales'
import MyClient from '../modules/investment/MyClient'

const AdvisorRoutes = () => {
  let roleState: RoleContextValue = useContext(roleContext)

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/advisor/dashboard' />} />
        {checkRole(['my_prospects' ], roleState.features) ? (
          <Route
            path='advisor/prospects'
            element={
              <SuspensedView>
                <ProspectTab />
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}
        {checkRole(['my_sales'], roleState.features) ? (
          <Route
            path='advisor/sales'
            element={
              <SuspensedView>
                <Sales />
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}
        {checkRole(['my_clients'], roleState.features) ? (
          <Route
            path='advisor/clients'
            element={
              <SuspensedView>
                <MyClient />
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}

        
        <Route path='advisor/dashboard' element={<InvestmentDashboard />} />
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

export {AdvisorRoutes}
