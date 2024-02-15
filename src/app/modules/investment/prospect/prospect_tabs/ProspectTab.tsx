import {useContext, useState} from 'react'
import roleContext from '../../../../../context/roleContext'
import {RoleContextValue} from '../../../../../types/OtherTypes'
import CustomRadioInput from '../../../../components/CustomInput/CustomRadioInput'
import Prospects from '../Prospects'
import ConvertedProspect from './ConvertedProspect'

const ProspectTab = () => {
  let roleState: RoleContextValue = useContext(roleContext)
  const [role, setRole] = useState<string>('advisor')
  const [active, setActiveTab] = useState<string>('Prospects')
  const handleTabChange = (event: React.SyntheticEvent) => {
    let target = event.target as HTMLInputElement
    setActiveTab(target.id)
  }

  return (
    <>
      <div className='card mb-2' hidden={roleState.state !== 'TEAM_LEADER'}>
        <div className='card-body pb-5 pt-2'>
          <CustomRadioInput
            data={[
              {
                label: `My`,
                value: 'advisor',
              },
              {
                label: `Teams`,
                value: 'teamlead',
              },
            ]}
            children={undefined}
            value={role}
            onChange={(value) => {
              setRole(value)
            }}
          />
        </div>
      </div>
      <div className='card pt-6 mb-4 ps-4 pb-1'>
        <div className='d-flex overflow-auto h-40px'>
          <ul className='nav  border-transparent fs-5 fw-bold flex-nowrap'>
            <li
              className={`nav-link ${
                active == 'Prospects'
                  ? 'text-primary  border-bottom border-bottom-2 border-primary'
                  : 'text-gray-500'
              } `}
              id='Prospects'
              style={{cursor: 'pointer'}}
              onClick={(e) => handleTabChange(e)}
            >
              {' '}
              Prospects
            </li>

            <li
              className={`nav-link ${
                active == 'ConvertedProspect'
                  ? 'text-primary border-bottom border-bottom-2 border-primary'
                  : 'text-gray-500'
              }`}
              id='ConvertedProspect'
              style={{cursor: 'pointer'}}
              onClick={(e) => handleTabChange(e)}
            >
              {' '}
              Converted Prospects
            </li>
          </ul>
        </div>
      </div>
      <div>
        {active == 'Prospects' ? <Prospects role={role} /> : <ConvertedProspect role={role} />}
      </div>
    </>
  )
}

export default ProspectTab
