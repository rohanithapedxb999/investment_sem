import {useContext} from 'react'
import {useThemeMode} from '../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {TECHNICAL_ROLES} from '../../../contants'
import roleContext from '../../../context/roleContext'
import AdminDashboard from '../../modules/admin/dashboard/AdminDashboard'
import InvestmentTabContent from '../../modules/investment/InvestmentTabContent'

const DashboardWrapper = () => {
  const {mode} = useThemeMode()
  const components = {
    ADMIN: AdminDashboard,
    ADVISOR: InvestmentTabContent,
  }
  let roleState: any = useContext(roleContext)

  const Component: any = components[roleState.state as keyof typeof components]

  return (
    <>
      {TECHNICAL_ROLES.includes(roleState.state) ? (
        <>
          <div className='card'>
            <Component />
          </div>
        </>
      ) : (
        <div>
          <div className='card card-flush h-xl-100'>
            <div className='card-body '>
              <div className=' position-relative'>
                <div className='row g-3 g-lg-6'>
                  <Component />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export {DashboardWrapper}
