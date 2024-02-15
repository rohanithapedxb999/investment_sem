import clsx from 'clsx'
import {FC, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomSelectInput from '../../../../app/components/CustomInput/CustomSelectInput'
import {useAuth} from '../../../../app/modules/auth'
import roleContext from '../../../../context/roleContext'
const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40p',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Topbar: FC = () => {
  const {currentUser} = useAuth()
  const navigate = useNavigate()
  let roleState: any = useContext(roleContext)
  let roleLength = currentUser?.roles.length

  const initialState = {
    primaryRole: '',
  }
  const [formField, setFormField] = useState(initialState)
  const [userRoles, setUserRoles] = useState<{label: string; value: string}[]>([])
  const handleRoleChange = (value: string | null) => {
    if (value) {
      setFormField({
        ...formField,
        primaryRole: value,
      })
      const firstRole: any = sessionStorage.getItem('currentUserRole')
      const Role: any = JSON.parse(firstRole)

      sessionStorage.setItem(
        'currentUserRole',
        JSON.stringify({
          roleName: value,
          modules: Role !== null ? Role.modules : [],
          features: Role !== null ? Role.features : [],
        })
      )
      roleState.updateState(
        value,
        Role !== null ? Role.modules : [],
        Role !== null ? Role.features : []
      )
      navigate(
        `/${value == 'ADMIN'
            ? 'admin'
            : value == 'TEAM_LEADER'
            ? 'team-leader'
            : 'advisor'
        }/dashboard`
      )
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      let primaryRole = ''
      let role: {label: string; value: string}[] = []
      currentUser?.roles.map(
        (obj: {
          role: {
            id: string
            name: string
            features: {id: string; feature: string}[]
            module: {id: string; name: string; description: string}
          }
          type: string
          id: string
        }) => {
          if (obj.role?.module.name === roleState.state) {
            primaryRole = obj.role.name
          }
          role.push({
            value: `${obj.role.features.length > 0 ? obj.role?.module.name : '-'}`,
            label: obj.role.name,
          })
        }
      )
      setUserRoles(role)
      setFormField({...formField, primaryRole: roleState.state})
    }
    return () => {
      mounted = false
    }
  }, [])
  return (
    <>
      <div className='d-flex align-items-stretch flex-shrink-0 flex-wrap '>
        <div className='topbar d-flex align-items-stretch flex-shrink-0 flex-column flex-wrap'>
          <div className={clsx('d-flex align-items-center ', toolbarButtonMarginClass)}></div>

          <div className={clsx('d-flex align-items-center ', toolbarButtonMarginClass)}>
            {/* begin::Drawer toggle */}
            {roleLength !== undefined ? (
              roleLength > 1 ? (
                <div className='col-12' style={{width: '83%'}}>
                  <CustomSelectInput
                    data={userRoles}
                    value={formField.primaryRole}
                    onChange={(value) => {
                      handleRoleChange(value)
                    }}
                  />
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}

            {/* end::Drawer toggle */}
          </div>
          {/* begin::Theme mode */}
          {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
            <ThemeModeSwitcher toggleBtnClass={toolbarButtonHeightClass} />
          </div> */}
          {/* end::Theme mode */}

          {/* begin::User */}
          {/* <div
            className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
            id='kt_header_user_menu_toggle'
          >
     
            <div
              className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
              data-kt-menu-trigger='click'
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='bottom'
            >
              <div className='card border p-3 ls-2'>
                {currentUser?.firstName.charAt(0).toUpperCase()}
                {currentUser?.lastName.charAt(0).toUpperCase()}
              </div>
            </div>
            <HeaderUserMenu />
  
          </div> */}

        </div>
      </div>
    </>
  )
}

export {Topbar}
