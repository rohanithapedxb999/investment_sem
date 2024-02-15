import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import '../Login.css'
import {forgotPassword} from '../../../../api/UserManagement'
const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-z0-9]+(?!.*(?:\+{1,}|\-{1,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*$/, (obj) => {
      return obj.originalValue.charAt(obj.originalValue.length - 1) === '.' ||
        obj.originalValue.charAt(0) === '.'
        ? 'Last or First character of the prefix of email must be letter (a-z) or number (0-9)'
        : 'Only letters (a-z),numbers (0-9),and periods (.) are allowed in prefix of email.'
    })
    .test(
      'emailvalid',
      'Email prefix of 8 or more characters must include at least one alphabetical character (a-z)',
      function (item: any) {
        return !/[a-z]/gm.test(item) ? (item.replace('.', '')?.length >= 8 ? false : true) : true
      }
    )
    .required('Email is required'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [resetLink, setResetLink] = useState('')
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        forgotPassword(values.email).then((res) => {
          setSubmitting(false)
          setLoading(false)
          if (res.statusCode == 200) {
            setHasErrors(false)
            setResetLink(res.data)
          } else {
            setStatus(res.message)
            setHasErrors(true)
          }
        })
      }, 1000)
    },
  })

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
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-dark mb-3'>Forgot Password ?</h1>
            {/* end::Title */}
            {/* begin::Link */}
            <div className='text-white font-weight-bold h5'>
              Enter your email to reset your password
            </div>
            {/* end::Link */}
          </div>
          {/* begin::Title */}
          {hasErrors === true && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          )}
          {/* end::Title */}
          {/* begin::Form group */}
          <div className='fv-row mb-10'>
            <div className='input-group'>
              <input
                type='email'
                placeholder='Email'
                autoComplete='off'
                {...formik.getFieldProps('email')}
                className={clsx(
                  'form-control form-control-solid h-auto py-5 px-6',
                  {'is-invalid': formik.touched.email && formik.errors.email},
                  {
                    'is-valid': formik.touched.email && !formik.errors.email,
                  }
                )}
              />
              <div className='input-group-postpend'>
                <span className='input-group-text h-auto py-5 px-6'> @tatacommunications.com</span>
              </div>
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
          {/* begin::Form group */}
          <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
            <button
              type='submit'
              id='kt_password_reset_submit'
              className='btn btn-lg btn-primary fw-bold me-4'
            >
              <span className='indicator-label'>
                {hasErrors === undefined ? 'Submit' : 'Re-Submit'}
              </span>
              {loading && (
                <span className='indicator-progress'>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
            <Link to='/auth/login'>
              <button
                type='button'
                id='kt_login_password_reset_form_cancel_button'
                className='btn btn-lg btn-light-primary fw-bold'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Cancel
              </button>
            </Link>{' '}
          </div>
          {/* end::Form group */}
        </form>
      </div>
    </>
  )
}
