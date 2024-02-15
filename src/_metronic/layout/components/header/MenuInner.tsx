import {useContext} from 'react'
import roleContext from '../../../../context/roleContext'
import {checkRole} from '../../../helpers'
import {MenuItem} from './MenuItem'

export function MenuInner() {
  let roleState: any = useContext(roleContext)

  return (
    <>
      <MenuItem
        title={'Dashboard'}
        to={`${
          roleState.state === 'ADMIN'
            ? '/admin/dashboard'
            :  roleState.state === 'TEAM_LEADER'
            ? '/team-leader/dashboard'
            : '/advisor/dashboard'
        }`}
      />

      {roleState.state === 'ADMIN' ? (
        <>
          {checkRole(['users', 'roles'], roleState.features) ? (
            <MenuItem to='admin/users' title='Users' />
          ) : (
            ''
          )}
          {checkRole(['country', 'city', 'location'], roleState.features) ? (
            <MenuItem to='admin/locations' title='Locations' />
          ) : (
            ''
          )}
          {checkRole(['occupation'], roleState.features) ? (
            <MenuItem to='/admin/occupation' title='Occupations' />
          ) : (
            ''
          )}
          {checkRole(['source'], roleState.features) ? (
            <MenuItem to='/admin/source' title='Source' />
          ) : (
            ''
          )}

          {checkRole(['products'], roleState.features) ? (
            <MenuItem to='/admin/product' title='Products' />
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          {checkRole(['my_prospects'], roleState.features) ? (
            <MenuItem to={`${roleState.state === 'ADVISOR' ?'advisor':'team-leader'}/prospects`} title='Prospects' />
          ) : (
            ''
          )}
          {checkRole(['my_sales'], roleState.features) ? (
            <MenuItem to={`${roleState.state === 'ADVISOR' ?'advisor':'team-leader'}/sales`} title='Sales' />
          ) : (
            ''
          )}
          {checkRole(['my_clients'], roleState.features) ? (
            <MenuItem to={`${roleState.state === 'ADVISOR' ?'advisor':'team-leader'}/clients`} title='Clients' />
          ) : (
            ''
          )}
          </>
      )}
    </>
  )
}
