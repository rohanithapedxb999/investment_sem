import {getCustomDate} from '../../../_metronic/helpers'

const TimelineContent = (props: {
  action: string
  createdBy: string
  content: any
  createdAt: string
}) => {
  const {action, createdBy, content, createdAt} = props
  return (
    <div className='timeline-content mb-2'>
      <div
        className={`d-flex justify-content-between align-items-start bg-light-secondary rounded min-w-750px px-7 py-2`}
      >
        <div className='pe-3'>
          {Object.keys(content).map((key) => (
            <div className='fs-5 fw-semibold'>
              {key.charAt(0).toUpperCase() + key.slice(1)}
              <span className='text-gray-500'>{' : '}</span>
              {action === 'Deleted' ? (
                content[key]
              ) : (
                <>
                  {content[key].old}
                  <span className='text-gray-500'>{' => '}</span>
                  {content[key].new}
                </>
              )}
            </div>
          ))}
        </div>

        <div className='d-flex justify-content-between pe-2'>
          <div className='text-muted me-2 fs-7'>
            <span className='fw-bold text-gray-900'>{action}</span> by{' '}
            <span className='fw-bold text-gray-900'>{createdBy}</span>
          </div>
          <span className='badge badge-secondary'>{getCustomDate(createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default TimelineContent
