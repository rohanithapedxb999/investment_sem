import clsx from 'clsx'
import {useFormik} from 'formik'
import QueryString from 'qs'
import {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {resetPassword} from '../../../../api/UserManagement'
import '../Login.css'

const initialValues = {
  password: '',
  changepassword: '',
}

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .matches(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/, 'Wrong password format'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
})

export function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const params = QueryString.parse(location.search)
  const formik = useFormik({
    initialValues,
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      await resetPassword(values.password, location.state.userId).then((res) => {
        setSubmitting(false)
        setLoading(false)
        if (res.statusCode == 200) {
          navigate('/auth/login')
        } else {
          setStatus(res.message)
        }
      })
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <>
      <style>
        {`
 .form-control.form-control-solid{
  background-color: rgba(197, 197, 197, 0.20);
  color: white;
 }
  .form-control.form-control-solid::placeholder{
  color: var(--kt-gray-800);
 }
        `}
      </style>
      <div
        className='login-form login-signin p-10'
        id='kt_login_password_reset_form'
        style={{
          background: 'rgba(55, 55, 58, 0.35)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(0.6px)',
          WebkitBackdropFilter: 'blur(0.6px)',
        }}
      >
        <form
          className='form fv-plugins-bootstrap fv-plugins-framework '
          noValidate
          onSubmit={formik.handleSubmit}
        >
          {/* begin::Heading */}
          <div className='mb-10 text-center'>
            {/* begin::Title */}
            <h1 className='text-dark mb-3'>Reset Password</h1>
            {/* end::Title */}
            <p className='text-white font-weight-bold h5'>
              Enter password and confirm password to reset
            </p>
            {/* begin::Link */}
            {/* end::Link */}
          </div>
          {/* end::Heading */}
          {formik.status && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          )}
          {/* begin::Form group Password */}
          <div className='mb-10 fv-row' data-kt-password-meter='true'>
            <div className='mb-1'>
              <div className='position-relative mb-3'>
                <input
                  type='password'
                  placeholder='Password'
                  autoComplete='off'
                  {...formik.getFieldProps('password')}
                  className={clsx(
                    'form-control form-control-solid h-auto py-5 px-6',
                    {
                      'is-invalid': formik.touched.password && formik.errors.password,
                    },
                    {
                      'is-valid': formik.touched.password && !formik.errors.password,
                    }
                  )}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.password}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* begin::Meter */}
              <div
                className='d-flex align-items-center mb-3'
                data-kt-password-meter-control='highlight'
              >
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
              </div>
              {/* end::Meter */}
            </div>
            <div className=''>
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </div>
          </div>
          {/* end::Form group */}
          {/* begin::Form group Confirm password */}
          <div className='fv-row mb-5'>
            <input
              type='password'
              placeholder='Password confirmation'
              autoComplete='off'
              {...formik.getFieldProps('changepassword')}
              className={clsx(
                'form-control form-control-solid h-auto py-5 px-6',
                {
                  'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
                },
                {
                  'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
                }
              )}
            />
            {formik.touched.changepassword && formik.errors.changepassword && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.changepassword}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
          {/* begin::Form group */}
          <div className='form-group d-flex flex-wrap flex-center'>
            <button
              type='submit'
              id='kt_sign_up_submit'
              className='btn btn-primary px-9 py-4 my-3'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && <span className='indicator-label'>Submit</span>}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
            <Link to='/auth/login'>
              <button
                type='button'
                id='kt_login_signup_form_cancel_button'
                className='btn btn-light-primary px-9 py-4 my-3 mx-4'
              >
                Cancel
              </button>
            </Link>
          </div>
          {/* end::Form group */}
        </form>
      </div>
    </>
  )
}
