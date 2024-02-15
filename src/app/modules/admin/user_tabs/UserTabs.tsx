import {useContext, useState} from 'react'
import {checkRole} from '../../../../_metronic/helpers'
import roleContext from '../../../../context/roleContext'
import Role from '../role/Role'
import UserMaster from '../user/User'

const UserTabs = () => {
  let roleState: any = useContext(roleContext)
  const [active, setActiveTab] = useState<string>(
    checkRole(['users'], roleState.features) ? 'Users' : 'Roles'
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
            {checkRole(['users'], roleState.features) ? (
              <li
                className={`nav-link ${
                  active == 'Users'
                    ? 'text-primary  border-bottom border-bottom-2 border-primary'
                    : 'text-gray-500'
                } `}
                id='Users'
                style={{cursor: 'pointer'}}
                onClick={(e) => handleTabChange(e)}
              >
                {' '}
                Users
              </li>
            ) : (
              ''
            )}
            {checkRole(['roles'], roleState.features) ? (
              <li
                className={`nav-link ${
                  active == 'Roles'
                    ? 'text-primary border-bottom border-bottom-2 border-primary'
                    : 'text-gray-500'
                }`}
                id='Roles'
                style={{cursor: 'pointer'}}
                onClick={(e) => handleTabChange(e)}
              >
                {' '}
                Roles
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
      <div>{active == 'Users' ? <UserMaster /> : <Role />}</div>
    </>
  )
}

export default UserTabs
