import {useContext, useState} from 'react'
import {checkRole} from '../../../../_metronic/helpers'
import roleContext from '../../../../context/roleContext'
import {RoleContextValue} from '../../../../types/OtherTypes'
import City from '../city/City'
import Country from '../country/Country'
import Location from '../location/Location'
import State from '../state/State'

const LocationTabs = () => {
  let roleState: RoleContextValue = useContext(roleContext)
  const [active, setActiveTab] = useState<string>(
    checkRole(['location'], roleState.features)
      ? checkRole(['country'], roleState.features)
        ? 'Country'
        : checkRole(['city'], roleState.features)
        ? 'City'
        : 'Location'
      : ''
  )
  const handleTabChange = (event: React.SyntheticEvent) => {
    let target = event.target as HTMLInputElement
    setActiveTab(target.id)
  }

  return (
    <>
      <div className='card pt-6 mb-4 ps-4 pb-1'>
        <div className='d-flex overflow-auto h-40px'>
          <ul className='nav  border-transparent fs-5 fw-bold flex-nowrap'>
            {checkRole(['country'], roleState.features) ? (
              <li
                className={`nav-link ${
                  active === 'Country'
                    ? 'text-primary border-bottom border-bottom-2 border-primary'
                    : 'text-gray-500'
                }`}
                id='Country'
                style={{cursor: 'pointer'}}
                onClick={(e) => handleTabChange(e)}
              >
                {' '}
                Country
              </li>
            ) : (
              ''
            )}
            {checkRole(['city'], roleState.features) ? (
              <li
                className={`nav-link ${
                  active === 'State'
                    ? 'text-primary border-bottom border-bottom-2 border-primary'
                    : 'text-gray-500'
                }`}
                id='State'
                style={{cursor: 'pointer'}}
                onClick={(e) => handleTabChange(e)}
              >
                {' '}
                State
              </li>
            ) : (
              ''
            )}
            {checkRole(['city'], roleState.features) ? (
              <li
                className={`nav-link ${
                  active === 'City'
                    ? 'text-primary border-bottom border-bottom-2 border-primary'
                    : 'text-gray-500'
                }`}
                id='City'
                style={{cursor: 'pointer'}}
                onClick={(e) => handleTabChange(e)}
              >
                {' '}
                City
              </li>
            ) : (
              ''
            )}
            {/* {checkRole(['location'], roleState.features) ? (
              <li
                className={`nav-link ${
                  active === 'Location'
                    ? 'text-primary border-bottom border-bottom-2 border-primary'
                    : 'text-gray-500'
                }`}
                id='Location'
                style={{cursor: 'pointer'}}
                onClick={(e) => handleTabChange(e)}
              >
                {' '}
                Office Location
              </li>
            ) : (
              ''
            )} */}
          </ul>
        </div>
      </div>
      <div>
        {active === 'Country' ? (
          <Country />
        ) : active === 'City' ? (
          <City />
        ) : active === 'State' ? (
          <State />
        ) : (
          <Location />
        )}
      </div>
    </>
  )
}

export default LocationTabs
