import {Button, ButtonProps} from '@mantine/core'
import {ButtonHTMLAttributes} from 'react'
import {KTSVG} from './KTSVG'

const ActionColumn = (props: {
  edit?: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
  view?: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
  copy?: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
  remove?: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
  add?: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
  save?: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
  reset?: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
}) => {
  const {copy, view, edit, remove, add, reset, save} = props
  const isAllVisible = edit && copy && remove && view
  return (
    <div className={!isAllVisible ? `d-flex justify-content-end flex-shrink-0` : ''}>
      {add && (
        <Button className='btn btn-icon btn-light-primary btn-sm me-1 mb-1 ' {...add}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        </Button>
      )}
      {view && (
        <Button
          name='viewDetails'
          className='btn btn-icon btn-secondary btn-sm me-1 mb-1'
          {...view}
        >
          <i className='fa-regular fa-eye'></i>
        </Button>
      )}
      {copy && (
        <Button
          name='copyDetails'
          className='btn btn-icon btn-light-info btn-sm me-1 mb-1'
          {...copy}
        >
          <i className='fa-regular fa-copy'></i>
        </Button>
      )}
      {edit && (
        <Button
          name='editDetails'
          className='btn btn-icon btn-light-primary btn-sm me-1 mb-1'
          {...edit}
        >
          <i className='far fa-edit '></i>
        </Button>
      )}
      {remove && (
        <Button className='btn btn-icon btn-light-danger btn-sm mb-1' {...remove}>
          <i className='fa fa-trash'></i>
        </Button>
      )}
      {save && (
        <Button className='btn btn-icon btn-light-success btn-sm me-1 mb-1' {...save}>
          <i className='fa-solid fa-floppy-disk'></i>
        </Button>
      )}
      {reset && (
        <Button className='btn btn-icon btn-secondary btn-sm mb-1' {...reset}>
          <i className='fa-solid fa-eraser'></i>
        </Button>
      )}
    </div>
  )
}

export default ActionColumn
