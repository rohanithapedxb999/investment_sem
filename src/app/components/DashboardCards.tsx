import { RingProgress,Text } from '@mantine/core'
import {Link} from 'react-router-dom'

const DashboardCards = (props: {
  iconSrc: any
  srNo: string | string[]
  title: string
  link: string | Function
  colSize?: boolean
  color?: string
}) => {
  return (
    <>
      {console.log(typeof props?.link)}
      <div
        className={`${props.colSize ? 'col-2' : 'col-2'}`}
        onClick={() => {
          typeof props?.link === 'function' && props.link()
        }}
        style={{width:'14%'}}
      >
        <Link to={`${typeof props?.link === 'string' ? props.link : '#'}`}>
          
      <RingProgress label={<Text color={`${
              props?.color ?? 'cyan'}`} weight={700} align='center' size="2rem" px='xs'>
        {props.srNo}
      </Text>} sections={[{value:100,color:`${
              props?.color ?? 'cyan'}`}]}/>
       <Text  weight={700} align='center' size="xl"  pr={'40px'} className='text-gray-800'>
        {props.title}
      </Text>
        </Link>
      </div>

    
    </>
  )
}

export default DashboardCards
