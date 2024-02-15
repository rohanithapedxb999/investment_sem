import {useContext, useEffect, useState} from 'react'
import {checkRole} from '../../../../_metronic/helpers'
import roleContext from '../../../../context/roleContext'
import {APIStatusData} from '../../../../data/OtherDefaultData'
import {MasterDashboardDataType, RoleContextValue} from '../../../../types/OtherTypes'
import {getRecords} from '../../../CommonFunctions'
import DashboardCards from '../../../components/DashboardCards'

const AdminDashboard = () => {
  let roleState: RoleContextValue = useContext(roleContext)
  const [count, setCount] = useState<MasterDashboardDataType>({...APIStatusData, data: {}})
  useEffect(() => {
    let mounted = true
    if (mounted) {
      getRecords('masters/count', setCount)
    }

    return () => {
      mounted = false
    }
  }, [])
  return (
    <>
      {count?.loading ? (
        <span className='indicator-progress fs-3 text-gray-800' style={{display: 'block'}}>
          Please wait...
          <span className='spinner-border spinner-border align-middle ms-2'></span>
        </span>
      ) : (
        <>
          {checkRole(['users'], roleState.features) ? (
            <DashboardCards
              iconSrc={
                <svg
                  width='20'
                  height='20'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 384 650'
                >
                  <path
                    fill='currentColor'
                    d='M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z'
                  />
                </svg>
              }
              srNo={count?.data?.user ?? '0'}
              title='Users'
              link='/admin/users'
              colSize={true}
            />
          ) : (
            ''
          )}

          {checkRole(['products'], roleState.features) ? (
            <DashboardCards
              iconSrc={
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
                  <path
                    fill='currentColor'
                    d='M320 256c-70.7 0-128-57.3-128-128S249.3 0 320 0s128 57.3 128 128s-57.3 128-128 128zM40 64c22.1 0 40 17.9 40 40v40 80 40.2c0 17 6.7 33.3 18.7 45.3l51.1 51.1c8.3 8.3 21.3 9.6 31 3.1c12.9-8.6 14.7-26.9 3.7-37.8l-15.2-15.2-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32 15.2 15.2 0 0 25.3 25.3c21 21 32.8 49.5 32.8 79.2V464c0 26.5-21.5 48-48 48H173.3c-17 0-33.3-6.7-45.3-18.7L28.1 393.4C10.1 375.4 0 351 0 325.5V224 160 104C0 81.9 17.9 64 40 64zm560 0c22.1 0 40 17.9 40 40v56 64V325.5c0 25.5-10.1 49.9-28.1 67.9L512 493.3c-12 12-28.3 18.7-45.3 18.7H400c-26.5 0-48-21.5-48-48V385.1c0-29.7 11.8-58.2 32.8-79.2l25.3-25.3 0 0 15.2-15.2 32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32-15.2 15.2c-11 11-9.2 29.2 3.7 37.8c9.7 6.5 22.7 5.2 31-3.1l51.1-51.1c12-12 18.7-28.3 18.7-45.3V224 144 104c0-22.1 17.9-40 40-40z'
                  />
                </svg>
              }
              srNo={count?.data?.products ?? '0'}
              title='Products'
              link='/admin/product'
              colSize={true}
            />
          ) : (
            ''
          )}

          {checkRole(['occupation'], roleState.features) ? (
            <DashboardCards
              iconSrc={
                <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
                  <path
                    fill='currentColor'
                    d='M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z'
                  />
                </svg>
              }
              srNo={count?.data?.occupation ?? '0'}
              title='Occupations'
              link='/admin/occupation'
              colSize={true}
            />
          ) : (
            ''
          )}

{checkRole(['source'], roleState.features) ? (
            <DashboardCards
              iconSrc={
                <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
                  <path
                    fill='currentColor'
                    d='M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z'
                  />
                </svg>
              }
              srNo={count?.data?.source ?? '0'}
              title='Sources'
              link='/admin/source'
              colSize={true}
            />
          ) : (
            ''
          )}
        </>
      )}
    </>
  )
}

export default AdminDashboard
