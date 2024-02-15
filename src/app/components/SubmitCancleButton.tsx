import {Button, ButtonProps} from '@mantine/core'
import {ButtonHTMLAttributes} from 'react'

const SubmitCancleButton = (props: {
  cancle?: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps & {label?: string}
  submit?: ButtonProps & {
    editid?: string | null
    label?: string
  } & ButtonHTMLAttributes<HTMLButtonElement>
}) => {
  return (
    <>
      <div className='card-footer py-3'>
        <div className='d-flex flex-wrap justify-content-end align-items-center'>
          {props?.cancle && (
            <Button
              className={`btn ${
                props?.submit?.editid === 'viewDetails' ? `btn-primary` :props.cancle.color?? 'btn-secondary'
              } btn-sm me-2 font-weight-bold`}
              {...props.cancle}
            >
              {props?.cancle?.label ?? 'Cancel'}
            </Button>
          )}
          {props?.submit && (
            <Button
              loaderPosition='center'
              type='submit'
              className='btn btn-primary btn-sm '
              {...props.submit}
            >
              {props?.submit?.label
                ? props?.submit?.label
                : props?.submit?.editid !== null
                ? 'Update'
                : 'Save'}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default SubmitCancleButton
