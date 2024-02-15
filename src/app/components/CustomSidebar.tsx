import {Burger, Drawer} from '@mantine/core'
import {useDisclosure} from '@mantine/hooks'
import clsx from 'clsx'
import {toAbsoluteUrl} from '../../_metronic/helpers'
import {MenuInner} from '../../_metronic/layout/components/header/MenuInner'
import {Topbar} from '../../_metronic/layout/components/header/Topbar'
import {ThemeModeSwitcher} from '../../_metronic/partials'
import {useAuth} from '../modules/auth'
const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40p',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'
const CustomSidebar = () => {
  const [opened, {open, close}] = useDisclosure(false)
  const {currentUser, logout} = useAuth()

  return (
    <>
      {/* {opened?
  
        <div className='d-flex flex-column flex-wrap '   style={{width:'13%'}} >
        
          <div className='d-flex flex-row align-items-center mt-3'>
            <img
                alt='Logo'
                src={toAbsoluteUrl('/media/login_screen_images_tcts/artha_yog_logo.jpg')}
                className='logo-sticky h-40px w-165px ms-1 me-2'
              />
            

          </div>
          <div className='d-flex align-items-center flex-column me-5 my-3'>

          <i className="fa-solid  fa-circle-arrow-left fs-2 text-primary mb-2 ps-3"  onClick={()=>close()}></i>

                <div
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
          </div>
                <div className={clsx('d-flex align-items-center  me-3 mb-5', toolbarButtonMarginClass)}>
            <ThemeModeSwitcher toggleBtnClass={toolbarButtonHeightClass} />
          </div>
        
          <i className="fa-solid fa-right-from-bracket text-danger fs-2 mb-2 "           onClick={() => {
            sessionStorage.setItem('isUserLoggedOut', 'true')
            logout('Logging out')
          }}></i>
          </div>
          <Topbar/>
          <div className='me-7 ms-3'>

                          <div
        className='menu menu-lg-rounded menu-column menu-lg-column menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-5 align-items-stretch'
        id='#kt_header_menu'
        data-kt-menu='true'
  
      >
        <MenuInner />
      </div>
          </div>


     
  </div>:  <div className='d-flex flex-column align-items-center '  style={{width:'3.4%'}}>
    <Burger
                opened={opened}
                onClick={() => open()}
                size="sm"
                my='lg'
              />
          <div
            className={clsx('d-flex align-items-center me-2', toolbarButtonMarginClass)}
            id='kt_header_user_menu_toggle'
          >
            begin::Toggle
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
          </div>
    <div className={clsx('d-flex align-items-center  mt-5 me-3 mb-4', toolbarButtonMarginClass)}>
            <ThemeModeSwitcher toggleBtnClass={toolbarButtonHeightClass} />
          </div>
          <i className="fa-solid fa-right-from-bracket text-danger fs-2 mb-2"           onClick={() => {
            sessionStorage.setItem('isUserLoggedOut', 'true')
            logout('Logging out')
          }}></i>
  </div>
} */}

      <div className='d-flex flex-column align-items-center ' style={{width: '3.4%'}}>
        <Burger opened={opened} onClick={() => open()} size='sm' my='lg' />
        <div
          className={clsx('d-flex align-items-center me-3', toolbarButtonMarginClass)}
          id='kt_header_user_menu_toggle'
        >
          <div
            className={clsx(' symbol', toolbarUserAvatarHeightClass)}
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
        </div>
        <div
          className={clsx('d-flex align-items-center  mt-5 me-3 mb-4', toolbarButtonMarginClass)}
        >
          <ThemeModeSwitcher toggleBtnClass={toolbarButtonHeightClass} />
        </div>
        <i
          className='fa-solid fa-right-from-bracket text-danger fs-2 mb-2 cursor-pointer'
          onClick={() => {
            sessionStorage.setItem('isUserLoggedOut', 'true')
            logout('Logging out')
          }}
        ></i>
      </div>
      <Drawer
        withCloseButton={false}
        opened={opened}
        onClose={close}
        title={
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/login_screen_images_tcts/finoms_logo.png')}
            className='logo-sticky h-40px w-165px ms-8 '
          />
        }
        size={'14.5%'}
      >
        <div className='d-flex justify-content-start align-items-center flex-row me-5 ms-3 mt-4'>
          <i
            className='fa-solid  fa-circle-arrow-left fs-2 text-primary mb-2 ps-3 cursor-pointer '
            onClick={() => close()}
          ></i>

          <div
            className={clsx('d-flex align-items-center mb-2', toolbarButtonMarginClass)}
            id='kt_header_user_menu_toggle'
          >
            <div
              className={clsx(' symbol', toolbarUserAvatarHeightClass)}
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
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-start flex-row my-3 me-8'>
          <div className={clsx('d-flex align-items-center   mb-5 ', toolbarButtonMarginClass)}>
            <ThemeModeSwitcher toggleBtnClass={toolbarButtonHeightClass} />
          </div>

          <i
            className='fa-solid fa-right-from-bracket text-danger fs-2 mb-2 ms-4  cursor-pointer '
            onClick={() => {
              sessionStorage.setItem('isUserLoggedOut', 'true')
              logout('Logging out')
            }}
          ></i>
        </div>
        <Topbar />
        <div className='me-7 ms-3'>
          <div
            className='menu menu-lg-rounded menu-column menu-lg-column menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-5 align-items-stretch'
            id='#kt_header_menu'
            data-kt-menu='true'
          >
            <MenuInner />
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default CustomSidebar
