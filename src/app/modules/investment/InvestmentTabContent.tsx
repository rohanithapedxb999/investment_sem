import {NavLink} from '@mantine/core'
import {useContext, useState} from 'react'
import {checkRole} from '../../../_metronic/helpers'
import roleContext from '../../../context/roleContext'
import {RoleContextValue} from '../../../types/OtherTypes'
import InvestmentDashboard from './InvestmentDashboard'
import MyClient from './MyClient'
import ProspectTab from './prospect/prospect_tabs/ProspectTab'
import Sales from './sales/Sales'

const InvestmentTabContent = () => {
  let roleState: RoleContextValue = useContext(roleContext)
  const [active, setActive] = useState(0)
  const data = [
    {label: 'Dashboard', value: 'dashboard'},
    // {label: 'AUM'},
    {label: 'Prospects', value: 'my_prospects'},
    {
      label: 'Sales',
      value: 'my_sales',
    },

    {label: 'Clients', value: 'my_clients'},
  ]
  const items = data.map((item, index) =>
    checkRole([item.value], roleState.features) || item.value === 'dashboard' ? (
      <NavLink
        key={item.label}
        active={index === active}
        label={item.label}
        onClick={() => setActive(index)}
        mb={27}
      />
    ) : (
      ''
    )
  )
  return (
    <>
      <style>{`
    .mantine-NavLink-root[data-active] {
      color: var(--kt-primary);
    }
    .mantine-NavLink-label {
      font-size: 1.1rem; 
      font-weight: 600;
    }

    `}</style>
      <div className='row'>
        <div className='col-1'>{items}</div>
        <div className='col-10'>
          {active === 0 ? (
            <InvestmentDashboard />
          ) : active === 1 ? (
            <ProspectTab />
          ) : active === 2 ? (
            <Sales />
          ) : (
            <MyClient />
          )}
        </div>
      </div>
    </>
  )
}

export default InvestmentTabContent
