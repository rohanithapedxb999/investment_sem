const InputErrorBox = (props: {Message: string}) => {
  return (
    <>
      {' '}
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{props.Message}</span>
        </div>
      </div>
    </>
  )
}

export default InputErrorBox
