import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

const Error500: FC = () => {
  return (
    <div className='d-flex flex-column flex-root'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-15'>
          <Link to='/' className='mb-10 pt-lg-10'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/login_screen_images_tcts/TCTS_logo.png')}
              className='h-55px mb-5'
            />
          </Link>
          <div className='pt-lg-10 mb-10'>
            <h1 className='fw-bold fs-2qx text-gray-800 mb-10'>System Error</h1>
            <div className='fw-semibold fs-3 text-muted mb-15'>
              Something went wrong!
              <br />
              Please try again later.
            </div>
            <div className='text-center'>
              <Link to='/' className='btn btn-lg btn-primary fw-bold'>
                Go to homepage
              </Link>
            </div>
          </div>
          <div
            className='d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px'
            style={{
              backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/sketchy-1/17.png')}')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export {Error500}
