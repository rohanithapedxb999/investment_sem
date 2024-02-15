import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

const Error403: FC = () => {
  return (
    <div className='d-flex flex-column flex-root'>
      <div className='d-flex flex-column flex-center flex-column-fluid p-10'>
        {/* begin::Illustration */}
        <img
          src={toAbsoluteUrl('/media/illustrations/sketchy-1/18.png')}
          alt=''
          className='mw-100 mb-10 h-lg-450px'
        />
        {/* end::Illustration */}
        {/* begin::Message */}
        <h1 className='fw-semibold mb-10' style={{color: '#A3A3C7'}}>
         The page is unavailable OR You are not authorized to view this page.
        </h1>
        {/* end::Message */}
        {/* begin::Link */}
        <Link to='/' className='btn btn-primary'>
          Return To Dashboard
        </Link>
        {/* end::Link */}
      </div>
    </div>
  )
}

export {Error403}