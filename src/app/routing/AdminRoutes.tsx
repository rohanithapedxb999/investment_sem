import {FC, Suspense, useContext} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren, checkRole} from '../../_metronic/helpers'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import roleContext from '../../context/roleContext'
import ActivityLogger from '../components/activity_logger/ActivityLogger'
import LocationTabs from '../modules/admin/location_tabs/LocationTabs'
import Occupation from '../modules/admin/occupation/Occupation'
import Product from '../modules/admin/products/Product'
import UserTabs from '../modules/admin/user_tabs/UserTabs'
import InvestmentTabContent from '../modules/investment/InvestmentTabContent'
import {DashboardWrapper} from '../pages/dashboard/DashboardPage'
import { RoleContextValue } from '../../types/OtherTypes'
import Source from '../modules/admin/source/Source'

const AdminRoutes = () => {
  let roleState: RoleContextValue = useContext(roleContext)

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/admin/dashboard' />} />
        <Route path='admin/dashboard' element={<DashboardWrapper />} />
        <Route path='investment' element={<InvestmentTabContent />} />
        {checkRole(['users', 'roles'], roleState.features) ? (
          <Route
            path='admin/users'
            element={
              <SuspensedView>
                <UserTabs />
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}
        {checkRole(['country', 'location', 'city'], roleState.features) ? (
          <Route
            path='admin/locations'
            element={
              <SuspensedView>
                <LocationTabs />
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}
        {checkRole(['occupation'], roleState.features) ? (
          <Route
            path='admin/occupation'
            element={
              <SuspensedView>
                <Occupation />
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}

{checkRole(['source'], roleState.features) ? (
          <Route
            path='admin/source'
            element={
              <SuspensedView>
                <Source />
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}

        {checkRole(['products'], roleState.features) ? (
          <Route
            path='admin/product'
            element={
              <SuspensedView>
                <Product />
              </SuspensedView>
            }
          />
        ) : (
          ''
        )}

        <Route
          path='admin/activity-logs'
          element={
            <SuspensedView>
              <ActivityLogger />
            </SuspensedView>
          }
        />
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

export {AdminRoutes}
