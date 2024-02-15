import {getCustomDate} from '../../../_metronic/helpers'

const TimelineHead = (props: {
  action: string
  createdBy: string
  master: string
  content: any
  createdAt: string
}) => {
  const {action, createdBy, master, content, createdAt} = props
  return (
    <div className='timeline-content mb-5'>
      <div className='pe-3'>
        <div className='d-flex justify-content-between'>
          <div className='fs-5 fw-semibold'>
            New record created in{' '}
            <span className='fw-bold'>{master.charAt(0).toUpperCase() + master.slice(1)}</span>
          </div>
          <div className='overflow-auto'>
            <div className='d-flex align-items-center mt-1 fs-6'>
              <div className='text-muted me-2 fs-7'>
                <span className='fw-bold text-gray-900'>{action}</span> on{' '}
                <span className='fw-bold text-gray-900'>{getCustomDate(createdAt)}</span> by{' '}
                <span className='fw-bold text-gray-900'>{createdBy}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='pe-3'>
          {Object.keys(content).map((key) => (
            <div className='fs-5 fw-semibold'>
              {key.charAt(0).toUpperCase() + key.slice(1)}
              <span className='text-gray-500'>{' : '}</span>
              {content[key]}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimelineHead
