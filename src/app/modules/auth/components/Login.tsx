import {Button, Center, PasswordInput} from '@mantine/core'
import {useFormik} from 'formik'
import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {decryptData, toAbsoluteUrl} from '../../../../_metronic/helpers/AssetHelpers'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import roleContext from '../../../../context/roleContext'
import CustomTextInput from '../../../components/CustomInput/CustomTextInput'
import '../Login.css'
import {useAuth} from '../core/Auth'
import {login} from '../core/_requests'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

export function Login() {
  const {mode} = useThemeMode()
  const [loading, setLoading] = useState(false)
  const [terminateSession, setTerminateSession] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  let roleState: any = useContext(roleContext)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnBlur: true,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      await login(values.email.trim(), values.password.trim(), terminateSession).then((res) => {
        setSubmitting(false)
        setLoading(false)
        if (res.statusCode == 200) {
          let currentUserRoles: any = res.data?.roles?.filter(
            (role: {type: string; role: {name: string; id: string}}) => role.type == 'primary'
          )[0]
          let module: any = currentUserRoles?.role?.module?.name?.toUpperCase()
          let modules: any = []
          let features: any = []
          res.data?.roles?.map((obj: any) => {
            if (obj?.role?.features?.length > 0) {
              obj?.role?.features?.map((subObj: {feature: string; id: string}) => {
                features?.push(subObj?.feature ?? '-')
              })
            }
            modules?.push(obj?.role?.module?.name ?? '-')
          })
          roleState.updateState(module, modules, features)
          sessionStorage.setItem(
            'currentUserRole',
            JSON.stringify({roleName: module, modules: modules, features: features})
          )
          res.data.firstName = decryptData(res.data.firstName, res.data.hash)
          res.data.lastName = decryptData(res.data.lastName, res.data.hash)
          res.data.email = decryptData(res.data.email, res.data.hash)
          sessionStorage.setItem('isLoggedIn', 'true')
          saveAuth(res.data)
          setCurrentUser(res.data)
          setSubmitting(false)
          setTerminateSession(false)
        } else if (res.statusCode == 406) {
          setSubmitting(false)
          setLoading(false)
          setStatus(res.message)

          navigate(`/auth/reset-password`, {state: {userId: res.data.id}})
        } else {
          if (res.message === 'User is already logged in') {
            setStatus('You are already logged in.')
          } else {
            setStatus(res.message)
          }
          saveAuth(undefined)
          setSubmitting(false)
          setLoading(false)
          setTerminateSession(false)
        }
      })
    },
  })

  return (
    <>
      <style>
        {`.mantine-Select-input{
          height:3.03rem;
        }`}
      </style>
      <div
        className='login-form login-signin py-10  '
        id='kt_login_signin_form'
        style={{
          backgroundColor: `
          ${mode == 'dark' ? '#151521' : '#FFFFFF'}`,
        }}
      >
        <div className='d-flex justify-content-center mb-15'>
          <img
            alt='Logo'
            className='h-55px w-165px '
            src={toAbsoluteUrl('/media/login_screen_images_tcts/finoms_logo.png')}
          />
        </div>
        {formik.status && (
          <div className='fv-row alert alert-danger mb-10 mx-5'>
            {formik.status}
            {formik.status === 'You are already logged in.' && (
              <>
                If you want to terminate that session and continue here{' '}
                <a
                  role='button'
                  onClick={() => {
                    setTerminateSession(true)
                    formik.submitForm()
                  }}
                  className='text-primary'
                >
                  Click Here
                </a>
              </>
            )}
          </div>
        )}
        <Center>
          <form noValidate onSubmit={formik.handleSubmit}>
            {/* begin::Form group */}
            <div className='fv-row mb-10'>
              <CustomTextInput
                placeholder='Email'
                {...formik.getFieldProps('email')}
                type='email'
                name='email'
                value={formik.values.email}
                autoComplete='off'
                size='lg'
                w={390}
                error={formik.errors.email}
              />
            </div>
            {/* end::Form group */}
            {/* begin::Form group */}
            <div className='fv-row mb-10 '>
              <PasswordInput
                size={'lg'}
                error={formik.errors.password}
                {...formik.getFieldProps('password')}
              />
            </div>
            {/* end::Form group */}
            {/* begin::Action */}
            <div className='form-group d-flex flex-wrap justify-content-center align-items-center'>
              {/* begin::Link */}
              {/* <Link
              to='/auth/forgot-password'
              className='text-white text-hover-primary my-3 mr-2 h6'
              style={{marginLeft: '5px'}}
            >
              Forgot Password ?
            </Link> */}
              {/* end::Link */}

              <Button
                loaderPosition='center'
                type='submit'
                id='kt_sign_in_submit'
                variant='gradient'
                w={150}
                h={45}
                fz={17}
                loading={loading}
              >
                Login
              </Button>
            </div>
            {/* end::Action */}
          </form>
        </Center>
      </div>
    </>
  )
}
