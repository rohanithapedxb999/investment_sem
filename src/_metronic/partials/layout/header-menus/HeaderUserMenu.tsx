import {FC, useContext} from 'react'
import {useAuth} from '../../../../app/modules/auth'
import roleContext from '../../../../context/roleContext'
import {changeTextCamal, checkStatus} from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  let roleState: any = useContext(roleContext)
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-semibold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <div className='card border p-3 ls-3'>
              {currentUser ? currentUser?.firstName.charAt(0).toUpperCase() : ''}
              {currentUser ? currentUser?.lastName.charAt(0).toUpperCase() : ''}
            </div>
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bold d-flex align-items-center fs-5'>
              {currentUser ? changeTextCamal(currentUser.firstName) : ''}{' '}
              {currentUser ? changeTextCamal(currentUser.lastName) : ''}
            </div>
          </div>
        </div>
      </div>
      <div className='menu-item px-5 pt-3'>
        <h6 className=' px-5'>{checkStatus(roleState.state)}</h6>
      </div>
      <hr />
      {/* <div className='menu-item px-5'>
        <a
          onClick={() => {
            sessionStorage.setItem('isUserLoggedOut', 'true')
            logout('Logging out')
          }}
          className='menu-link px-5'
        >
          Sign Out
        </a>
      </div> */}
    </div>
  )
}

export {HeaderUserMenu}
