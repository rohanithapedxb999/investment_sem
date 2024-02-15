import {Center, Loader} from '@mantine/core'

const LoadingSkeleton = () => {
  return (
    <div className='my-2'>
      <Center>
        <Loader color='cyan' />
      </Center>
    </div>
  )
}

export default LoadingSkeleton
