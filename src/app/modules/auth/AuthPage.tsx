import {Center} from '@mantine/core'
import {Outlet, Route, Routes} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {useThemeMode} from '../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import './Login.css'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {ResetPassword} from './components/ResetPassword'

const AuthLayout = () => {
  const {mode} = useThemeMode()
  // useEffect(() => {
  //   // document.body.classList.add('bg-white')
  //   return () => {
  //     document.body.classList.remove('bg-white')
  //   }
  // }, [])

  return (
    <>
      <div className='d-flex flex-column flex-root'>
        {/*begin::Login*/}
        <div
          className='login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid '
          id='kt_login'
          style={{
            backgroundColor: `
              ${mode == 'dark' ? '#1E1E2D' : '#F6F6F6'}`,
          }}
        >
          <div className='d-flex flex-column flex-row-fluid position-relative py-5 px-6 overflow-hidden'>
            {/* begin::Content body */}
            <div className='d-flex flex-column-fluid flex-center mt-30 mt-lg-0  border-white'>
              <Outlet />
            </div>
            {/*end::Content body*/}
          </div>
          {/*begin::Aside*/}
          <div
            className='login-aside d-flex flex-row-auto p-10 p-lg-7'
            style={{
              backgroundColor: `
              ${mode == 'dark' ? '#E6E6FF' : '#E6E6FF'}`,
              // boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              // backdropFilter: 'blur(0.6px)',
              // WebkitBackdropFilter: 'blur(0.6px)',
            }}
          >
            {/*begin: Aside Container*/}
            <div className='d-flex flex-row-fluid flex-column justify-content-between align-items-center my-auto'>
              {/* start:: Aside header */}
              <Center>
                {' '}
                <img
                  alt='Logo'
                  className='h-80px w-160px mb-20'
                  src={toAbsoluteUrl('/media/login_screen_images_tcts/finoms_logo.png')}
                />
              </Center>
              <Center>
                <img
                  alt='Logo'
                  className='h-300px w-160px  mt-auto'
                  src={toAbsoluteUrl('/media/login_screen_images_tcts/login_bg.svg')}
                />
              </Center>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              {/* <div className='flex-column d-flex flex-column justify-content-center mt-2 pb-lg-0 pt-10  px-5 '>
                <h1
                  className=' mb-5 d-lg-none d-sm-block d-md-block text-center '
                  style={{
                    lineHeight: '45px',
                    fontSize: '6rem',
                    color: mode == 'dark' ? 'white' : '#0068e8',
                  }}
                >
                  S
                  <span
                    className='me-12'
                    style={{color: mode == 'dark' ? '#166ac1' : '#166ac1', fontSize: '3rem'}}
                  >
                    olution
                  </span>
                  E
                  <span
                    className='me-12'
                    style={{color: mode == 'dark' ? '#166ac1' : '#166ac1', fontSize: '3rem'}}
                  >
                    ngineering
                  </span>
                  M
                  <span style={{color: mode == 'dark' ? '#166ac1' : '#166ac1', fontSize: '3rem'}}>
                    odel
                  </span>
                </h1>
                <h1
                  className='font-size-h1  mb-5  d-lg-block d-none'
                  style={{
                    lineHeight: '45px',
                  }}
                >
                  <span
                    className='h1'
                    style={{fontSize: '2em', color: mode == 'dark' ? 'white' : '#0068e8'}}
                  >
                    S
                  </span>
                  <span
                    className='h1'
                    style={{color: mode == 'dark' ? '#166ac1' : '#166ac1', fontSize: '1em'}}
                  >
                    olution
                  </span>
                  <br />
                  <span
                    className='h1'
                    style={{fontSize: '2em', color: mode == 'dark' ? 'white' : '#0068e8'}}
                  >
                    E
                  </span>
                  <span
                    className='h1'
                    style={{color: mode == 'dark' ? '#166ac1' : '#166ac1', fontSize: '1em'}}
                  >
                    ngineering
                  </span>

                  <br />
                  <span
                    className='h1'
                    style={{fontSize: '2em', color: mode == 'dark' ? 'white' : '#0068e8'}}
                  >
                    M
                  </span>
                  <span
                    className='h1'
                    style={{color: mode == 'dark' ? '#166ac1' : '#166ac1', fontSize: '1em'}}
                  >
                    odel
                  </span>
                </h1>
              </div> */}
              {/* end:: Aside content */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}

          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='reset-password' element={<ResetPassword />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
