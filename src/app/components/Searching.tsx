import {useState} from 'react'
import {api} from '../../api/apiMiddleware'
import {APIResponse, CommonApiDataType} from '../../types/OtherTypes'
import {setupAxios} from '../modules/auth'
import CustomTextInput from './CustomInput/CustomTextInput'
import { Button } from '@mantine/core'

const Searching = (props: {
  data: CommonApiDataType
  url: string
  setData: Function | undefined
}) => {
  let {setData, data, url} = props
  const [value, setValue] = useState('')
  const getData = () => {
    console.log(data.queryData, 'in seraching')
    const {token} = setupAxios()
    let otherQuery = url.includes('?')
    api
      .get(
        `/${url}${otherQuery ? `&` : '?'}page=1&take=${data?.queryData?.take ?? null}&sort=${data
          ?.queryData?.sort}&sortBy=${data?.queryData?.sortBy}&search=${value}`,
        token,
        false
      )
      .then((res: APIResponse) => {
        if (res.statusCode === 200) {
          setData &&
            setData((prev: CommonApiDataType) => ({
              ...prev,
              data: res?.data?.result,
              queryData: res?.data?.queryParams,
            }))
          let storageData: any = sessionStorage.getItem('filterLength')
          const pattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]/g
          let updatedStorageData: any = {}
          let key = url.replaceAll(pattern, '')
          if (storageData) {
            storageData = JSON.parse(storageData)
            updatedStorageData = {...storageData, [key]: res.data.take}
          } else {
            updatedStorageData[key] = res.data.take
          }
          sessionStorage.setItem('filterLength', JSON.stringify(updatedStorageData))
        } else {
          setData &&
            setData((prev: CommonApiDataType) => ({
              ...prev,
              error: res.message,
              data: res?.data?.result,
              queryData: res?.data?.queryParams,
            }))
        }
      })
  }
  return (
    <>
    <div className='d-flex flex-row'>

      <CustomTextInput
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value)
        }}
        placeholder='Search here...'
        onBlur={() => {if(!value)getData()}}
        my={4}
      />
             <Button
          name='viewDetails'
          className='btn btn-icon btn-secondary btn-sm mt-1'
onClick={() => getData()}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
    </div>
    </>
  )
}

export default Searching
